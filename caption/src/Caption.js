import copyTextToClipboard from 'copy-to-clipboard';
import styles from './Caption.module.css';

export class Caption extends HTMLElement {
  copy() {
    const text = this.getAttribute('text');
    copyTextToClipboard(text);

    const tooltip = this.querySelector(`.${styles.tooltip}`);
    tooltip.textContent = 'Copied';
    setTimeout(() => (tooltip.textContent = 'Copy'), 2000);
  }

  connectedCallback() {
    this.onclick = this.copy;

    const width = this.getAttribute('width');
    const widthStyle = width ? `style="width:${width};"` : '';

    const text = this.getAttribute('text');

    this.innerHTML = /*html*/ `
  <div class="${styles.wrapper}">
    <pre ${widthStyle} class="${styles.text}">${text}</pre>
    <div class="${styles.tooltip}">Copy</div>
  </div>
`;
  }
}
