import { css } from 'lit';

export const ColumnsStyles = css`
  :host {
    display: flex;
    flex-direction: row;
    gap: var(--dockit-columns-gap, 1rem);
  }
`;
