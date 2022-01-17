import copyTextToClipboard from 'copy-to-clipboard';
import captionStyles from './Caption.css';

export class Caption extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  copy() {
    const text = this.getAttribute('text');
    copyTextToClipboard(text);

    const tooltip = this.shadowRoot.querySelector(`.tooltip`);
    tooltip.textContent = 'Copied';
    setTimeout(() => (tooltip.textContent = 'Copy'), 2000);
  }

  connectedCallback() {
    this.onclick = this.copy;

    const width = this.getAttribute('width');
    const widthStyle = width ? `style="width:${width};"` : '';

    const text = this.getAttribute('text');

    this.shadowRoot.innerHTML = /*html*/ `
      <style>${captionStyles}</style>
      <div class="wrapper">
        <pre ${widthStyle} class="text">${text}</pre>
        <div class="tooltip">Copy</div>
      </div>
    `;
  }
}
