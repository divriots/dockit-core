```js script
import { html } from 'lit';
import '@divriots/dockit-core/note/dockit-note.define.js';
```

# dockit-note

Component used to call out information in documentation pages.

## Setup

```js
import '@divriots/dockit-core/note/dockit-note';
```

## Demo

```js preview-story
export const note = () => html`
  <dockit-note>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit
  </dockit-note>
`;
```

### Variants

#### Info

```js preview-story
export const note_info_variant = () => html`
  <dockit-note variant="info">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit
  </dockit-note>
`;
```

#### Warning

```js preview-story
export const note_warning_variant = () =>
  html` <dockit-note variant="warning">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit
  </dockit-note>`;
```

#### Error

```js preview-story
export const note_error_variant = () =>
  html` <dockit-note variant="error">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit
  </dockit-note>`;
```

### Note with custom color

```js preview-story
export const note_custom_color = () => html`
  <dockit-note color="BurlyWood">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit
  </dockit-note>
`;
```

### Note with custom style

```js preview-story
export const note_themed = () => html`
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
`;
```
