import styles from './LabeledBox.module.css';
import '~/box/dockit-box.define.js';
import '~/label/dockit-label.define.js';
import { getLabel } from './label-helper';

export class LabeledBox extends HTMLElement {
  connectedCallback() {
    const showcaseClass = this.getAttribute('showcase-class');
    const showcaseStyle = this.getAttribute('showcase-style');
    const labelWidth = this.getAttribute('label-width');
    const componentClass = this.getAttribute('class-name');
    const hasCheckeredBackground = this.hasAttribute('checkered-background');

    this.innerHTML = /*html*/ `
<div class="${styles.container}">
  <dockit-box
    ${hasCheckeredBackground ? 'checkered-background' : ''}
    class-name="${showcaseClass} ${componentClass}"
    showcase-style="${showcaseStyle}"
  ></dockit-box>
  <dockit-label
    width="${labelWidth}"
  >${getLabel(showcaseClass, showcaseStyle)}</dockit-label>
</div>`;
  }
}
