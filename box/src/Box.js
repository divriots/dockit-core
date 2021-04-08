import styles from './Box.module.css';

export class Box extends HTMLElement {
  connectedCallback() {
    const shouldShowCheckedBackground =
      this.hasAttribute('checkeredBackground') &&
      this.getAttribute('checkeredBackground') !== 'false';

    const className = this.getAttribute('class-name') || '';

    this.innerHTML = /*html*/ `
<div class="${styles.wrapper}">
  ${
    shouldShowCheckedBackground
      ? `<div id="${styles.checkered}" class="${className}"></div>`
      : ''
  }
  <div class="${className}"></div>
</div>
`;
  }
}
