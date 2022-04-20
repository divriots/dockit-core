import { CodeEditor as LiteCodeEditor } from 'lite-code-editor/esm/editor.mjs';
import Prism from 'prismjs';

declare const LiteCodeEditor: typeof HTMLElement;

export class CodeEditor extends LiteCodeEditor {
  initialCode: string;

  getCode(): string {
    return this.src_code;
  }

  setCode(code: string): void {
    this.src_code = code;
  }

  constructor() {
    super();
    this.redispatchEvent = this.redispatchEvent.bind(this);
  }

  connectedCallback(): void {
    this.addEventListener('src_code', this.redispatchEvent);
    this.addEventListener('src_code:input', this.redispatchEvent);

    // patched version of the original method
    const src_code = this.initialCode;
    this.textContent = '';
    const state0 = { src_code, lang: this.lang };

    const el = (this._el_code = this._init_dom(this.ownerDocument));
    this._dom_connect(el, state0);
    this.src_code = src_code;
  }

  disconnectedCallback(): void {
    this.removeEventListener('src_code', this.redispatchEvent);
    this.removeEventListener('src_code:input', this.redispatchEvent);
    super.disconnectedCallback();
  }

  private redispatchEvent(event): void {
    event.stopImmediatePropagation();
    if (event.type === 'src_code:input') {
      this.dispatchEvent(
        new CustomEvent('update', { detail: event.detail.src_code })
      );
    }
  }

  private _highlight_src(_, el_code): string {
    return Prism.highlightElement(el_code);
  }
}
