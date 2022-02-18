import styles from './Box.module.css';

export class Box extends HTMLElement {
  connectedCallback() {
    const className = this.getAttribute('class-name') || '';
    const style = this.getAttribute('showcase-style') || '';

    this.innerHTML = /*html*/ `
      <div class="${styles.wrapper}">
        <div class="${styles.checkered} ${className}"></div>
        <div class="${className}" style="${style}"></div>
      </div>
      `;
  }
}
