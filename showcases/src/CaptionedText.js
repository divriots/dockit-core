import styles from './CaptionedText.module.css';
import '~/caption';
import '~/text';

export class CaptionedText extends HTMLElement {
  connectedCallback() {
    const showcaseClass = this.getAttribute('showcase-class');
    const captionWidth = this.getAttribute('caption-width');
    const useLongText = this.getAttribute('long-text');

    this.innerHTML = /*html*/ `
<div class="${styles.container}">
  <dockit-caption text="${showcaseClass}" width="${captionWidth}"></dockit-caption>
  <dockit-text long-text="${useLongText}" class="${showcaseClass}"></dockit-text>
</div>`;
  }
}