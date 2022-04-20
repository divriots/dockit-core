```js script
import '@divriots/dockit-core/row/dockit-row.define.js';
```

# dockit-row

Component to render children in a row.

## Setup

```js
import '@divriots/dockit-core/row/dockit-row.define.js';
```

## Demo

```js preview-story
import { html } from 'lit';
import '~/row/dockit-row.define.js';
import '~/do-dont/define-all.js';

export const row = () => html`
  <dockit-row>
    <dockit-do>
      <ul slot="instructions">
        <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>
        <li>
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
        </li>
        <li>Duis aute irure dolor in reprehenderit in voluptate velit</li>
      </ul>
    </dockit-do>
    <dockit-dont>
      <ul slot="instructions">
        <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>
        <li>
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
        </li>
        <li>Duis aute irure dolor in reprehenderit in voluptate velit</li>
      </ul>
    </dockit-dont>
  </dockit-row>
`;
```

#### Custom style - different gap size

```js preview-story
export const row_custom_gap = () => /*html*/ `
  <dockit-row style="gap: 0.5rem;">
    <dockit-do>
      <ul slot="instructions">
        <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>
        <li>
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
        </li>
        <li>Duis aute irure dolor in reprehenderit in voluptate velit</li>
      </ul>
    </dockit-do>
    <dockit-dont>
      <ul slot="instructions">
        <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>
        <li>
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
        </li>
        <li>Duis aute irure dolor in reprehenderit in voluptate velit</li>
      </ul>
    </dockit-dont>
  </dockit-row>
`;
```
