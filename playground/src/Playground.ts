import { html, LitElement, TemplateResult } from 'lit';
import { property, state } from 'lit/decorators.js';
import 'prismjs';
import originalPrismTheme from 'https://cdn.jsdelivr.net/npm/prism-themes@1.9.0/themes/prism-vsc-dark-plus.css?raw';
import 'lit-code';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { PlaygroundStyles } from './Playground.styles';

const prismTheme2 = (originalPrismTheme as string)
  .replaceAll('1e1e1e', 'white')
  .replaceAll('pre[class*="language-"]', 'code.litcode_highlight > pre')
  .replaceAll('code[class*="language-"]', 'code.litcode_highlight');

const prismTheme = `
/*********************************************************
* Tokens
*/
.namespace {
	opacity: .7;
}

.token.doctype .token.doctype-tag {
	color: #569CD6;
}

.token.doctype .token.name {
	color: #9cdcfe;
}

.token.comment,
.token.prolog {
	color: #6a9955;
}

.token.punctuation,
.language-html .language-css .token.punctuation,
.language-html .language-javascript .token.punctuation {
	color: #d4d4d4;
}

.token.property,
.token.tag,
.token.boolean,
.token.number,
.token.constant,
.token.symbol,
.token.inserted,
.token.unit {
	color: #b5cea8;
}

.token.selector,
.token.attr-name,
.token.string,
.token.char,
.token.builtin,
.token.deleted {
	color: #ce9178;
}

.language-css .token.string.url {
	text-decoration: underline;
}

.token.operator,
.token.entity {
	color: #d4d4d4;
}

.token.operator.arrow {
	color: #569CD6;
}

.token.atrule {
	color: #ce9178;
}

.token.atrule .token.rule {
	color: #c586c0;
}

.token.atrule .token.url {
	color: #9cdcfe;
}

.token.atrule .token.url .token.function {
	color: #dcdcaa;
}

.token.atrule .token.url .token.punctuation {
	color: #d4d4d4;
}

.token.keyword {
	color: #569CD6;
}

.token.keyword.module,
.token.keyword.control-flow {
	color: #c586c0;
}

.token.function,
.token.function .token.maybe-class-name {
	color: #dcdcaa;
}

.token.regex {
	color: #d16969;
}

.token.important {
	color: #569cd6;
}

.token.italic {
	font-style: italic;
}

.token.constant {
	color: #9cdcfe;
}
`;

/**
 * Render and preview code with live code editor.
 */
export class Playground extends LitElement {
  static styles = PlaygroundStyles;

  @property()
  language: 'html' | 'js' = 'html';

  @property()
  code: any;

  @property({ attribute: false })
  scope: Object;

  @state()
  private errors: string;

  @state()
  private previewTemplate: TemplateResult;

  firstUpdated() {
    this.renderCode();
    // const $litCode = this.shadowRoot.querySelector('lit-code');
    // await $litCode.updateComplete;
    // const litcodeHighlight =
    //   this.shadowRoot.querySelector('.litcode_highlight');
    // debugger;
  }

  render() {
    return html`
      <style>
        ${prismTheme}
      </style>
      <lit-code
        noshadow
        mycolors
        language="${this.language}"
        code="${this.code}"
        @update=${() => this.onCodeUpdate()}
      ></lit-code>
      ${this.previewTemplate
        ? html`<div class="preview">${this.previewTemplate}</div>`
        : null}
      ${this.errors ? html`<pre class"errors">${this.errors}</pre>` : null}
    `;
  }

  private onCodeUpdate() {
    this.renderCode();
  }

  private async renderCode() {
    const code = this.shadowRoot.querySelector('lit-code').getCode();
    this.previewTemplate = null;
    this.errors = '';
    if (this.language === 'html') {
      this.previewTemplate = html`${unsafeHTML(code)}`;
    } else {
      try {
        const dataUri =
          'data:text/javascript;charset=utf-8,' +
          encodeURIComponent(
            'const html = (strings, ...values) => ({ strings, values });' +
              this.addExportDefaultIfNeeded(code)
          );
        const module = await import(dataUri);
        if (!module.default || !module.default.strings) {
          throw 'code must contain a default export or just an html template on the last line';
        }
        const { strings, values } = module.default;
        this.previewTemplate = html(strings, ...values);
      } catch (e) {
        this.errors = e;
      }
    }
  }

  private addExportDefaultIfNeeded(code: string) {
    const lines = code.split('\n');
    const lastIndex = lines.length - 1;
    const lastLine = lines[lastIndex];
    if (!lastLine.trimStart().startsWith('export ')) {
      lines[lastIndex] = `export default ${lastLine}`;
    }
    return lines.join('\n');
  }
}
