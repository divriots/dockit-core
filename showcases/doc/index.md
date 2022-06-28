```js script
import '@divriots/dockit-core/showcases/dockit-showcases.define.js';
```

# dockit-showcases

Component to visualize different design tokens.

## Setup

```js
import '@divriots/dockit-core/showcases/dockit-showcases.define.js';
```

## Demos

### component-type="box" (default)

We need the following styles for the `box` demos:

```html preview-story
<p>Check the styles code 👇</p>
<style>
  .green-box {
    width: 6rem;
    height: 6rem;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    background-color: #2f855a;
  }
</style>
```

Classes via `showcase-classes`:

```html preview-story
<style>
  .opacity-0 {
    opacity: 0;
  }
  .opacity-20 {
    opacity: 0.2;
  }
  .opacity-40 {
    opacity: 0.4;
  }
  .opacity-60 {
    opacity: 0.6;
  }
  .opacity-80 {
    opacity: 0.8;
  }
  .opacity-100 {
    opacity: 1;
  }
</style>
<dockit-showcases
  checkered-background
  component-type="box"
  component-class="green-box"
  showcase-classes="opacity-0 opacity-20 opacity-40 opacity-60 opacity-80 opacity-100"
></dockit-showcases>
```

Styles via `showcase-styles`:

```html preview-story
<dockit-showcases
  checkered-background
  component-type="box"
  component-class="green-box"
  showcase-styles="opacity: 0; opacity: 0.2; opacity: 0.4; opacity: 0.6; opacity: 0.8; opacity: 1;"
></dockit-showcases>
```

Requires `checkered-background` to be able to see the opacity.

### component-type="text"

Classes via `showcase-classes`:

```html preview-story
<style>
  .xs {
    font-size: 12px;
  }
  .sm {
    font-size: 14px;
  }
  .base {
    font-size: 16px;
  }
  .lg {
    font-size: 18px;
  }
  .xl {
    font-size: 20px;
  }
</style>
<dockit-showcases
  component-type="text"
  showcase-classes="xs sm base lg xl"
></dockit-showcases>
```

Styles via `showcase-styles`:

```html preview-story
<dockit-showcases
  component-type="text"
  showcase-styles="font-size: 12px; font-size: 14px; font-size: 16px; font-size: 18px; font-size: 20px;"
></dockit-showcases>
```
