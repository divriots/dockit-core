import { ColumnsStyles } from './Columns.styles';
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';

/**
 * Component to render children in a row.
 */
export class Columns extends LitElement {
  static styles = ColumnsStyles;

  render() {
    return html`<slot></slot>`;
  }
}
