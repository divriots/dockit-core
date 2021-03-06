import styles from './CaptionedText.module.css';
import '~/caption';
import '~/text';
import { getCaption } from './caption-helper';

export class CaptionedText extends HTMLElement {
  connectedCallback() {
    const showcaseClass = this.getAttribute('showcase-class');
    const showcaseStyle = this.getAttribute('showcase-style');
    const captionWidth = this.getAttribute('caption-width');
    const useLongText = this.getAttribute('long-text');

    this.innerHTML = /*html*/ `
<div class="${styles.container}">
  <dockit-caption
    text="${getCaption(showcaseClass, showcaseStyle)}"
    width="${captionWidth}"
  ></dockit-caption>
  <dockit-text long-text="${useLongText}" class="${showcaseClass}" style="${showcaseStyle}"></dockit-text>
</div>`;
  }
}
