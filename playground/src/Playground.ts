import takeCareOf from 'carehtml';
import { css, html, LitElement, nothing, render, TemplateResult } from 'lit';
import { property, state } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { CodeEditor } from './CodeEditor';

const careHtml = takeCareOf(html);

function debounce(callback: VoidFunction, time: number): VoidFunction {
  let timeoutId: number;
  return () => {
    clearTimeout(timeoutId);
    timeoutId = window.setTimeout(callback, time);
  };
}

function esm(strings: TemplateStringsArray, ...values: string[]): string {
  let code = strings.raw[0];
  for (let i = 0; i < values.length; i++) {
    code += values[i] + strings.raw[i + 1];
  }
  return URL.createObjectURL(new Blob([code], { type: 'text/javascript' }));
}

/**
 * Render and preview code with live code editor.
 */
export class Playground extends LitElement {
  static styles = css`
    :host {
      display: block;
      border: 1px solid #404040;
      border-radius: 6px;
      margin-bottom: 15px;
      color-scheme: dark;
    }

    .story {
      border-top-left-radius: 6px;
      border-top-right-radius: 6px;
      padding: 15px;
    }

    details {
      border-bottom-left-radius: 6px;
      border-bottom-right-radius: 6px;
      border-top: 1px solid #404040;
      overflow: hidden;
    }

    summary {
      background-color: #262626;
      cursor: pointer;
      padding: 5px 20px;
    }

    /* double-class is due to a specificity war with typography and Prism theme */
    pre {
      caret-color: white;
      border: 0;
      border-radius: 0;
      margin: 0;
      padding: 15px;
    }
  `;

  @property()
  renderStory: (
    story: () => unknown,
    container: HTMLElement
  ) => Promise<void | VoidFunction>;

  @property({ attribute: false })
  scope?: { [key: string]: any };

  @state()
  protected language: 'html' | 'js';

  @state()
  protected initialCode: string;

  @state()
  protected isOpen = false;

  @state()
  protected error = '';

  protected defaultScope?: { [key: string]: any };

  protected disposePreviousRender?: VoidFunction;

  constructor() {
    super();
    this.onCodeUpdate = debounce(this.onCodeUpdate.bind(this), 50);
  }

  protected render(): TemplateResult {
    return html`
      <slot
        @slotchange="${(event: Event) => this.onCodeTemplateSlotChange(event)}"
      ></slot>
      ${this.error ? html`<pre>${this.error}</pre>` : nothing}
      <div class="story" style="${this.error ? 'display: none' : ''}"></div>
      <details
        @toggle="${(event: { target: HTMLDetailsElement }) =>
          this.onDetailsToggle(event)}"
      >
        <summary>Code</summary>
        ${this.language && this.initialCode && this.isOpen
          ? careHtml`<${CodeEditor}
              class="code-editor"
              lang="${this.language}"
              .initialCode="${this.initialCode}"
              @update=${() => this.onCodeUpdate()}
            ></${CodeEditor}>`
          : nothing}
      </details>
    `;
  }

  protected onCodeTemplateSlotChange(event: Event): void {
    if (event.target instanceof HTMLSlotElement) {
      const template = event.target.assignedElements()[0];
      if (template instanceof HTMLTemplateElement) {
        const language =
          template.content.firstElementChild.tagName === 'SCRIPT'
            ? 'js'
            : 'html';
        let rawCode: string;
        if (language === 'html') {
          rawCode = template.innerHTML;
        } else {
          rawCode = template.content.firstElementChild.innerHTML;
        }
        const rawLines = rawCode.split('\n');
        const firstNonWhitespaceRawLine = rawLines.find((l) => l.trim() !== '');
        const firstNonWhitespaceCharMatch =
          firstNonWhitespaceRawLine.match(/[^\s]/);
        const rootIndent = firstNonWhitespaceCharMatch.index;
        const lines = rawCode
          .trim()
          .split('\n')
          .map((line) => {
            const nonWhitespaceCharMatch = line.match(/[^\s]/);
            const indent = nonWhitespaceCharMatch?.index ?? line.length;
            if (indent >= rootIndent) {
              return line.substring(rootIndent);
            }
            return line;
          })
          .map((line) => line.trimEnd());
        this.language = language;
        this.initialCode = lines.join('\n');
        this.renderCode();
      }
    }
  }

  protected onDetailsToggle(event: { target: HTMLDetailsElement }): void {
    this.isOpen = event.target.open;
  }

  protected onCodeUpdate(): void {
    this.renderCode();
  }

  protected async renderCode(): Promise<void> {
    const code = this.getActualCode();
    if (!code) {
      return;
    }
    try {
      this.error = '';
      if (typeof this.disposePreviousRender === 'function') {
        this.disposePreviousRender();
        this.disposePreviousRender = undefined;
      }
      if (this.language === 'html') {
        await this.renderHtml(code);
      } else if (this.language === 'js') {
        await this.renderJs(code);
      }
    } catch (e) {
      this.error = `${e}`;
    }
  }

  protected setActualCode(code: string): void {
    this.querySelectCodeEditor()?.setCode(code);
  }

  protected getActualCode(): string {
    return this.querySelectCodeEditor()?.getCode() || this.initialCode;
  }

  protected async renderHtml(code: string): Promise<void> {
    render(html`${unsafeHTML(code)}`, this.querySelectStoryContainer());
  }

  protected async renderJs(code: string): Promise<void> {
    const [argNames, argVals] = this.prepareJsArguments();
    const [importLines, innerLines] = this.prepareJsCode(code);
    const moduleUrl = esm`
      ${importLines.join('\n')}
      export default async (${argNames.join(', ')}) => {
        ${innerLines.join('\n')}
      }
    `;
    const module = await import(moduleUrl);
    const story = await module.default(...argVals);
    if (!story || typeof story !== 'function') {
      throw 'code must have a default export with a story function';
    }
    return this.renderStoryFunction(story);
  }

  protected prepareJsArguments(): [string[], unknown[]] {
    if (!this.scope && !this.defaultScope) {
      return [[], []];
    }
    const scope = { ...this.defaultScope, ...this.scope };
    const argNames = Object.keys(scope);
    const argVals = Object.values(scope);
    return [argNames, argVals];
  }

  protected prepareJsCode(code: string): [string[], string[]] {
    const importLines: string[] = [];
    const innerLines: string[] = [];
    code
      .replace('export default ', 'return ')
      .split('\n')
      .map((line) => line.trimStart())
      .forEach((line) => {
        if (line.startsWith('import ')) {
          importLines.push(line);
        } else {
          innerLines.push(line);
        }
      });
    return [importLines, innerLines];
  }

  protected async renderStoryFunction(story: () => unknown): Promise<void> {
    if (!this.renderStory) {
      throw 'renderStory is required';
    }
    this.disposePreviousRender =
      (await this.renderStory(story, this.querySelectStoryContainer())) ||
      undefined;
  }

  protected querySelectStoryContainer(): HTMLElement {
    return this.shadowRoot.querySelector<HTMLElement>('.story')!;
  }

  protected querySelectCodeEditor(): CodeEditor | undefined {
    return this.shadowRoot.querySelector<CodeEditor>('.code-editor');
  }
}
