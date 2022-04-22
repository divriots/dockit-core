import '../dockit-css-showcases.define.js';
import './css-showcases.css';
import './tokens.scss';

export const background_color_by_prefix = () => /*html*/ `<dockit-css-showcases
  checkered-background
  css-props-prefix="--color"
  component-class="box"
  style-key="background-color"
></dockit-css-showcases>`;

export const background_color_by_names = () => /*html*/ `<dockit-css-showcases
  checkered-background
  css-props-names="--color-white,--color-primary,--color-gray-300,--color-focus-outline"
  component-class="box"
  style-key="background-color"
></dockit-css-showcases>`;

export const z_index = () => /*html*/ `<dockit-css-showcases
  css-props-prefix="--z-index"
></dockit-css-showcases>`;

export const mode_z_index = () => /*html*/ `<dockit-css-showcases
  css-props-prefix="--layer"
  mode="z-index"
></dockit-css-showcases>`;

export const time = () => /*html*/ `<dockit-css-showcases
  css-props-prefix="--time"
></dockit-css-showcases>`;

export const mode_time = () => /*html*/ `<dockit-css-showcases
  css-props-prefix="--duration"
  mode="time"
></dockit-css-showcases>`;

export const transition_deprecated = () => /*html*/ `<dockit-css-showcases
  css-props-prefix="--transition"
></dockit-css-showcases>`;

export const easing = () => /*html*/ `<dockit-css-showcases
  css-props-prefix="--ease"
></dockit-css-showcases>`;

export const animation = () => /*html*/ `<dockit-css-showcases
  css-props-prefix="--animation"
></dockit-css-showcases>`;

export const border_radius = () => /*html*/ `<dockit-css-showcases
  css-props-prefix="--border-radius"
  component-class="box wide"
  style-key="border-radius"
></dockit-css-showcases>`;

export const shadow = () => /*html*/ `<dockit-css-showcases
  css-props-prefix="--shadow"
  component-class="box white"
  style-key="box-shadow"
></dockit-css-showcases>`;

export const spacing = () => /*html*/ `<dockit-css-showcases
  css-props-prefix="--spacing"
></dockit-css-showcases>`;

export const mode_scale = () => /*html*/ `<dockit-css-showcases
  css-props-prefix="--sizes"
  mode="scale"
></dockit-css-showcases>`;

export const letter_spacing = () => /*html*/ `<dockit-css-showcases
  css-props-prefix="--letter-spacing"
  component-type="text"
  style-key="letter-spacing"
></dockit-css-showcases>`;

export const line_height = () => /*html*/ `<dockit-css-showcases
  css-props-prefix="--line-height"
  component-type="text"
  style-key="line-height"
  long-text
></dockit-css-showcases>`;

export const font_weight = () => /*html*/ `<dockit-css-showcases
  css-props-prefix="--font-weight"
  component-type="text"
  style-key="font-weight"
></dockit-css-showcases>`;

export const font_size = () => /*html*/ `<dockit-css-showcases
  css-props-prefix="--font-size"
  component-type="text"
  style-key="font-size"
></dockit-css-showcases>`;

export const font_family = () => /*html*/ `<dockit-css-showcases
  css-props-prefix="--font-family"
  component-type="text"
  style-key="font-family"
></dockit-css-showcases>`;

export const regex_css_prefix = () => /*html*/ `<dockit-css-showcases
  css-props-prefix="--spacing-[x]{1,3}-"
></dockit-css-showcases>`;
