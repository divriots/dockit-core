# mdjs-layout

This project itself serves as an example of how to use `<mdjs-layout>`, so we recommend to start with it.
Left navigation, logo, default styles and so on are all present thanks to it.

These are the main files to check:

- `mdjs.config.js` which configures the global template for all Markdown files
- `doc-layout/src/template.js` contains the global template itself, all necessary imports and the code specific to this project which gives it a unique touch

## mdjs.config.js and template library

`<mdjs-layout>` was designed for usage within any Design System documentation, but it is especially handy when used within Backlight, because it's a perfect fit for it and has some specific features.
Therefore all examples in this documentation will be using `mdjs.config.js` which allows to define a default template for all Markdown files in the Backlight project.
The default export of `mdjs.config.js` contains a `layout` property which takes a function with 2 arguments: `content` (raw HTML string) and `context` (special Backlight object containing information about the project, e.g. for navigation purposes).

In `dockit-core` we use `html` from Lit to define the layout template and `unsafeHTML` to inject the compiled Markdown content.
But Lit is not required and actually it's up to you and may depend on what you already have in your Design System.
We recommend to reuse whatever you already have or pick up something like Lit among the technologies which Backlight supports.

Feel free to adapt these examples for your own project even if used outside of Backlight, it's not complex and most likely will fit you project nicely with the provided defaults.

## Content

The `<mdjs-layout>` is designed to be the main and only root element on the page.
We recommend importing `@divriots/dockit-core/mdjs-layout/load-all` and using the following setup to inject the content in the default slot and have `light/dark` mode support out-of-the-box:

```js
// mdjs.config.js
import '@divriots/dockit-core/mdjs-layout/load-all';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

export default {
  layout: (content, context) => html`
    <mdjs-layout
      @color-scheme-change="${(event) => {
        if (event.detail.colorScheme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }}"
    >
      ...
      <div class="prose dark:prose-light">${unsafeHTML(content)}</div>
      ...
    </mdjs-layout>
  `,
};
```

