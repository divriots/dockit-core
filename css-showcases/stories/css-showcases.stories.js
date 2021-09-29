import '../index';
import './css-showcases.css';
import './tokens.scss';
import { html } from 'lit';

export const background_color_by_prefix = () => html`<dockit-css-showcases
  css-props-prefix="--color"
  component-class="box"
  style-key="background-color"
></dockit-css-showcases>`;

export const background_color_by_names = () => html`<dockit-css-showcases
  css-props-names="--color-white,--color-primary,--color-gray-300,--color-focus-outline"
  component-class="box"
  style-key="background-color"
></dockit-css-showcases>`;

export const z_index = () => html`<dockit-css-showcases
  css-props-prefix="--z-index"
></dockit-css-showcases>`;

export const transition = () => html`<dockit-css-showcases
  css-props-prefix="--transition"
></dockit-css-showcases>`;

export const border_radius = () => html`<dockit-css-showcases
  css-props-prefix="--border-radius"
  component-class="box wide"
  style-key="border-radius"
  checkered-background="false"
></dockit-css-showcases>`;

export const shadow = () => html`<dockit-css-showcases
  css-props-prefix="--shadow"
  component-class="box white"
  style-key="box-shadow"
></dockit-css-showcases>`;

export const spacing = () => html`<dockit-css-showcases
  css-props-prefix="--spacing"
></dockit-css-showcases>`;

export const letter_spacing = () => html`<dockit-css-showcases
  css-props-prefix="--letter-spacing"
  component-type="text"
  style-key="letter-spacing"
></dockit-css-showcases>`;

export const line_height = () => html`<dockit-css-showcases
  css-props-prefix="--line-height"
  component-type="text"
  style-key="line-height"
  long-text
></dockit-css-showcases>`;

export const font_weight = () => html`<dockit-css-showcases
  css-props-prefix="--font-weight"
  component-type="text"
  style-key="font-weight"
></dockit-css-showcases>`;

export const font_size = () => html`<dockit-css-showcases
  css-props-prefix="--font-size"
  component-type="text"
  style-key="font-size"
></dockit-css-showcases>`;

export const font_family = () => html`<dockit-css-showcases
  css-props-prefix="--font-family"
  component-type="text"
  style-key="font-family"
></dockit-css-showcases>`;