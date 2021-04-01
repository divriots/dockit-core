import copyTextToClipboard from 'copy-to-clipboard';
import './caption.css';

const template = document.createElement('template');

template.innerHTML = /*html*/ `
  <div id="dockit-caption-wrapper">
    <div id="dockit-caption-text"></div>
    <div id="dockit-caption-tooltip">Copy</div>
  </div>
`;

class Caption extends HTMLElement {
  constructor() {
    super();
    this.appendChild(template.content.cloneNode(true));
  }

  copy() {
    const text = this.getAttribute('data-text');
    copyTextToClipboard(text);
    this.querySelector('#dockit-caption-tooltip').textContent = 'Copied';
    setTimeout(
      () =>
        (this.querySelector('#dockit-caption-tooltip').textContent = 'Copy'),
      2000
    );
  }

  connectedCallback() {
    this.onclick = this.copy;

    const text = this.getAttribute('data-text');
    const textElement = this.querySelector('#dockit-caption-text');
    textElement.textContent = text;

    const width = this.getAttribute('width');
    if (width) textElement.style = `width:${width}`;

    const setWidth = this.getAttribute('width');
    if (setWidth)
      this.querySelector('#dockit-caption-wrapper').style = `width:${setWidth}`;
  }
}

customElements.define('dockit-caption', Caption);
