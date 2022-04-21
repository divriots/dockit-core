```js script
import '@divriots/dockit-core/columns/dockit-columns.define.js';
```

# dockit-columns

Component to render children in columns.

## Setup

```js
import '@divriots/dockit-core/columns/dockit-columns.define.js';
```

## Demo

```js preview-story
import { html } from 'lit';
import '~/columns/dockit-columns.define.js';
import '~/do-dont/define-all.js';

export const columns = () => html`
  <dockit-columns>
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
  </dockit-columns>
`;
```

#### Custom style - different gap size

```js preview-story
export const row_custom_gap = () => /*html*/ `
  <dockit-columns style="gap: 0.5rem;">
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
  </dockit-columns>
`;
```
