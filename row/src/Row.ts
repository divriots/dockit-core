import { RowStyles } from './Row.styles';
import { LitElement, html } from 'lit';

/**
 * Component to render children in a row.
 */
export class Row extends LitElement {
  static styles = RowStyles;

  render() {
    return html`<slot></slot>`;
  }
}
