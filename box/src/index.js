import './box.css';

const template = document.createElement('template');

template.innerHTML = /*html*/ `
<div id="dockit-box-wrapper">
  <div id="dockit-box-checkered"></div>  
  <div id="dockit-box-child"></div>
</div>
`;

class Box extends HTMLElement {
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
    this.querySelector('#dockit-box-child').className = this.className;
    this.querySelector('#dockit-box-checkered').className = this.className;
  }

  connectedCallback() {
    this.enableCheckeredBackground();
    this.applyClasses();
    this.removeAttribute('class');
  }
}

customElements.define('dockit-box', Box);
