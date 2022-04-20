import { html, LitElement, nothing, render, TemplateResult } from 'lit';
import { property, state } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { CodeEditor } from './CodeEditor';

customElements.define('dockit-code-editor', CodeEditor);

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
  @property()
  // @ts-ignore
  language: 'html' | 'js';

  @property()
  code = '';

  @property()
  // @ts-ignore
  renderStory: (
    story: () => unknown,
    container: HTMLElement
  ) => Promise<void | VoidFunction>;

  @property({ attribute: false })
  scope?: { [key: string]: any };

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

  protected createRenderRoot(): HTMLElement {
    return this;
  }

  protected render(): TemplateResult {
    return html`
      <div class="preview-story">
        ${this.error ? html`<pre>${this.error}</pre>` : nothing}
        <div
          class="story_padded"
          style="${this.error ? 'display: none' : ''}"
        ></div>
        <details
          @toggle="${(event: { target: HTMLDetailsElement }) =>
            this.onDetailsToggle(event)}"
        >
          <summary>Code</summary>
          ${this.isOpen
            ? html`<dockit-code-editor
                lang="${this.language}"
                .initialCode="${this.code}"
                @update=${() => this.onCodeUpdate()}
              ></dockit-code-editor>`
            : nothing}
        </details>
      </div>
    `;
  }

  protected firstUpdated(): void {
    this.renderCode();
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
    return this.querySelectCodeEditor()?.getCode() || this.code;
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

  protected renderError(error: string): void {
    render(html`<pre>${error}</pre>`, this.querySelectStoryContainer());
  }

  protected querySelectStoryContainer(): HTMLElement {
    return this.querySelector<HTMLElement>('.story_padded')!;
  }

  protected querySelectCodeEditor(): CodeEditor | null {
    return this.querySelector<CodeEditor>('dockit-code-editor');
  }
}
