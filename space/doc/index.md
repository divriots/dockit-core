```js script
import '@divriots/dockit-core/space/dockit-space.define.js';
```

# dockit-space

Component to visualize spacing tokens.

## Setup

```js
import '@divriots/dockit-core/space/dockit-space.define.js';
```

## Demos

We need the following imports for the demos below:

```js preview-story
import { html } from 'lit';
export const demoImports = () => `<p>Check the imports code 👇</p>`;
```

### px

```js preview-story
export const px = () =>
  html`<dockit-space .scale=${[0, 1, 8, 16, 24, 32, 64, 128]}></dockit-space>`;
```

### rem

```js preview-story
export const rem = () =>
  html`<dockit-space
    .scale=${[0, '.25rem', '.5rem', '1rem', '2rem', '4rem', '8rem']}
  ></dockit-space>`;
```

### named

```js preview-story
export const named = () =>
  html`<dockit-space
    .scale=${{ small: 4, medium: 8, large: 16 }}
  ></dockit-space>`;
```
