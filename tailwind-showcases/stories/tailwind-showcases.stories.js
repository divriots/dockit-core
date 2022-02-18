import '../dockit-tailwind-showcases.define.js';
import 'twind/shim';
import twTheme from 'tailwindcss/defaultTheme.js';
import { html } from 'lit';

export const bg_color = () => html`<dockit-tailwind-showcases
  showcase-key="backgroundColor"
  component-class="shadow-xl h-24 w-24"
  .theme=${twTheme}
></dockit-tailwind-showcases>`;

export const z_index = () => html`<dockit-tailwind-showcases
  showcase-key="zIndex"
  .theme=${twTheme}
></dockit-tailwind-showcases>`;

export const space = () => html`<dockit-tailwind-showcases
  showcase-key="space"
  .theme=${twTheme}
></dockit-tailwind-showcases>`;

export const opacity = () => html`<dockit-tailwind-showcases
  .theme=${twTheme}
  showcase-key="opacity"
  component-class="shadow-xl h-24 w-24 bg-blue-700"
></dockit-tailwind-showcases>`;

export const shadow = () => html`<dockit-tailwind-showcases
  .theme=${twTheme}
  showcase-key="shadow"
  component-class="h-24 w-24 bg-white"
></dockit-tailwind-showcases>`;

export const border_radius = () => html`<dockit-tailwind-showcases
  .theme=${twTheme}
  showcase-key="borderRadius"
  component-class="shadow-2xl h-24 w-24 bg-blue-400"
></dockit-tailwind-showcases>`;

export const border_width = () => html`<dockit-tailwind-showcases
  .theme=${twTheme}
  showcase-key="borderWidth"
  component-class="h-24 w-24 bg-gray-50"
></dockit-tailwind-showcases>`;

export const border_color = () => html`<dockit-tailwind-showcases
  .theme=${twTheme}
  showcase-key="borderColor"
  component-class="h-24 w-24 border-4 rounded"
></dockit-tailwind-showcases>`;

export const font_family = () => html`<dockit-tailwind-showcases
  .theme=${twTheme}
  showcase-key="fontFamily"
></dockit-tailwind-showcases>`;

export const font_size = () => html`<dockit-tailwind-showcases
  .theme=${twTheme}
  showcase-key="fontSize"
></dockit-tailwind-showcases>`;

export const font_weight = () => html`<dockit-tailwind-showcases
  .theme=${twTheme}
  showcase-key="fontWeight"
></dockit-tailwind-showcases>`;

export const letter_spacing = () => html`<dockit-tailwind-showcases
  .theme=${twTheme}
  showcase-key="letterSpacing"
></dockit-tailwind-showcases>`;

export const line_height = () => html`<dockit-tailwind-showcases
  .theme=${twTheme}
  showcase-key="lineHeight"
  long-text
></dockit-tailwind-showcases>`;

export const text_color = () => html`<dockit-tailwind-showcases
  .theme=${twTheme}
  showcase-key="textColor"
></dockit-tailwind-showcases>`;
