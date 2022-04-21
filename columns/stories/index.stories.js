import '~/columns/dockit-columns.define';
import '~/do-dont/define-all.js';

export default {
  parameters: {
    layout: 'centered',
  },
};

export const columns = () => /*html*/ `
  <dockit-columns>
    <dockit-do>
      <ul slot="instructions">
        <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>
        <li>
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
        </li>
        <li>Duis aute irure dolor in reprehenderit in voluptate velit</li>
      </ul>
    </dockit-do>
    <dockit-dont>
      <ul slot="instructions">
        <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>
        <li>
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
        </li>
        <li>Duis aute irure dolor in reprehenderit in voluptate velit</li>
      </ul>
    </dockit-dont>
  </dockit-columns>
`;

export const columns_custom_gap = () => /*html*/ `
  <dockit-columns style="gap: 0.5rem;">
    <dockit-do>
      <ul slot="instructions">
        <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>
        <li>
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
        </li>
        <li>Duis aute irure dolor in reprehenderit in voluptate velit</li>
      </ul>
    </dockit-do>
    <dockit-dont>
      <ul slot="instructions">
        <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>
        <li>
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
        </li>
        <li>Duis aute irure dolor in reprehenderit in voluptate velit</li>
      </ul>
    </dockit-dont>
  </dockit-columns>
`;