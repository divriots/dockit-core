import '../dockit-space.define.js';
import { html } from 'lit';

export const space_numbers_array_scale = () => html`<dockit-space
  .scale=${[0, 1, 8, 16, 24, 32, 64, 128]}
></dockit-space>`;

export const space_rem_scale = () => html`
  <dockit-space
    .scale=${[0, '.25rem', '.5rem', '1rem', '2rem', '4rem', '8rem']}
  ></dockit-space>
`;

export const space_literal = () =>
  html`<dockit-space
    .scale=${{ small: 4, medium: 8, large: 16 }}
  ></dockit-space>`;
