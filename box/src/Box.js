import styles from './Box.module.css';

export class Box extends HTMLElement {
  connectedCallback() {
    const shouldShowCheckedBackground =
      (this.hasAttribute('checkered-background') &&
        this.getAttribute('checkered-background') !== 'false') ||
      !this.hasAttribute('checkered-background'); // enable checkered background by default

    const className = this.getAttribute('class-name') || '';
    const style = this.getAttribute('showcase-style') || '';

    this.innerHTML = /*html*/ `
      <div class="${styles.wrapper}">
        ${
          shouldShowCheckedBackground
            ? `<div id="${styles.checkered}" class="${className}"></div>`
            : ''
        }
        <div class="${className}" style="${style}"></div>
      </div>
      `;
  }
}
