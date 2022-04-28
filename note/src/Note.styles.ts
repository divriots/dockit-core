import { css } from 'lit';

export const colors = {
  info: css`#54AEFF66`,
  warning: css`#ECE81A66`,
  error: css`#FF818266`,
};

export const NoteStyles = css`
  [part='container'] {
    padding: 1rem;
    margin-bottom: 1rem;
    border-radius: 0.25rem;
    border-left: 0.25rem solid var(--dockit-note-color);
    background-color: var(--dockit-note-color);
  }
`;
