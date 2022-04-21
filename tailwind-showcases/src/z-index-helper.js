import { extractClassSuffixes } from './theme-helpers';

export const getZIndexHtml = (theme) => {
  const classes = extractClassSuffixes('zIndex', theme).map((s) => `z${s}`);
  const cells = classes
    .map(
      (cls, i) => /*html*/ `
    <div class="${cls}"
      style="
        height: 6rem;
        min-width: 8rem;
        margin-left: -6rem;
        padding: 2rem;
        margin-top: ${4 * i}rem;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid #FFF;
        background-color: #6366F1;
        border-radius: 0.375rem;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
      "
    >
      <dockit-clipboard style="color:#FFF; font-family: monospace">${cls}</dockit-clipboard>
    </div>`
    )
    .join(' ');

  return /*html*/ `
    <div style="display:flex;flex-direction:row;justify-content:center;">
      ${cells}
    </div>
  `;
};
