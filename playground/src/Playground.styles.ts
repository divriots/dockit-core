import { css } from 'lit';

export const PlaygroundStyles = css`
  :host {
    border: 1px solid #404040;
    border-radius: 6px;
    margin-bottom: 15px;
  }

  lit-code {
    --editor-bg-color: #1e1e1e;
    --editor-caret-color: white;
    --editor-text-color: white;
  }

  .preview {
    background-color: var(--dockit-playground-preview-background);
    border-top: 1px solid #404040;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
    padding: 15px;
  }
`;
