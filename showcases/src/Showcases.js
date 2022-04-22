import { renderCaptionedBox } from './captioned-box';
import { renderCaptionedText } from './captioned-text';
import styles from './Showcases.module.css';
import { getCaption } from './caption-helper';
import '@divriots/dockit-core/box/dockit-box.define.js';
import '@divriots/dockit-core/text/dockit-text.define.js';
import '@divriots/dockit-core/clipboard/dockit-clipboard.define.js';

export class Showcases extends HTMLElement {
  connectedCallback() {
    const type = this.getAttribute('component-type') || 'box';
    const renderComponent =
      type === 'box' ? renderCaptionedBox : renderCaptionedText;

    const componentClass = this.getAttribute('component-class');
    const hasCheckeredBackground = this.hasAttribute('checkered-background');

    const showcaseClasses = this.getAttribute('showcase-classes');
    const showcaseStyles = this.getAttribute('showcase-styles');

    const showcaseAttr = showcaseClasses ? 'showcaseClass' : 'showcaseStyle';
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
      (acc, showcase) => /*html*/ `
      ${acc}
      ${renderComponent({
        componentClass,
        [showcaseAttr]: showcase,
        hasLongText,
        captionWidth,
        hasCheckeredBackground,
      })}
    `,
      ''
    );

    const containerClass = type === 'box' ? styles.boxes : styles.texts;
    this.innerHTML = /*html*/ `<div class="${containerClass}">${showcaseComponents}</div>`;
  }
}
