```js script
import '@divriots/dockit-core/playground/dockit-playground.define.js';
```

# dockit-playground

Editable code preview with support for ES modules.

## Note for MDJS users in Backlight

You don't need this component.
Just use `html preview-story` or `js preview-story` to get an editable playground automatically.

## HTML

Just put a template with HTML code:

```html
<dockit-playground>
  <template>
    <button type="submit" onclick="alert('submit')">Submit</button>
  </template>
</dockit-playground>
```

This results in:

```html story
<dockit-playground>
  <template>
    <button type="submit" onclick="alert('submit')">Submit</button>
  </template>
</dockit-playground>
```

Click the `Code` and try to edit the code in it and see how it is rendering live.

## JS

The easiest way is to register your own preconfigured component.
E.g. for Lit it might look like this:

```js script
import { Playground } from '@divriots/dockit-core/playground/index.js';
import { html, render } from 'lit';

class PlaygroundLit extends Playground {
  constructor() {
    super();
    this.defaultScope = { html };
    this.renderStory = (story, container) => {
      return render(story(), container);
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
    this.defaultScope = { html };
    this.renderStory = (story, container) => {
      return render(story(), container);
    };
  }
}

customElements.define('dockit-playground-lit', PlaygroundLit);
```

In the examples below we will use `<dockit-playground-lit>` where appropriate.

You can also use `<dockit-playground language="js" ...></dockit-playground>` directly, but then every time you'll need to pass `html` to the `scope` and pass `renderStory` which can only be done using `js story` and will be challenging due to quotes mishmash.

### Basic demo

Provide a default export containing a JS story function.
E.g. for Lit it's an `html` template.

```html
<dockit-playground-lit>
  <template>
    <script type="module">
      export default () =>
        html`<input type="email" .value=${'email@example.com'} />`;
    </script>
  </template>
</dockit-playground-lit>
```

```html story
<dockit-playground-lit>
  <template>
    <script type="module">
      export default () =>
        html`<input type="email" .value=${'email@example.com'} />`;
    </script>
  </template>
</dockit-playground-lit>
```

### Scope

Any external variables that need to be available in the module can be passed via the `scope` property.
You can do it by using MDJS and `js story` syntax for that and Lit `html` tag:

````js
//```js story
import { html } from 'lit';
export const scopeStory = () => html`
  <dockit-playground-lit .scope="${{ username: 'username!' }}">
    <template>
      <script type="module">
        export default () => html\`<input .value=\${'Hello ' + username} />\`;
      </script>
    </template>
  </dockit-playground-lit>
`;
//```
````

```js story
export const scopeStory = () => html`
  <dockit-playground-lit .scope="${{ username: 'username!' }}">
    <template>
      <script type="module">
        export default () => html\`<input .value=\${'Hello ' + username} />\`;
      </script>
    </template>
  </dockit-playground-lit>
`;
```

### ES imports

Static:

```html
<dockit-playground-lit>
  <template>
    <script type="module">
      import { setTheme } from 'https://esm.run/@divriots/simba@0.7.0/themes';
      import 'https://esm.run/@divriots/simba@0.7.0/button/define';
      setTheme('amber');
      export default () => html`<simba-button>Button</simba-button>`;
    </script>
  </template>
</dockit-playground-lit>
```

```html story
<dockit-playground-lit>
  <template>
    <script type="module">
      import { setTheme } from 'https://esm.run/@divriots/simba@0.7.0/themes';
      import 'https://esm.run/@divriots/simba@0.7.0/button/define';
      setTheme('amber');
      export default () => html`<simba-button>Button</simba-button>`;
    </script>
  </template>
</dockit-playground-lit>
```

Dynamic (top-level await is supported too):

```html
<dockit-playground-lit>
  <template>
    <script type="module">
      const { setTheme } = await import(
        'https://esm.run/@divriots/simba@0.7.0/themes'
      );
      await import('https://esm.run/@divriots/simba@0.7.0/switch/define');
      setTheme('amber');
      export default () => html`<simba-switch-button></simba-switch-button>`;
    </script>
  </template>
</dockit-playground-lit>
```

```html story
<dockit-playground-lit>
  <template>
    <script type="module">
      const { setTheme } = await import(
        'https://esm.run/@divriots/simba@0.7.0/themes'
      );
      await import('https://esm.run/@divriots/simba@0.7.0/switch/define');
      setTheme('amber');
      export default () => html`<simba-switch-button></simba-switch-button>`;
    </script>
  </template>
</dockit-playground-lit>
```

### Dispose function

Sometimes the rendering leaves state which needs to be cleaned before rendering again.
Therefore the `renderStory` function can return a dispose function to do the job which will be executed before new rendering starts.
E.g. for FAST `html` you can have the following implementation:

```js
import { Playground } from '@divriots/dockit-core/playground/index.js';
import { html } from '@microsoft/fast-element';

class PlaygroundFast extends Playground {
  constructor() {
    super();
    this.language = 'js';
    this.defaultScope = { html };
    this.renderStory = (story, container) => {
      const template = story();
      const view = template.render({}, container);
      return () => view.dispose();
    };
  }
}

customElements.define('dockit-playground-fast', PlaygroundFast);
```
