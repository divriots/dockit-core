import './CaptionedBox.css';
import '~/box';
import '~/caption';

const template = document.createElement('template');

const boxHtml = /*html*/ `
<div class="dockit-captioned-box-container">
  <dockit-box checkeredBackground $boxAttributes></dockit-box>
  <dockit-caption $captionAttributes></dockit-caption>
</div>`;

export class CaptionedBox extends HTMLElement {
  connectedCallback() {
    const showcaseClass = this.getAttribute('showcase-class');
    const captionWidth = this.getAttribute('caption-width');
    const componentClass = this.getAttribute('class-name');

    template.innerHTML = boxHtml
      .replace(
        '$boxAttributes',
        `class-name="${showcaseClass} ${componentClass}"`
      )
      .replace(
        '$captionAttributes',
        `text="${showcaseClass}" width="${captionWidth}"`
      );

    this.appendChild(template.content.cloneNode(true));
  }
}

customElements.define('dockit-captioned-box', CaptionedBox);
