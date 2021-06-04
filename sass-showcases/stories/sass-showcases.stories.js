import '../index';
import './sass-showcases.css';
import './tokens.scss';
import { html } from 'lit-html';

export const background_color = () => html`<dockit-sass-showcases
  css-props-prefix="--color"
  component-class="box"
  style-key="background-color"
></dockit-sass-showcases>`;

export const z_index = () => html`<dockit-sass-showcases
  css-props-prefix="--z-index"
></dockit-sass-showcases>`;

export const transition = () => html`<dockit-sass-showcases
  css-props-prefix="--transition"
></dockit-sass-showcases>`;

export const border_radius = () => html`<dockit-sass-showcases
  css-props-prefix="--border-radius"
  component-class="box wide"
  style-key="border-radius"
  checkered-background="false"
></dockit-sass-showcases>`;

export const shadow = () => html`<dockit-sass-showcases
  css-props-prefix="--shadow"
  component-class="box white"
  style-key="box-shadow"
></dockit-sass-showcases>`;

export const spacing = () => html`<dockit-sass-showcases
  css-props-prefix="--spacing"
></dockit-sass-showcases>`;

export const line_height = () => html`<dockit-sass-showcases
  css-props-prefix="--line-height"
  component-type="text"
  style-key="line-height"
  long-text
></dockit-sass-showcases>`;

export const font_weight = () => html`<dockit-sass-showcases
  css-props-prefix="--font-weight"
  component-type="text"
  style-key="font-weight"
></dockit-sass-showcases>`;

export const font_size = () => html`<dockit-sass-showcases
  css-props-prefix="--font-size"
  component-type="text"
  style-key="font-size"
></dockit-sass-showcases>`;

export const font_family = () => html`<dockit-sass-showcases
  css-props-prefix="--font-family"
  component-type="text"
  style-key="font-family"
></dockit-sass-showcases>`;
