import './Showcases.css';
import './CaptionedBox';
import './CaptionedText';

const template = document.createElement('template');

template.innerHTML = /*html*/ `<div></div>`;

const componentTemplate = document.createElement('template');
const boxHtml = /*html*/ `<dockit-captioned-box $attributes></dockit-captioned-box>`;
const textHtml = /*html*/ `<dockit-captioned-text $attributes></dockit-captioned-text>`;

class Showcases extends HTMLElement {
  constructor() {
    super();
    this.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    const type = this.getAttribute('component-type') || 'box';
    const componentHtml = type === 'box' ? boxHtml : textHtml;
    const container = this.querySelector('div');

    if (type === 'box')
      container.className = 'dockit-showcases-boxes-container';
    else container.className = 'dockit-showcases-texts-container';

    const componentClass = this.getAttribute('component-class');
    const useLongText =
      this.hasAttribute('long-text') &&
      this.getAttribute('long-text') !== 'false';

    const classes = this.getAttribute('showcase-classes')
      .split(' ')
      .filter((c) => !!c);

    const longestClassName = classes.reduce(
      (max, e) => Math.max(e.length, max),
      0
    );
    const captionWidth = `${longestClassName / 2}rem`;

    classes.forEach((cls) => {
      componentTemplate.innerHTML = componentHtml.replace(
        '$attributes',
        `class-name="${componentClass}" showcase-class="${cls}" long-text="${useLongText}" caption-width="${captionWidth}"`
      );
      container.appendChild(componentTemplate.content.cloneNode(true));
    });
  }
}

customElements.define('dockit-showcases', Showcases);
