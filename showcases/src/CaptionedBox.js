import styles from './CaptionedBox.module.css';
import '~/box';
import '~/caption';

export class CaptionedBox extends HTMLElement {
  connectedCallback() {
    const showcaseClass = this.getAttribute('showcase-class');
    const captionWidth = this.getAttribute('caption-width');
    const componentClass = this.getAttribute('class-name');

    this.innerHTML = /*html*/ `
<div class="${styles.container}">
  <dockit-box checkeredBackground class-name="${showcaseClass} ${componentClass}"></dockit-box>
  <dockit-caption text="${showcaseClass}" width="${captionWidth}"></dockit-caption>
</div>`;
  }
}
