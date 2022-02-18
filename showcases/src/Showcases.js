import { CaptionedBox } from './CaptionedBox.js';
import { CaptionedText } from './CaptionedText';
import styles from './Showcases.module.css';
import { getCaption } from './caption-helper';

customElements.define('dockit-captioned-box', CaptionedBox);
customElements.define('dockit-captioned-text', CaptionedText);

export class Showcases extends HTMLElement {
  connectedCallback() {
    const type = this.getAttribute('component-type') || 'box';
    const showcaseComponent =
      type === 'box' ? 'dockit-captioned-box' : 'dockit-captioned-text';

    const componentClass = this.getAttribute('component-class');

    const showcaseClasses = this.getAttribute('showcase-classes');
    const showcaseStyles = this.getAttribute('showcase-styles');

    const showcaseAttr = showcaseClasses ? 'showcase-class' : 'showcase-style';
    const separator = !!showcaseClasses ? ' ' : ';';

    const showcases = (showcaseClasses || showcaseStyles)
      .split(separator)
      .filter((c) => !!c)
      .map((c) => c.trim());

    const hasLongText = this.hasAttribute('long-text');
    const longestName = showcases
      .map((val) =>
        getCaption(!!showcaseClasses && val, !!showcaseStyles && val)
      )
      .reduce((max, e) => Math.max(e.length, max), 0);

    const captionWidth = `${1 + longestName / 2}rem`;

    const showcaseComponents = showcases.reduce(
      (acc, showcase) => /*html*/ `${acc}
        <${showcaseComponent}
          class-name="${componentClass}"
          ${showcaseAttr}="${showcase}"
          ${hasLongText ? 'long-text' : ''}
          caption-width="${captionWidth}"
        ></${showcaseComponent}>`,
      ''
    );

    const containerClass = type === 'box' ? styles.boxes : styles.texts;
    this.innerHTML = /*html*/ `<div class="${containerClass}">${showcaseComponents}</div>`;
  }
}
