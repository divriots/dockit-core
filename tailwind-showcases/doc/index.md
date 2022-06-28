```js script
import '@divriots/dockit-core/tailwind-showcases/dockit-tailwind-showcases.define.js';
```

# dockit-tailwind-showcases

Component to visualize Tailwind design tokens.

## Setup

```js
import '@divriots/dockit-core/tailwind-showcases/dockit-tailwind-showcases.define.js';
```

## Demos

We need the following imports for the demos below:

```js preview-story
import { html } from 'lit';
import 'twind/shim';
import twTheme from 'tailwindcss/defaultTheme.js';
export const demoImports = () => `<p>Check the imports code 👇</p>`;
```

### Background-color

```js preview-story
export const backgroundColor = () => html`<dockit-tailwind-showcases
  .theme=${twTheme}
  showcase-key="backgroundColor"
  component-class="shadow-xl h-24 w-24"
></dockit-tailwind-showcases>`;
```

### Border-color

```js preview-story
export const borderColor = () => html`<dockit-tailwind-showcases
  .theme=${twTheme}
  showcase-key="borderColor"
  component-class="h-24 w-24 border-4 rounded"
></dockit-tailwind-showcases>`;
```

### Text-color

```js preview-story
export const textColor = () => html`<dockit-tailwind-showcases
  .theme=${twTheme}
  showcase-key="textColor"
></dockit-tailwind-showcases>`;
```

### Border-radius

```js preview-story
export const borderRadius = () => html`<dockit-tailwind-showcases
  .theme=${twTheme}
  showcase-key="borderRadius"
  component-class="shadow-2xl h-24 w-24 bg-blue-400"
></dockit-tailwind-showcases>`;
```

### Border-width

```js preview-story
export const borderWidth = () => html`<dockit-tailwind-showcases
  .theme=${twTheme}
  showcase-key="borderWidth"
  component-class="h-24 w-24 bg-gray-50"
></dockit-tailwind-showcases>`;
```

### Opacity

```js preview-story
export const opacity = () => html`<dockit-tailwind-showcases
  .theme=${twTheme}
  showcase-key="opacity"
  component-class="shadow-xl h-24 w-24 bg-blue-700"
></dockit-tailwind-showcases>`;
```

### Shadow

```js preview-story
export const shadow = () => html`<dockit-tailwind-showcases
  .theme=${twTheme}
  showcase-key="shadow"
  component-class="h-24 w-24 bg-white"
></dockit-tailwind-showcases>`;
```

### Letter-spacing

```js preview-story
export const letterSpacing = () => html`<dockit-tailwind-showcases
  .theme=${twTheme}
  showcase-key="letterSpacing"
></dockit-tailwind-showcases>`;
```

### Line-height

```js preview-story
export const lineHeight = () => html`<dockit-tailwind-showcases
  .theme=${twTheme}
  showcase-key="lineHeight"
  long-text
  componentProps={{ useLongText: true }}
></dockit-tailwind-showcases>`;
```

### Font-weight

```js preview-story
export const fontWeight = () => html`<dockit-tailwind-showcases
  .theme=${twTheme}
  showcase-key="fontWeight"
></dockit-tailwind-showcases>`;
```

### Font-size

```js preview-story
export const fontSize = () => html`<dockit-tailwind-showcases
  .theme=${twTheme}
  showcase-key="fontSize"
></dockit-tailwind-showcases>`;
```

### Font-family

```js preview-story
export const fontFamily = () => html`<dockit-tailwind-showcases
  .theme=${twTheme}
  showcase-key="fontFamily"
></dockit-tailwind-showcases>`;
```

### Z-index

```js preview-story
export const zIndex = () => html`<dockit-tailwind-showcases
  .theme=${twTheme}
  showcase-key="zIndex"
></dockit-tailwind-showcases>`;
```

### Space

```js preview-story
export const space = () => html`<dockit-tailwind-showcases
  .theme=${twTheme}
  showcase-key="space"
></dockit-tailwind-showcases>`;
```
