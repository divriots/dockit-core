import { ColumnsStyles } from './Columns.styles';
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';

/**
 * Component to render children in a row.
 */
export class Columns extends LitElement {
  static styles = ColumnsStyles;

  @property()
  gap: string;

  getStyle() {
    return !!this.gap
      ? html`<style>
          :host {
            --dockit-columns-gap: ${this.gap};
          }
        </style>`
      : '';
  }

  render() {
    return html`${this.getStyle()}<slot></slot>`;
  }
}
