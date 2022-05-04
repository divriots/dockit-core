export class Space extends HTMLElement {
  scale: (number | string)[] | Record<string, number | string>;

  constructor() {
    super();
    this.scale = [];
  }
  connectedCallback() {
    const scaleValues = (
      Array.isArray(this.scale)
        ? this.scale.map((s, i) => [i, s])
        : Object.keys(this.scale).map((k) => [k, this.scale[k]])
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

    this.innerHTML = /*html*/ `
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
  }
}
