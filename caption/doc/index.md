```js script
import '@divriots/dockit-core/caption/dockit-caption.define.js';
import '@divriots/dockit-core/image-container/dockit-image-container.define.js';
```

# dockit-caption

Component used to call out information in documentation pages.

## Setup

```js
import '@divriots/dockit-core/caption/dockit-caption.define.js';
```

## Demo

```js preview-story
export const caption_for_image = () => `
  <dockit-image-container>
      <img src="https://picsum.photos/300" alt="Random image" style="margin:auto"></img>
  </dockit-image-container>
  <dockit-caption>Lorem ipsum dolor sit amet.</dockit-caption>
  `;
```

```js preview-story
export const caption_for_component = () => `
  <div>
    <div style="
      background-color: #00000030;
      padding: .5rem;
      font-weight: 600;
      border-radius: .25rem;
      text-align: center;
      "
    >
      SAMPLE BUTTON
    </div>
    <dockit-caption>Lorem ipsum dolor sit amet.</dockit-caption>
  </div>
`;
```
