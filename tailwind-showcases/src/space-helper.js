export const getScaleHtml = (scale) => {
  const scaleValues = (Array.isArray(scale)
    ? scale.map((s, i) => [i, s])
    : Object.keys(scale).map((k) => [k, scale[k]])
  ).map(([k, v]) => [k, typeof v === 'number' ? `${v}px` : v]);

  const cells = scaleValues
    .map(
      ([name, value]) => /*html*/ `
        <tr>
          <td>${name}</td>
          <td>${value}</td>
          <td>
            <div style="width:${value};height:1rem;background-color:#718096;"></div>
          </td>
        </tr>
      `
    )
    .join(' ');

  return /*html*/ `
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Size</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        ${cells}
      </tbody>
    </table>
  `;
};
