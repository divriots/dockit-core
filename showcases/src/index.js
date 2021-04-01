import './showcases.css';
import '~/box';
import '~/caption';
import '~/text';

const containerTemplate = document.createElement('template');

containerTemplate.innerHTML = /*html*/ `<div></div>`;

const componentTemplate = document.createElement('template');

const boxHtmlTemplate = /*html*/ `
<div class="dockit-showcase-box-container">
  <dockit-box checkeredBackground class="$component-class"></dockit-box>
  <dockit-caption data-text="$class-name"></dockit-caption>
</div>`;

const textHtmlTemplate = /*html*/ `
<div class="dockit-showcase-text-container">
  <dockit-caption width="$width" data-text="$class-name"></dockit-caption>
  <dockit-text class="$component-class"></dockit-text>
</div>`;

class Showcases extends HTMLElement {
  constructor() {
    super();
    this.appendChild(containerTemplate.content.cloneNode(true));
  }

  connectedCallback() {
    const type = this.getAttribute('data-component-type') || 'box';

    const container = this.querySelector('div');
    if (type === 'box')
      container.className = 'dockit-showcases-boxes-container';
    else container.className = 'dockit-showcases-texts-container';

    const componentClass = this.getAttribute('data-component-class');

    const classes = this.getAttribute('data-showcase-classes')
      .split(',')
      .filter((c) => !!c);

    const htmlTemplate = type === 'box' ? boxHtmlTemplate : textHtmlTemplate;

    const longestClassName = classes.reduce(
      (max, e) => Math.max(e.length, max),
      0
    );
    const captionWidth = `${longestClassName / 2}rem`;

    classes.forEach((cls) => {
      componentTemplate.innerHTML = htmlTemplate
        .replace('$component-class', `${componentClass} ${cls}`)
        .replace('$class-name', cls)
        .replace('$width', captionWidth);

      container.appendChild(componentTemplate.content.cloneNode(true));
    });
  }
}

customElements.define('dockit-showcases', Showcases);
