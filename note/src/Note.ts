import './Note.styles.css';

const colors = {
  info: '#54AEFF66',
  warning: '#ECE81A66',
  error: '#FF818266',
};

/**
 * Component used to call out information in documentation pages.
 */
export class Note extends HTMLElement {
  connectedCallback() {
    const variant = this.getAttribute('variant');
    const color = this.getAttribute('color') || colors[variant] || colors.info;
    this.style.setProperty('--dockit-note-color', color);

    this.innerHTML = /*html*/ `
      <div class="container">
        ${this.innerHTML}
      </div>
    `;
  }
}
