```js script
import '@divriots/dockit-core/css-showcases/dockit-css-showcases.define.js';
```

# dockit-css-showcases

Component to visualize different design tokens implemented as CSS custom properties.

## Setup

```js
import '@divriots/dockit-core/css-showcases/dockit-css-showcases.define.js';
```

## Demos

We need the following styles for the demos below:

```html preview-story
<p>Check the styles code 👇</p>
<style>
  .box {
    width: 6rem;
    height: 6rem;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    background-color: #2f855a;
    border-radius: 0.2rem;
  }

  .wide {
    width: 10rem;
  }

  .white {
    background-color: #ffffff;
  }
</style>
```

### Color

By prefix:

```html preview-story
<style>
  :root {
    --color-white: #ffffff;
    --color-primary: #3082ce;
    --color-gray-300: #cbd5e0;
    --color-focus-outline: #4299e14c;
  }
</style>
<dockit-css-showcases
  checkered-background
  css-props-prefix="--color"
  component-class="box"
  style-key="background-color"
></dockit-css-showcases>
```

By names:

```html preview-story
<style>
  :root {
  }
</style>
<dockit-css-showcases
  checkered-background
  css-props-names="--color-white,--color-primary,--color-gray-300,--color-focus-outline"
  component-class="box"
  style-key="background-color"
></dockit-css-showcases>
```

Requires `checkered-background` to be able to see the opacity.

### Border-radius

```html preview-story
<style>
  :root {
    --border-radius-small: 0.125rem;
    --border-radius-medium: 0.25rem;
    --border-radius-large: 0.5rem;
    --border-radius-x-large: 1rem;
    --border-radius-circle: 50%;
    --border-radius-pill: 9999px;
  }
</style>
<dockit-css-showcases
  css-props-prefix="--border-radius"
  component-class="box wide"
  style-key="border-radius"
></dockit-css-showcases>
```

### Opacity

```html preview-story
<style>
  :root {
    --opacity-0: 0;
    --opacity-20: 0.2;
    --opacity-40: 0.4;
    --opacity-60: 0.6;
    --opacity-80: 0.8;
    --opacity-100: 1;
  }
</style>
<dockit-css-showcases
  checkered-background
  css-props-prefix="--opacity"
  component-class="box"
  style-key="opacity"
></dockit-css-showcases>
```

Requires `checkered-background` to be able to see the opacity.

### Shadow

```html preview-story
<style>
  :root {
    --shadow-x-small: 0 1px 0 #0d131e0d;
    --shadow-small: 0 1px 2px #0d131e1a;
    --shadow-medium: 0 2px 4px #0d131e1a;
    --shadow-large: 0 2px 8px #0d131e1a;
    --shadow-x-large: 0 4px 16px #0d131e1a;
    --shadow-outline: 0 0 0 3px #4299e14c;
  }
</style>
<dockit-css-showcases
  css-props-prefix="--shadow"
  component-class="box white"
  style-key="box-shadow"
></dockit-css-showcases>
```

### Letter-spacing

```html preview-story
<style>
  :root {
    --letter-spacing-dense: -0.075em;
    --letter-spacing-normal: normal;
    --letter-spacing-loose: 0.075em;
  }
</style>
<dockit-css-showcases
  css-props-prefix="--letter-spacing"
  component-type="text"
  style-key="letter-spacing"
></dockit-css-showcases>
```

### Line-height

```html preview-story
<style>
  :root {
    --line-height-dense: 1.4;
    --line-height-normal: 1.8;
    --line-height-loose: 2.2;
  }
</style>
<dockit-css-showcases
  css-props-prefix="--line-height"
  component-type="text"
  style-key="line-height"
  long-text
></dockit-css-showcases>
```

### Font-weight

```html preview-story
<style>
  :root {
    --font-weight-light: 300;
    --font-weight-normal: 400;
    --font-weight-semibold: 500;
    --font-weight-bold: 700;
  }
</style>
<dockit-css-showcases
  css-props-prefix="--font-weight"
  component-type="text"
  style-key="font-weight"
></dockit-css-showcases>
```

### Font-size

```html preview-story
<style>
  :root {
    --font-size-xx-small: 0.625rem;
    --font-size-x-small: 0.75rem;
    --font-size-small: 0.875rem;
    --font-size-medium: 1rem;
    --font-size-large: 1.25rem;
    --font-size-x-large: 1.5rem;
    --font-size-xx-large: 2.25rem;
    --font-size-xxx-large: 3rem;
    --font-size-xxxx-large: 4.5rem;
  }
</style>
<dockit-css-showcases
  css-props-prefix="--font-size"
  component-type="text"
  style-key="font-size"
></dockit-css-showcases>
```

