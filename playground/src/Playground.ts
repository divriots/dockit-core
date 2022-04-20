import { html, LitElement, nothing, render, TemplateResult } from 'lit';
import { property, state } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { CodeEditor } from './CodeEditor';

customElements.define('dockit-code-editor', CodeEditor);

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
  createRenderRoot(): HTMLElement {
    return this;
  }

  @property()
  // @ts-ignore
  language: 'html' | 'js';

  @property()
  // @ts-ignore
  code: string = '';

  @property()
  // @ts-ignore
  previewRenderer: (
    storyFn: () => unknown,
    container: HTMLElement
  ) => Promise<void> = async (
    storyFn: () => TemplateResult,
    container: HTMLElement
  ) => {
    render(storyFn(), container);
  };

  @property({ attribute: false })
  scope?: { [key: string]: any };

  // below properties are for Backlight MDJS preview-story only

  @property()
  export?: string;

  @property({
    attribute: 'import-maps',
    type: Object,
  })
  importMaps?: { [key: string]: string };

  @property()
  initialStoryFn?: () => unknown;

  @state()
  protected isOpen = false;

  protected defaultScope?: { [key: string]: any };

  protected $storyContainer?: HTMLElement;
  protected $codeEditor?: CodeEditor;

  protected render(): TemplateResult {
    return html`
      <div class="preview-story">
        <div class="story_padded"></div>
        <details @toggle="${(event) => this.onDetailsToggle(event)}">
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
    this.$storyContainer =
      this.querySelector<HTMLElement>('.story_padded') || undefined;
    if (this.initialStoryFn) {
      this.renderStory(this.initialStoryFn);
    } else {
      this.renderCode();
    }
  }

  protected onDetailsToggle(event: { target: HTMLDetailsElement }): void {
    this.isOpen = event.target.open;
  }

  protected onCodeUpdate(): void {
    this.renderCode();
  }

  protected async renderCode(): Promise<void> {
    if (!this.previewRenderer) {
      this.renderError('previewRenderer is required');
      return;
    }
    const code = this.getActualCode();
    if (!code) {
      return;
    }
    try {
      if (this.language === 'html') {
        await this.renderHtml(code);
      } else if (this.language === 'js') {
        await this.renderJs(code);
      }
    } catch (e) {
      this.renderError(`${e}`);
    }
  }

  protected setActualCode(code: string) {
    const $editor = this.querySelector<CodeEditor>('dockit-code-editor');
    return $editor?.setCode(code);
  }

  protected getActualCode(): string {
    const $editor = this.querySelector<CodeEditor>('dockit-code-editor');
    return $editor?.getCode() || this.code;
  }

  protected async renderHtml(code: string): Promise<void> {
    render(html`${unsafeHTML(code)}`, this.$storyContainer!);
  }

  protected async renderJs(code: string): Promise<void> {
    const [argNames, argVals] = this.prepareArguments();
    const [importLines, innerLines] = this.prepareCode(code);
    const moduleUrl = esm`
      ${importLines.join('\n')}
      export default async (${argNames.join(', ')}) => {
        ${innerLines.join('\n')}
      }
    `;
    const module = await import(moduleUrl);
    const storyFn = await module.default(...argVals);
    if (!storyFn) {
      throw 'code must contain a story function: either on the last line or exported as a named export';
    }
    this.renderStory(storyFn);
  }

  protected prepareArguments(): [string[], unknown[]] {
    if (!this.scope && !this.defaultScope) {
      return [[], []];
    }
    const scope = { ...this.defaultScope, ...this.scope };
    const argNames = Object.keys(scope);
    const argVals = Object.values(scope);
    return [argNames, argVals];
  }

  protected prepareCode(code: string): [string[], string[]] {
    const codeLines = code
      .trim()
      .replace(
        this.export
          ? new RegExp(`/export \w+ ${this.export} =`)
          : 'export default',
        'return'
      )
      .split('\n');
    let importLines = codeLines.filter((line) =>
      line.trimStart().startsWith('import ')
    );
    if (this.importMaps) {
      const moduleSpecifiers = Object.keys(this.importMaps);
      importLines = importLines.map((line) => {
        moduleSpecifiers.forEach((moduleSpecifier) => {
          if (line.includes(moduleSpecifier)) {
            line = line
              .replace(
                `'${moduleSpecifier}'`,
                `'${this.importMaps![moduleSpecifier]}'`
              )
              .replace(
                `"${moduleSpecifier}"`,
                `"${this.importMaps![moduleSpecifier]}"`
              );
          }
        });
        return line;
      });
    }
    const innerLines = codeLines.filter(
      (line) => !line.trimStart().startsWith('import ')
    );
    return [importLines, innerLines];
  }

  protected renderStory(storyFn: () => unknown): void {
    this.previewRenderer(storyFn, this.$storyContainer!);
  }

  protected renderError(error: string): void {
    render(html`<pre>${error}</pre>`, this.$storyContainer!);
  }
}
