import styles from './Box.module.css';
import { checkeredBackground } from './Box.styles';

export class Box extends HTMLElement {
  connectedCallback() {
    const hasCheckedBackground = this.hasAttribute('checkered-background');

    const className = this.getAttribute('class-name') || '';
    const style = this.getAttribute('showcase-style') || '';

    this.innerHTML = /*html*/ `
      <div class="${styles.wrapper}">
        ${
          hasCheckedBackground
            ? `<div style="${style}; ${checkeredBackground}" class="${className}"></div>`
            : ''
        }
        <div class="${className}" style="${style}"></div>
      </div>
      `;
  }
}
