import { css } from 'lit';

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
