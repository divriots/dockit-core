import { css, html, LitElement } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { ThemeMixin } from 'dark-theme-utils';
import 'prism-themes/themes/prism-vsc-dark-plus.css';
import './mdjs-styles.css';

export class MdjsLayout extends ThemeMixin(LitElement) {
  static get properties() {
    return {
      content: { attribute: false },
    };
  }

  render() {
    return html`${unsafeHTML(this.content)}`;
  }

  createRenderRoot() {
    return this;
  }
}