### Font-family

```html preview-story
<style>
  :root {
    --font-family-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
      Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
      'Segoe UI Symbol';
    --font-family-serif: Georgia, 'Times New Roman', serif;
    --font-family-mono: Menlo, Monaco, 'Courier New', monospace;
  }
</style>
<dockit-css-showcases
  css-props-prefix="--font-family"
  component-type="text"
  style-key="font-family"
></dockit-css-showcases>
```

### Z-index

With a standard prefix:

```html preview-story
<style>
  :root {
    --z-index-drawer: 700;
    --z-index-dialog: 800;
    --z-index-dropdown: 900;
    --z-index-toast: 950;
    --z-index-tooltip: 1000;
  }
</style>
<dockit-css-showcases css-props-prefix="--z-index"></dockit-css-showcases>
```

With a custom prefix and explicit mode:

```html preview-story
<style>
  :root {
    --layer-drawer: 700;
    --layer-dialog: 800;
    --layer-dropdown: 900;
    --layer-toast: 950;
    --layer-tooltip: 1000;
  }
</style>
<dockit-css-showcases
  css-props-prefix="--layer"
  mode="z-index"
></dockit-css-showcases>
```

### Time

With a standard prefix:

```html preview-story
<style>
  :root {
    --time-x-slow: 1000ms;
    --time-slow: 500ms;
    --time-medium: 250ms;
    --time-fast: 150ms;
    --time-x-fast: 50ms;
  }
</style>
<dockit-css-showcases css-props-prefix="--time"></dockit-css-showcases>
```

The standard prefix used to be `transition`, but now it's deprecated.

```html preview-story
<style>
  :root {
    --transition-x-slow: 1000ms;
    --transition-slow: 500ms;
    --transition-medium: 250ms;
    --transition-fast: 150ms;
    --transition-x-fast: 50ms;
  }
</style>
<dockit-css-showcases css-props-prefix="--transition"></dockit-css-showcases>
```

With a custom prefix and explicit mode:

```html preview-story
<style>
  :root {
    --duration-x-slow: 1000ms;
    --duration-slow: 500ms;
    --duration-medium: 250ms;
    --duration-fast: 150ms;
    --duration-x-fast: 50ms;
  }
</style>
<dockit-css-showcases
  css-props-prefix="--duration"
  mode="time"
></dockit-css-showcases>
```

### Easing

With a standard prefix:

```html preview-story
<style>
  :root {
    --ease: cubic-bezier(0.25, 0, 0.5, 1);
    --ease-in: cubic-bezier(0.25, 0, 1, 1);
    --ease-out: cubic-bezier(0, 0, 0.75, 1);
    --ease-in-out: cubic-bezier(0.1, 0, 0.9, 1);
    --ease-elastic: cubic-bezier(0.5, 0.75, 0.75, 1.25);
    --ease-squish: cubic-bezier(0.5, -0.1, 0.1, 1.5);
    --ease-step: steps(2);
  }
</style>
<dockit-css-showcases css-props-prefix="--ease"></dockit-css-showcases>
```

With a custom prefix and explicit mode:

```html preview-story
<style>
  :root {
    --easing-function: cubic-bezier(0.25, 0, 0.5, 1);
    --easing-function-in: cubic-bezier(0.25, 0, 1, 1);
    --easing-function-out: cubic-bezier(0, 0, 0.75, 1);
    --easing-function-in-out: cubic-bezier(0.1, 0, 0.9, 1);
    --easing-function-elastic: cubic-bezier(0.5, 0.75, 0.75, 1.25);
    --easing-function-squish: cubic-bezier(0.5, -0.1, 0.1, 1.5);
    --easing-function-step: steps(2);
  }
</style>
<dockit-css-showcases
  css-props-prefix="--easing-function"
  mode="ease"
></dockit-css-showcases>
```

### Animation

With a standard prefix:

