```js script
import '@divriots/dockit-core/image-container/dockit-image-container.define';
import '@divriots/dockit-core/caption/dockit-caption.define';
```

# dockit-image-container

Component used to contain images in documentation pages.

## Setup

```js
import '@divriots/dockit-core/image-container/dockit-image-container.define';
```

## Demo

```js preview-story
export const image_container = () => `
  <dockit-image-container>
    <img src="https://picsum.photos/300" alt="Random image"></img>
  </dockit-image-container>
  <dockit-caption>The caption is here</dockit-caption>
`;
```