The `@color-scheme-change` handler adds a class `dark` manually on the `<html>` based on the initial state of the component (or user configuration) and is required for `prose dark:prose-light` ([Tailwind-based typography classes](https://github.com/tailwindlabs/tailwindcss-typography)) to switch styles correctly when light/dark mode is switched.

Optionally you can get rid of `prose dark:prose-light` and force a specific theme by manually adding `dark` to the body.
Or you can implement your own light/dark theme, thanks to the fact that the content is located in Light DOM.

If you plan to use `<mdjs-layout>` without Backlight/`mdjs.config.js`, then just put your content in the default slot by any means you have, but keep in mind that if the content is rendered dynamically, then it must come from a trusted source, because scripts inside it might be executed depending on the means you choose to render.

## Logo

We expect the logo to be necessary in every project, therefore there is a `logo` slot for it.
It can be `svg` or `img`.
The size will be set automatically and we recommend not to change it.

```js
// mdjs.config.js
import '@divriots/dockit-core/mdjs-layout/load-all';
import { html } from 'lit';

export default {
  layout: (content, context) => html`
    <mdjs-layout>
      ...
      <div slot="logo"><svg>...</svg></div>
      ...
    </mdjs-layout>
  `,
};
```

## Context: left navigation and logo link

This is optional.

Yet very easy and helpful when used within Backlight: just configure one property `context` on the `<mdjs-layout>` and get a responsive left navigation with links to component documentation entry points reflecting your `studio.config.json` menu, as well as wrap the logo with a link to the first entry point.

```js
// mdjs.config.js
import { html } from 'lit';

export default {
  layout: (content, context) =>
    html`<mdjs-layout .context="${context}">...</mdjs-layout>`,
};
```

## Topbar

This is optional.

The header already contains the logo, as well as the light/dark mode switcher on larger screens, but it can be used for other things in between them which you can place in the `topbar` slot.
It's handy if you want to have something on top and always visible when scrolling.
It comes unopinionated styles-wise, so centering and other possible styling is up to you, e.g. you can use the following example to get inspiration from:

```js
// mdjs.config.js
import { breakpoints } from '@divriots/dockit-core/mdjs-layout';
import { html } from 'lit';

export default {
  layout: (content, context) => html`
    <style>
      .topbar {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: right;
      }
      @media screen and (min-width: ${breakpoints.lg}) {
        .topbar {
          justify-content: unset;
        }
      }
    </style>
    <mdjs-layout>
      ...
      <div class="topbar" slot="topbar">
        Add your custom components here, e.g. search or dynamic DS configuration
        options.
      </div>
      ...
    </mdjs-layout>
  `,
};
```

Pay attention to the usage of `breakpoints`.
This is handy if you want to sync with the reponsive `<mdjs-layout>` behavior which looks differently on different screen sizes.
Use `min-width` and think of it as mobile-first responsive layout.

## Configure the theme

Most of the things should be working well out-of-the-box, but some require explicit styles.

One of these things is the background of the story live demo area, which is normally dictated by the Design System.
Use the following selectors to adjust the background for light/dark modes when used within Backlight:

```js
// mdjs.config.js
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

export default {
  layout: (content, context) => html`
    <style>
      .preview-story .story_padded {
        background-color: #f3f4f6;
      }
      html.dark .preview-story .story_padded {
        background-color: #1f2937;
      }
    </style>
    <mdjs-layout
      @color-scheme-change="${(event) => {
        if (event.detail.colorScheme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }}"
    >
      ...
      <div class="prose dark:prose-light">${unsafeHTML(content)}</div>
      ...
    </mdjs-layout>
  `,
};
```

As seen in the example above, the `dark` class on the `<html>` is useful for styling anything in light/dark modes, and not only for `prose dark:prose-light` to work correctly.
The general approach is to first style the light mode and then use `html.dark` selector to style the dark mode.

## Custom themeing

### Content theme

Content is part of the Light DOM and can be styled directly.
When importing `@divriots/dockit-core/mdjs-layout/load-all` you include `normalize` styles, styles for the content typography (including light/dark modes), Prism theme for the code highlighting, code block styles (including live demo wrappers based on MDJS stories), and some other styles for various things.
It's not required to `load-all`, but if you decide not to do that, then all of the above need to be styled by you yourself or included manually from another source.
We recommened checking the content of `load-all` to learn more about the default setup.

### Shell theme

All shell-related elements (layout, topbar, left navigation, buttons...) are part of the `<mdjs-layout>` Shadow DOM and can't be styled directly.
For the sake of themeing and flexibility, we provide a few CSS custom properties to change the theme:

- `--mdjs-layout-bg` - page background color
- `--mdjs-layout-header-border-color` - border color below the header
- `--mdjs-layout-toggle-button-bg` - button background color (light/dark mode toggle, navigation toggle)
- `--mdjs-layout-toggle-button-color` - button icon color (light/dark mode toggle, navigation toggle)
- `--mdjs-layout-navigation-group-heading-color` - left navigation heading text color
- `--mdjs-layout-navigation-link-color` - left navigation link color for each item
- `--mdjs-layout-navigation-current-link-color` - left navigation link color for the currently open page

This is useful if you decide to load completely different styles and change the appearance of the light/dark mode instead of relying on the default setup from `@divriots/dockit-core/mdjs-layout/load-all`.

Make sure to define and test each of them for light and dark modes, e.g. using the following approach:

```js
// mdjs.config.js
import { html } from 'lit';

export default {
  layout: (content, context) =>
    html`
      <style>
        html {
          --mdjs-layout-bg: #ffffff;
        }
        html.dark {
          --mdjs-layout-bg: #000000;
        }
      </style>
      <mdjs-layout ...>...</mdjs-layout>
    `,
};
```
