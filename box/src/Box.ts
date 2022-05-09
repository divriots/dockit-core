import styles from './Box.module.css';

export class Box extends HTMLElement {
  connectedCallback() {
    const hasCheckedBackground = this.hasAttribute('checkered-background');

    const className = this.getAttribute('class-name') || '';
    const style = this.getAttribute('showcase-style') || '';

    this.innerHTML = /*html*/ `
      <div class="${styles.wrapper}">
        ${hasCheckedBackground ? `<div class="${styles.checkered}"></div>` : ''}
        <div class="${className}" style="${style}"></div>
      </div>
      `;
  }
}
