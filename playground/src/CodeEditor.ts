import Prism from 'prismjs';
import { CodeEditor as LiteCodeEditor } from './LiteCodeEditor';

export class CodeEditor extends LiteCodeEditor {
  private highlightCount = 0;

  _highlight_src(src_code, el_code) {
    this.highlightCount++;
    if (this.highlightCount > 2) {
      this.dispatchEvent(new CustomEvent('update', { detail: el_code }));
    }
    return Prism.highlightElement(el_code);
  }

  set code(code: string) {
    this.src_code = code;
  }

  get code(): string {
    return this.src_code;
  }
}
