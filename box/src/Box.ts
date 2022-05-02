import * as styles from './Box.styles';

export class Box extends HTMLElement {
  connectedCallback() {
    const hasCheckedBackground = this.hasAttribute('checkered-background');

    const className = this.getAttribute('class-name') || '';
    const style = this.getAttribute('showcase-style') || '';

    this.innerHTML = /*html*/ `
      <div style="${style};${styles.wrapper}" class="${className}">
        ${hasCheckedBackground ? `<div style="${styles.checkered}"></div>` : ''}
        <div class="${className}" style="${style}"></div>
      </div>
      `;
  }
}
