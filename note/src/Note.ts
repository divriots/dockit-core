import { html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { NoteStyles, colors } from './Note.styles';

/**
 * Component used to call out information in documentation pages.
 */
export class Note extends LitElement {
  static styles = NoteStyles;

  @property()
  variant: string;

  render() {
    return html`<style>
        :host {
          --dockit-note-color: ${colors[this.variant] || colors.info};
        }
      </style>
      <div part="container">
        <slot></slot>
      </div>`;
  }
}
