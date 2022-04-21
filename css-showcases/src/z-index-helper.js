export const getZIndexHtml = (props) => {
  const cells = props
    .map(
      ([name], i) => /*html*/ `
    <div
      style="
        z-index: var(${name});
        height: 8rem;
        width: 11rem;
        margin-left: -9rem;
        margin-top: ${6 * i}rem;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid #FFF;
        background-color: #6366F1;
        border-radius: 0.375rem;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
      "
    >
      <dockit-clipboard style="color:#FFF; font-family: monospace;">${name}</dockit-clipboard>
    </div>`
    )
    .join(' ');

  return /*html*/ `
    <div style="display:flex;flex-direction:row;justify-content:center;margin-left:9rem;">
      ${cells}
    </div>
  `;
};
