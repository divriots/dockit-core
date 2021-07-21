export const getScaleHtml = (props) => {
  const cells = props
    .map(
      ([name, value]) => /*html*/ `
        <tr>
          <td>
            <code>${name}</code>
          </td>
          <td>
            <code>${value}</code>
          </td>
          <td>
            <div style="width:var(${name}); height:1rem; background-color:#718096;"></div>
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
