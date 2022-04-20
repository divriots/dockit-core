import { html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { NoteStyles } from './Note.styles';

const colors = {
  info: '#54AEFF66',
  warning: '#ECE81A66',
  error: '#FF818266',
};

/**
 * Component used to call out information in documentation pages.
 */
export class Note extends LitElement {
  static styles = NoteStyles;

  @property()
  variant: string;

  @property()
  color: string;

  render() {
    return html`<style>
        :host {
          --dockit-note-color: ${this.color ||
          colors[this.variant] ||
          colors.info};
        }
      </style>
      <slot></slot>`;
  }
}
