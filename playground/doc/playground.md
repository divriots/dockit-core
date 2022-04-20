```js script
import '@divriots/dockit-core/playground/dockit-playground.define.js';
```

# dockit-playground

Editable code preview with support for ES modules.

## HTML

Just define `language` and `code` attributes:

```html
<dockit-playground
  language="html"
  code='<button type="submit">Submit</button>'
></dockit-playground>
```

This results in:

```html story
<dockit-playground
  language="html"
  code='<button type="submit">Submit</button>'
></dockit-playground>
```

## JS

The easiest way is to register your own preconfigured component.
E.g. for Lit it might look like this:

```js script
import { Playground } from '@divriots/dockit-core/playground/index.js';
import { html, render } from 'lit';

class PlaygroundLit extends Playground {
  constructor() {
    super();
    this.language = 'js';
    this.defaultScope = { html };
    this.previewRenderer = (storyFn, container) => {
      return render(storyFn(), container);
    };
  }
}

customElements.define('dockit-playground-lit', PlaygroundLit);
```

```js
import { Playground } from '@divriots/dockit-core/playground/index.js';
import { html, render } from 'lit';

class PlaygroundLit extends Playground {
  constructor() {
    super();
    this.language = 'js';
    this.defaultScope = { html };
    this.previewRenderer = (storyFn, container) => {
      return render(storyFn(), container);
    };
  }
}

customElements.define('dockit-playground-lit', PlaygroundLit);
```

In the examples below we will use `<dockit-playground-lit>` where appropriate.

You can also use `<dockit-playground language="js" ...></dockit-playground>` directly, but then every time you'll need to pass `html` to the `scope` and pass `previewRenderer` which can only be done using `js story` and will be challenging due to quotes mishmash.

### Simple template

```html
<dockit-playground-lit
  code="export default () => html`<input type='email' .value=${'email@example.com'}/>`"
></dockit-playground-lit>
```

```html story
<dockit-playground-lit
  code="export default () => html`<input type='email' .value=${'email@example.com'}/>`"
></dockit-playground-lit>
```

### Scope

Any external variable that needs to be available in the code can be passed as a scope:

```js
const name = 'username!';
export const scopeStory = () => html`
  <dockit-playground-lit
    .scope="${{ name }}"
    code="export default () => html\`<input .value=\${'Hello ' + name}/>\`"
  ></dockit-playground-lit>
`;
```

```js story
const name = 'username!';
export const scopeStory = () => html`
  <dockit-playground-lit
    .scope="${{ name }}"
    code="export default () => html\`<input .value=\${'Hello ' + name}/>\`"
  ></dockit-playground-lit>
`;
```

### ES imports

Static:

```html
<dockit-playground-lit
  code="import { setTheme } from 'https://esm.run/@divriots/simba@0.7.0/themes';
import 'https://esm.run/@divriots/simba@0.7.0/button/define';
setTheme('amber');
export default () => html`<simba-button>Button</simba-button>`;"
></dockit-playground-lit>
```

```html story
<dockit-playground-lit
  code="import { setTheme } from 'https://esm.run/@divriots/simba@0.7.0/themes';
import 'https://esm.run/@divriots/simba@0.7.0/button/define';
setTheme('amber');
export default () => html`<simba-button>Button</simba-button>`;"
></dockit-playground-lit>
```

Dynamic (top-level await is supported too):

```html
<dockit-playground-lit
  code="const { setTheme } = await import('https://esm.run/@divriots/simba@0.7.0/themes');
await import('https://esm.run/@divriots/simba@0.7.0/switch/define');
setTheme('amber');
export default () => html`<simba-switch style='justify-content: left;'></simba-switch>`;"
></dockit-playground-lit>
```

```html story
<dockit-playground-lit
  code="const { setTheme } = await import('https://esm.run/@divriots/simba@0.7.0/themes');
await import('https://esm.run/@divriots/simba@0.7.0/switch/define');
setTheme('amber');
export default () => html`<simba-switch style='justify-content: left;'></simba-switch>`;"
></dockit-playground-lit>
```
