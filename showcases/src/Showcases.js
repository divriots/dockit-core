import styles from './Showcases.module.css';
import './DockitCaptionedBox';
import './DockitCaptionedText';

export class Showcases extends HTMLElement {
  connectedCallback() {
    const type = this.getAttribute('component-type') || 'box';
    const showcaseComponent =
      type === 'box' ? 'dockit-captioned-box' : 'dockit-captioned-text';

    const componentClass = this.getAttribute('component-class');
    const showcaseClasses = this.getAttribute('showcase-classes')
      .split(' ')
      .filter((c) => !!c);

    const useLongText =
      this.hasAttribute('long-text') &&
      this.getAttribute('long-text') !== 'false';

    const longestClassName = showcaseClasses.reduce(
      (max, e) => Math.max(e.length, max),
      0
    );
    const captionWidth = `${longestClassName / 2}rem`;

    const showcaseComponents = showcaseClasses.reduce(
      (acc, cls) => /*html*/ `${acc}
        <${showcaseComponent}
          class-name="${componentClass}"
          showcase-class="${cls}"
          long-text="${useLongText}"
          caption-width="${captionWidth}"
        ></${showcaseComponent}>`,
      ''
    );

    const containerClass = type === 'box' ? styles.boxes : styles.texts;
    this.innerHTML = /*html*/ `<div class="${containerClass}">${showcaseComponents}</div>`;
  }
}
