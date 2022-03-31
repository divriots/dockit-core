import { css } from 'lit';

export const styles = css`
  .container {
    border-radius: 0.25rem;
    overflow: hidden;
  }

  .component-container {
    background-color: #00000010;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  ::slotted(*[slot='component']) {
    margin: 3rem 0;
  }

  .instructions-container {
    border-top-width: 0.2rem;
    border-top-style: solid;
    padding: 1.5rem;
    position: relative;
  }

  .background {
    position: absolute;
    opacity: 0.1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .title-container {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .title {
    margin-left: 0.5rem;
  }

  .instructions-wrapper {
    margin-top: 1rem;
  }
`;
