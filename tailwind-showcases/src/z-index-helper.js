import { extractClassSuffixes } from './theme-helpers';

export const getZIndexHtml = (theme) => {
  const classes = extractClassSuffixes('zIndex', theme).map((s) => `z${s}`);
  const cells = classes
    .map(
      (cls, i) => /*html*/ `
    <div class="${cls} shadow-2xl"
      style="
        height: 6rem;
        min-width: 8rem;
        margin-left: -6rem;
        padding: 2rem;
        margin-top: ${4 * i}rem;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid #FFFFFF;
        background-color: #3F51B5;
        border-radius: 0.375rem;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
      "
    >
      <div style="color:#FFFFFF;">${cls}</div>
    </div>`
    )
    .join(' ');

  return /*html*/ `
    <div style="display:flex;flex-direction:row;justify-content:center;">
      ${cells}
    </div>
  `;
};
