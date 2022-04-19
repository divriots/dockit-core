```js script
import '@divriots/dockit-core/playground/dockit-playground.define.js';
import { html } from 'lit';
```

# dockit-playground

## HTML

```html story
<dockit-playground
  language="html"
  code='<button type="submit">Submit</button>'
></dockit-playground>
```

## JS

### Simple template

```html story
<dockit-playground
  language="js"
  code="html`<input .value=${'test'}/>`"
></dockit-playground>
```

### ES imports

```html story
<dockit-playground
  language="js"
  code="import { html as litHtml } from 'https://unpkg.com/lit?module';
const text = 'some text';
const value = 'value is ' + text;
litHtml`<input .value=${value}/>`;"
></dockit-playground>
```
