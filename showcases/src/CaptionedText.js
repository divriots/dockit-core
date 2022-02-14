import styles from './CaptionedText.module.css';
import '~/caption/dockit-caption.define.js';
import '~/text/dockit-text.define.js';
import { getCaption } from './caption-helper';

export class CaptionedText extends HTMLElement {
  connectedCallback() {
    const showcaseClass = this.getAttribute('showcase-class');
    const showcaseStyle = this.getAttribute('showcase-style');
    const captionWidth = this.getAttribute('caption-width');
    const hasLongText = this.hasAttribute('long-text');

    this.innerHTML = /*html*/ `
<div class="${styles.container}">
  <dockit-caption
    text="${getCaption(showcaseClass, showcaseStyle)}"
    width="${captionWidth}"
  ></dockit-caption>
  <dockit-text
    ${hasLongText ? 'long-text' : ''}
    class="${showcaseClass}"
    style="${showcaseStyle}"
  ></dockit-text>
</div>`;
  }
}
