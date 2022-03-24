import { LabeledBox } from './LabeledBox.js';
import { LabeledText } from './LabeledText';
import styles from './Showcases.module.css';
import { getLabel } from './label-helper';

customElements.define('dockit-labeled-box', LabeledBox);
customElements.define('dockit-labeled-text', LabeledText);

export class Showcases extends HTMLElement {
  connectedCallback() {
    const type = this.getAttribute('component-type') || 'box';
    const showcaseComponent =
      type === 'box' ? 'dockit-labeled-box' : 'dockit-labeled-text';

    const componentClass = this.getAttribute('component-class');
    const hasCheckeredBackground = this.hasAttribute('checkered-background');

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
      .map((val) => getLabel(!!showcaseClasses && val, !!showcaseStyles && val))
      .reduce((max, e) => Math.max(e.length, max), 0);

    const labelWidth = `${1 + longestName / 2}rem`;

    const showcaseComponents = showcases.reduce(
      (acc, showcase) => /*html*/ `${acc}
        <${showcaseComponent}
          class-name="${componentClass}"
          ${showcaseAttr}="${showcase}"
          ${hasLongText ? 'long-text' : ''}
          label-width="${labelWidth}"
          ${hasCheckeredBackground ? 'checkered-background' : ''}
        ></${showcaseComponent}>`,
      ''
    );

    const containerClass = type === 'box' ? styles.boxes : styles.texts;
    this.innerHTML = /*html*/ `<div class="${containerClass}">${showcaseComponents}</div>`;
  }
}
