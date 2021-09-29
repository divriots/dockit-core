import { html, LitElement } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import '../../mdjs-layout-controls/mdjs-layout-controls.js';
import 'https://unpkg.com/construct-style-sheets-polyfill';
import styles from './mdjs-styles.css.js';

const sheet = new CSSStyleSheet();
sheet.replaceSync(styles);
document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet];

export class MdjsLayout extends LitElement {
  static get properties() {
    return {
      content: { attribute: false },
    };
  }

  render() {
    return html`
      <link
        rel="stylesheet"
        href="https://unpkg.com/prism-themes@1.9.0/themes/prism-vsc-dark-plus.css"
      />
      ${unsafeHTML(this.content)}
      <mdjs-layout-controls
        @config-changed=${this.configChanged}
      ></mdjs-layout-controls>
    `;
  }

  // redispatch for user to allow catching it in mdjs.config.js
  configChanged(ev) {
    /**
     * Example:
     * {
     *   key: 'color-scheme-dark-mode',
     *   oldValue: true,
     *   newValue: false,
     * }
     * or
     * {
     *   key: 'font-size',
     *   oldValue: '16px',
     *   newValue: '20px',
     * }
     */
    const { detail } = ev;
    this.dispatchEvent(
      new CustomEvent('config-changed', {
        detail,
      })
    );
  }

  createRenderRoot() {
    return this;
  }
}
