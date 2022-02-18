import styles from './CaptionedBox.module.css';
import '~/box/dockit-box.define.js';
import '~/caption/dockit-caption.define.js';
import { getCaption } from './caption-helper';

export class CaptionedBox extends HTMLElement {
  connectedCallback() {
    const showcaseClass = this.getAttribute('showcase-class');
    const showcaseStyle = this.getAttribute('showcase-style');
    const captionWidth = this.getAttribute('caption-width');
    const componentClass = this.getAttribute('class-name');

    this.innerHTML = /*html*/ `
<div class="${styles.container}">
  <dockit-box
    class-name="${showcaseClass} ${componentClass}"
    showcase-style="${showcaseStyle}"
  ></dockit-box>
  <dockit-caption
    text="${getCaption(showcaseClass, showcaseStyle)}"
    width="${captionWidth}"
  ></dockit-caption>
</div>`;
  }
}
