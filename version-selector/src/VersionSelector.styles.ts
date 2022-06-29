import { css } from 'lit';

export const VersionSelectorStyles = css`
  select {
    border: 1px solid var(--dockit-layout-header-border-color);
    border-radius: 0.5rem;
    padding: 0.5rem;
    width: 100%;
    z-index: 11;
    position: relative;
    background: var(--dockit-layout-bg);
    font-size: large;
    color: inherit;
  }
`;