```html preview-story
<style>
  :root {
    --animation-spin: spin 2s linear infinite;
    --animation-ping: ping 5s cubic-bezier(0, 0, 0.75, 1) infinite;
    --animation-blink: blink 1s cubic-bezier(0, 0, 0.75, 1) infinite;
    --animation-float: float 3s cubic-bezier(0, 0, 0.75, 1) infinite;
    --animation-bounce: bounce 2s cubic-bezier(0.5, -0.1, 0.1, 1.5) infinite;
    --animation-pulse: pulse 2s cubic-bezier(0, 0, 0.75, 1) infinite;
  }
  @keyframes spin {
    to {
      transform: rotate(1turn);
    }
  }
  @keyframes ping {
    90%,
    100% {
      transform: scale(2);
      opacity: 0;
    }
  }
  @keyframes blink {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
  @keyframes float {
    50% {
      transform: translateY(-25%);
    }
  }
  @keyframes bounce {
    25% {
      transform: translateY(-20%);
    }
    40% {
      transform: translateY(-3%);
    }
    0%,
    60%,
    100% {
      transform: translateY(0);
    }
  }
  @keyframes pulse {
    50% {
      transform: scale(0.9, 0.9);
    }
  }
</style>
<dockit-css-showcases css-props-prefix="--animation"></dockit-css-showcases>
```

With a custom prefix and explicit mode:

```html preview-story
<style>
  :root {
    --effect-spin: spin 2s linear infinite;
    --effect-ping: ping 5s cubic-bezier(0, 0, 0.75, 1) infinite;
    --effect-blink: blink 1s cubic-bezier(0, 0, 0.75, 1) infinite;
    --effect-float: float 3s cubic-bezier(0, 0, 0.75, 1) infinite;
    --effect-bounce: bounce 2s cubic-bezier(0.5, -0.1, 0.1, 1.5) infinite;
    --effect-pulse: pulse 2s cubic-bezier(0, 0, 0.75, 1) infinite;
  }
  @keyframes spin {
    to {
      transform: rotate(1turn);
    }
  }
  @keyframes ping {
    90%,
    100% {
      transform: scale(2);
      opacity: 0;
    }
  }
  @keyframes blink {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
  @keyframes float {
    50% {
      transform: translateY(-25%);
    }
  }
  @keyframes bounce {
    25% {
      transform: translateY(-20%);
    }
    40% {
      transform: translateY(-3%);
    }
    0%,
    60%,
    100% {
      transform: translateY(0);
    }
  }
  @keyframes pulse {
    50% {
      transform: scale(0.9, 0.9);
    }
  }
</style>
<dockit-css-showcases
  css-props-prefix="--effect"
  mode="animation"
></dockit-css-showcases>
```

### Spacing

With a standard prefix:

```html preview-story
<style>
  :root {
    --spacing-xxx-small: 0.125rem;
    --spacing-xx-small: 0.25rem;
    --spacing-x-small: 0.5rem;
    --spacing-small: 0.75rem;
    --spacing-medium: 1rem;
    --spacing-large: 1.25rem;
    --spacing-x-large: 1.75rem;
    --spacing-xx-large: 2.25rem;
    --spacing-xxx-large: 3rem;
    --spacing-xxxx-large: 4.5rem;
  }
</style>
<dockit-css-showcases css-props-prefix="--spacing"></dockit-css-showcases>
```

With a custom prefix and explicit mode:

```html preview-story
<style>
  :root {
    --sizes-xxx-small: 0.125rem;
    --sizes-xx-small: 0.25rem;
    --sizes-x-small: 0.5rem;
    --sizes-small: 0.75rem;
    --sizes-medium: 1rem;
    --sizes-large: 1.25rem;
    --sizes-x-large: 1.75rem;
    --sizes-xx-large: 2.25rem;
    --sizes-xxx-large: 3rem;
    --sizes-xxxx-large: 4.5rem;
  }
</style>
<dockit-css-showcases
  css-props-prefix="--sizes"
  mode="scale"
></dockit-css-showcases>
```

With a regexp:

```html preview-story
<style>
  :root {
    --lengths-xxx-small: 0.125rem;
    --lengths-xx-small: 0.25rem;
    --lengths-x-small: 0.5rem;
    --lengths-small: 0.75rem;
    --lengths-medium: 1rem;
    --lengths-large: 1.25rem;
    --lengths-x-large: 1.75rem;
    --lengths-xx-large: 2.25rem;
    --lengths-xxx-large: 3rem;
    --lengths-xxxx-large: 4.5rem;
  }
</style>
<dockit-css-showcases
  css-props-prefix="--lengths-[x]{1,3}"
  mode="scale"
></dockit-css-showcases>
```
