import './showcases.css';
import '~/box';
import '~/caption';
import '~/text';

const template = document.createElement('template');

const textHtml = /*html*/ `
<div class="dockit-captioned-text-container">
  <dockit-caption $captionAttributes></dockit-caption>
  <dockit-text $textAttributes></dockit-text>
</div>`;

class CaptionedText extends HTMLElement {
  connectedCallback() {
    const showcaseClass = this.getAttribute('showcase-class');
    const captionWidth = this.getAttribute('caption-width');
    const useLongText =
      this.hasAttribute('long-text') &&
      this.getAttribute('long-text') !== 'false';

    template.innerHTML = textHtml
      .replace(
        '$textAttributes',
        `long-text="${useLongText}" class="${showcaseClass}"`
      )
      .replace(
        '$captionAttributes',
        `text="${showcaseClass}" width="${captionWidth}"`
      );

    this.appendChild(template.content.cloneNode(true));
  }
}

customElements.define('dockit-captioned-text', CaptionedText);
