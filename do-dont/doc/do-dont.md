```js script
import '@divriots/dockit-core/do-dont/dockit-do.define.js';
import '@divriots/dockit-core/do-dont/dockit-dont.define.js';

const sampleButton = `<div
  slot="component"
  style="background-color: #00000030; padding: .5rem; font-weight: 600; border-radius: .25rem;"
>
  SAMPLE BUTTON
</div>`;
```

# dockit-do & dockit-dont

Component to render general instructions or for a specific component.
It can take a component in the "component" slot, and instructions html in the "instructions" slot.
Label, color and icon can be customised.
See setup and usage examples below:

## Setup

```js
import '@divriots/dockit-core/do-dont/dockit-dont.define.js';
import '@divriots/dockit-core/do-dont/dockit-do.define.js';

// or define all
import '@divriots/dockit-core/do-dont/define-all.js';
```

## API

```js story
import { html } from 'lit';
import manifest from '../../custom-elements.json';
export const api = () =>
  html`<api-docs
    .manifest="${manifest}"
    only="dockit-do,dockit-dont"
    selected="dockit-do"
  ></api-docs>`;
```

## Demos

### Do

```html preview-story
<dockit-do>
  <ul slot="instructions">
    <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>
    <li>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris</li>
    <li>Duis aute irure dolor in reprehenderit in voluptate velit</li>
  </ul>
</dockit-do>
```

### Do with component

```js preview-story
export const do_with_component = () => `
  <dockit-do>
    ${sampleButton}
    <ul slot="instructions">
      <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>
      <li>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris</li>
      <li>Duis aute irure dolor in reprehenderit in voluptate velit</li>
    </ul>
  </dockit-do
>`;
```

### Don't

```html preview-story
<dockit-dont>
  <ul slot="instructions">
    <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>
    <li>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris</li>
    <li>Duis aute irure dolor in reprehenderit in voluptate velit</li>
  </ul>
</dockit-dont>
```

### Don't with component

```js preview-story
export const dont_with_component = () => html`<dockit-dont>
  ${sampleButton}
  <ul slot="instructions">
    <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>
    <li>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris</li>
    <li>Duis aute irure dolor in reprehenderit in voluptate velit</li>
  </ul>
</dockit-dont>`;
```

### Do with custom color and label

```html preview-story
<dockit-do style="--dockit-do-color: #fcba03" label="HINTS">
  <ul slot="instructions">
    <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>
    <li>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris</li>
    <li>Duis aute irure dolor in reprehenderit in voluptate velit</li>
  </ul>
</dockit-do>
```

### Do with custom icon

SVGs should define `currentColor` on the needed parts, see example below.

```js preview-story
const customIcon = `<svg
  slot="icon"
  width="24"
  height="24"
  viewBox="0 0 16 16"
  fill="currentColor"
  class="play"
>
  <path
    fill-rule="evenodd"
    clip-rule="evenodd"
    d="M8.6 1c1.6.1 3.1.9 4.2 2 1.3 1.4 2 3.1 2 5.1 0 1.6-.6 3.1-1.6 4.4-1 1.2-2.4 2.1-4 2.4-1.6.3-3.2.1-4.6-.7-1.4-.8-2.5-2-3.1-3.5C.9 9.2.8 7.5 1.3 6c.5-1.6 1.4-2.9 2.8-3.8C5.4 1.3 7 .9 8.6 1zm.5 12.9c1.3-.3 2.5-1 3.4-2.1.8-1.1 1.3-2.4 1.2-3.8 0-1.6-.6-3.2-1.7-4.3-1-1-2.2-1.6-3.6-1.7-1.3-.1-2.7.2-3.8 1-1.1.8-1.9 1.9-2.3 3.3-.4 1.3-.4 2.7.2 4 .6 1.3 1.5 2.3 2.7 3 1.2.7 2.6.9 3.9.6z"
  />
  <path
    fill-rule="evenodd"
    clip-rule="evenodd"
    d="M6 5l.777-.416 4.5 3v.832l-4.5 3L6 11V5zm1 .934v4.132L10.099 8 7 5.934z"
  />
</svg>`;

export const do_custom = () => `<dockit-do
  style="--dockit-do-color: #fcba03"
  label="HINTS"
>
  ${customIcon}
  <ul slot="instructions">
    <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>
    <li>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris</li>
    <li>Duis aute irure dolor in reprehenderit in voluptate velit</li>
  </ul>
</dockit-do>`;
```

### Themed component

`dockit-do` and `dockit-dont` support theming and custom styling via `::part()` selector, see example:

```html preview-story
<style>
  .themed-do {
    --dockit-do-color: #000080;
  }
  .themed-do::part(container) {
    border-style: solid;
    border-width: 2px;
    border-color: #000080;
    border-radius: 1rem;
  }
  .themed-do::part(component-container) {
    background-color: #00008020;
  }
  .themed-do::part(instructions-container) {
    background-color: #00008040;
  }
</style>
<div class="themed-do">
  <dockit-do style="--dockit-do-color: #000080" label="NAVY BLUE">
    ${sampleButton}
    <ul slot="instructions">
      <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>
      <li>
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
      </li>
      <li>Duis aute irure dolor in reprehenderit in voluptate velit</li>
    </ul>
  </dockit-do>
</div>
```
