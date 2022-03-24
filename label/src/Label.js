import copyTextToClipboard from 'copy-to-clipboard';
import labelStyles from './label.css';

export class Label extends HTMLElement {
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
      <style>${labelStyles}</style>
      <div class="wrapper">
        <pre ${widthStyle} class="text"><slot></slot></pre>
        <div class="tooltip">Copy</div>
      </div>
    `;
  }
}
