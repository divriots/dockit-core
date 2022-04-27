import { css, CSSResult } from 'lit';

export const colors = {
  info: '#54AEFF66',
  warning: '#ECE81A66',
  error: '#FF818266',
};

export const NoteStyles = css`
  :host {
    display: block;
    padding: 1rem;
    margin-bottom: 1rem;
    border-radius: 0.25rem;
    border-left: 0.25rem solid var(--dockit-note-color);
    background-color: var(--dockit-note-color);
  }
`;
