```js script
import '@divriots/dockit-core/playground/dockit-playground.define.js';
import { html } from 'lit';
const someExternalVar = 'external text';
```

# dockit-playground

Editable code preview executed as an ES module.

## HTML

Just regular preview-story

```html
<button type="submit">Submit</button>
```

instead of

```html
<dockit-playground
  language="html"
  code='<button type="submit">Submit</button>'
></dockit-playground>
```

## JS

### Simple template

Just regular preview-story

```js
export const storyJsSimple = () => html`<input .value=${'test'} />`;
```

instead of

```html
<dockit-playground
  language="js"
  code="html`<input .value=${'test'}/>`"
></dockit-playground>
```

### ES imports

Just regular preview-story

```js
import 'https://esm.run/@divriots/simba@0.7.0/button/define';
export const storyJsWithImport = () =>
  html`<simba-button>Simba button with long text</simba-button>`;
```

instead of

```html
<dockit-playground
  language="js"
  code="import 'https://esm.run/@divriots/simba@0.7.0/button/define';
html`<simba-button>Button</simba-button>`;"
></dockit-playground>
```

### Use vars from js script

TODO: make this work with `preview-story`, maybe by analyzing the vars used in the story and setting the `scope` automatically.

```js preview-story
const someInnerVar = 'inner text';
export const storyJsScriptVars = () =>
  html`<input .value=${someExternalVar + '' + someInnerVar} />`;
```

should work similar to

```js
const someInnerVar = 'inner text';
export const playgroundJsScriptVars = () => html`
  <dockit-playground
    language="js"
    .scope="${{ someExternalVar }}"
    code="return () => html\`<input .value=\${someExternalVar + '' + someInnerVar}/>\`"
  ></dockit-playground>
`;
```
