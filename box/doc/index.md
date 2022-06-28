```js script
import '@divriots/dockit-core/box/dockit-box.define.js';
```

# dockit-box

Building block to showcase various design tokens, from colors to shadows.

## Setup

```js
import '@divriots/dockit-core/box/dockit-box.define.js';
```

## Demos

We need the following styles for the demos below:

```html preview-story
<p>Check the styles code 👇</p>
<style>
  .box {
    width: 8rem;
    height: 8rem;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  }

  .background {
    background-color: #2f855a;
  }

  .opacity {
    opacity: 0.7;
  }

  .roundness {
    border-radius: 0.8rem;
  }
</style>
```

### Box

```html preview-story
<dockit-box class-name="box"></dockit-box>
```

### Box with background

```html preview-story
<dockit-box class-name="box background"></dockit-box>
```

### Box with background and opacity

```html preview-story
<dockit-box
  checkered-background
  class-name="box background opacity"
></dockit-box>
```

Requires `checkered-background` to be able to see the opacity.

### Box with background and roundness

```html preview-story
<dockit-box class-name="box background roundness"></dockit-box>
```
