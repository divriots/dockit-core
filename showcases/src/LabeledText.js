import styles from './LabeledText.module.css';
import '~/label/dockit-label.define.js';
import '~/text/dockit-text.define.js';
import { getLabel } from './label-helper';

export class LabeledText extends HTMLElement {
  connectedCallback() {
    const showcaseClass = this.getAttribute('showcase-class');
    const showcaseStyle = this.getAttribute('showcase-style');
    const labelWidth = this.getAttribute('label-width');
    const hasLongText = this.hasAttribute('long-text');

    this.innerHTML = /*html*/ `
<div class="${styles.container}">
  <dockit-label
    width="${labelWidth}"
  >${getLabel(showcaseClass, showcaseStyle)}</dockit-label>
  <dockit-text
    ${hasLongText ? 'long-text' : ''}
    class="${showcaseClass}"
    style="${showcaseStyle}"
  ></dockit-text>
</div>`;
  }
}
