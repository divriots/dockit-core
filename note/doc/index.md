```js script
import { html } from 'lit';
import '@divriots/dockit-core/note/dockit-note.define.js';
```

# dockit-note

Component used to call out information in documentation pages.

## Setup

```js
import '@divriots/dockit-core/note/dockit-note.define.js';
```

## Demo

```html preview-story
<dockit-note>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit
</dockit-note>
```

### Variants

#### Info

```html preview-story
<dockit-note variant="info">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit
</dockit-note>
```

#### Warning

```html preview-story
<dockit-note variant="warning">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit
</dockit-note>
```

#### Error

```html preview-story
<dockit-note variant="error">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit
</dockit-note>
```

### Note with custom color

```html preview-story
<dockit-note color="BurlyWood">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit
</dockit-note>
```

### Note with custom style

```html preview-story
<style>
  dockit-note.themed-note {
    --dockit-note-color: #ffe133;
    color: #000000;
    padding: 1.5rem;
    border-radius: 0.5rem;
    border-left-width: 1rem;
  }
</style>
<dockit-note class="themed-note">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit
</dockit-note>
```
