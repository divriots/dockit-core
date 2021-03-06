export const getZIndexHtml = (props) => {
  const cells = props
    .map(
      ([name], i) => /*html*/ `
    <div
      style="
        z-index: var(${name});
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
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
      "
    >
      <div style="color:#FFF;">${name}</div>
    </div>`
    )
    .join(' ');

  return /*html*/ `
    <div style="display:flex;flex-direction:row;justify-content:center;">
      ${cells}
    </div>
  `;
};
