import { extractClassSuffixes } from './theme-helpers';

export const getZIndexHtml = (theme) => {
  const classes = extractClassSuffixes('zIndex', theme).map((s) => `z${s}`);
  const cells = classes
    .map(
      (cls, i) => /*html*/ `
    <div class="${cls} rounded-md bg-indigo-500 shadow-2xl"
      style="
        height: 6rem;
        min-width: 8rem;
        margin-left: -6rem;
        padding: 2rem;
        margin-top: ${4 * i}rem;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid #fff;
      "
    >
      <div className="text-white">${cls}</div>
    </div>`
    )
    .join(' ');

  return /*html*/ `
    <div style="display:flex;flex-direction:row;justify-content:center;">
      ${cells}
    </div>
  `;
};
