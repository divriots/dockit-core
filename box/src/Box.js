import './Box.css';

const template = document.createElement('template');

template.innerHTML = /*html*/ `
<div id="dockit-box-wrapper">
  <div id="dockit-box-checkered"></div>  
  <div id="dockit-box-child"></div>
</div>
`;

export class Box extends HTMLElement {
  constructor() {
    super();
    this.appendChild(template.content.cloneNode(true));
  }

  enableCheckeredBackground() {
    const shouldShowCheckedBackground =
      this.hasAttribute('checkeredBackground') &&
      this.getAttribute('checkeredBackground') !== 'false';

    this.querySelector(
      '#dockit-box-checkered'
    ).style = shouldShowCheckedBackground
      ? 'visibility:visible;'
      : 'visibility:hidden;';
  }

  applyClasses() {
    const className = this.getAttribute('class-name');
    this.querySelector('#dockit-box-child').className = className;
    this.querySelector('#dockit-box-checkered').className = className;
  }

  connectedCallback() {
    this.enableCheckeredBackground();
    this.applyClasses();
  }
}
