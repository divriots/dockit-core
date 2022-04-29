import copyTextToClipboard from 'copy-to-clipboard';
import clipboardStyles from './Clipboard.css';

export class Clipboard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  copy() {
    const text = this.shadowRoot
      .querySelector('slot')
      .assignedNodes()[0]?.textContent;
    copyTextToClipboard(text);

    const tooltip = this.shadowRoot.querySelector(`.tooltip`);
    tooltip.textContent = 'Copied';
    setTimeout(() => (tooltip.textContent = 'Copy'), 2000);
  }

  connectedCallback() {
    this.onclick = this.copy;

    const width = this.getAttribute('width');
    const widthStyle = width ? `style="width:${width};"` : '';

    this.shadowRoot.innerHTML = /*html*/ `
      <style>${clipboardStyles}</style>
      <div class="wrapper" ${widthStyle}>
        <div class="slotContainer">
          <slot></slot>
        </div>
        <div class="tooltip">Copy</div>
      </div>
    `;
  }
}
