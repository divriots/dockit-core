# speedy-links

It's a lightweight solution to speed up page loading and prevent a flash of unstyled content and a flash of incorrect color theme in static websites.

## Backlight documentation integration

`speedy-links` was originally designed to be used in [Backlight](https://backlight.dev) to improve documentation experience.
Below you can find a quick setup code for different documentation technologies supported in Backlight.

### MDJS layout

```js
// mdjs.config.js
import '@divriots/dockit-core/layout/dockit-layout.define.js';
import { setupSpeedyLinks } from '@divriots/dockit-core/speedy-links';
import { html } from 'lit';

export default {
  layout: (content, context) => {
    setupSpeedyLinks({
      mapLinkUrlToModuleUrl: (url) => {
        return context.mapPageUrlToRenderModuleUrl(url);
      },
    });
    return html`<dockit-layout>...</dockit-layout>`;
  },
};
```

### MDX layout

```jsx
// layout.jsx
import { setupSpeedyLinks } from '@divriots/dockit-core/speedy-links';
import { MDXProvider } from '@mdx-js/react';
import React from 'react';

export const Layout = (props) => {
  setupSpeedyLinks({
    mapLinkUrlToModuleUrl: (url) => {
      return props.__context.mapPageUrlToRenderModuleUrl(url);
    },
  });
  return <MDXProvider>...</MDXProvider>;
};
```

Then use `Layout` in your MDX files.

## Generic usage

To use `speedy-links` outside of Backlight it's good to know how it works under the hood.

`setupSpeedyLinks` is a function that requires at least one parameter `mapLinkUrlToModuleUrl`.

```js
import { setupSpeedyLinks } from '@divriots/dockit-core/speedy-links';

setupSpeedyLinks({
  mapLinkUrlToModuleUrl: (url) => {
    return /* path to the ES module derived from the `url` param */;
  },
});
```

Call to `setupSpeedyLinks` executes the setup code only once, all following calls are ignored, so once setup is finished, you can't change or disable it.
It adds a `click` listener on all page links (currently present or added later) via delegation to the body element.

There is one exception: links pointing to another origin (`location.origin`) will be always ignored and processed natively by the browser as a result.

When a link is clicked the `mapLinkUrlToModuleUrl` will be called with the URL value from the link `href` property.
`mapLinkUrlToModuleUrl` has to transform that URL into an ES module path.

Such ES modules have to contain a default export function which renders the new page HTML without making a full page reload.
They need to be served by your static web server.
The rendering logic needs to be self contained, no arguments are needed by default, the function should know how to render, including which root DOM element to render into.

Example of how things connect with each other:

```js
// early-on-the-page.js
import { setupSpeedyLinks } from '@divriots/dockit-core/speedy-links';

setupSpeedyLinks({
  // let's say url = 'http://docs.my-brand.com/components/button'
  mapLinkUrlToModuleUrl: (url) => {
    return url + '.page.js';
  },
});
```

```js
// http://docs.my-brand.com/components/button.page.js
export default const renderPage = () => {
  document.body.innerHTML = '<!-- button docs HTML string -->';
}
```

`renderPage` name will be used starting from here to refer to the ES module default export.
In real life the actual name doesn't matter, because it's a default export.

The `innerHTML` and `document.body` are used only for illustration purposes.
In fact you can use any library/framework to render HTML and any root element which makes sense given your site layout.

The idea behind this is that the source of your documentation comes from MDX or another syntax which compiles Markdown into a renderable JS component.
You can find more info about [the rationale](#rationale-and-sources-of-inspiration) below.

## Async behavior

`renderPage` can be async and should be async in most cases.
We recommend to implement it in such a way that the rendering is fully finished by the time the function's returned promise is resolved.
When `renderPage` is called under the hood, it's result is awaited before running other logic.
It's primarly needed to make `#hash` navigation (scrolling) work correctly when you link from one page to another page's part referring DOM element IDs.

## Parameter `linkSelector`

_Default value_: `a`.

By default all links are selected, but it's possible to configure `linkSelector` to exclude certain links or include other clickable elements.

E.g. to exclude links which contain `/storybook/` in the `href`:

```js
import { setupSpeedyLinks } from '@divriots/dockit-core/speedy-links';

setupSpeedyLinks({
  ...
  linkSelector: 'a:not([href*="/storybook/"])',
  ...
});
```

## Parameter `moduleExecutor`

_Default value (pseudo code)_: `(module) => module.default()`.

ES module is expected to have a default export function which takes 0 arguments and does all the rendering.
But if you want to change the exported values structure or even fully change the behavior of the rendering, e.g. to change how these values are used, it's possible to do it with the help of `moduleExecutor`.
This function replaces the logic applied to the `renderPage` (`module.default`) and let's you redefine it.
The result of it is awaited too, so you can make it async.

E.g. you can provide modules which export body HTML string and handle them in the following way:

```js
import { setupSpeedyLinks } from '@divriots/dockit-core/speedy-links';

setupSpeedyLinks({
  ...
  moduleExecutor: (module) => {
    document.body.innerHTML = module.bodyHTML;
  },
  ...
});
```

Or your modules can export React components which can then be rendered using `react-dom`:

```js
import { setupSpeedyLinks } from '@divriots/dockit-core/speedy-links';
import ReactDOM from 'react-dom';

setupSpeedyLinks({
  ...
  moduleExecutor: (module) => {
    return new Promise(resolve => {
      ReactDOM.render(module.reactComponent, document.body, resolve);
    });
  },
  ...
});
```

## Rationale and sources of inspiration

The inspiraton comes from [turbo](https://github.com/hotwired/turbo) (new library from the authors of [turbolinks](https://github.com/turbolinks/turbolinks/)) and [pjax](https://github.com/MoOx/pjax).
These libraries might be better alternatives for static websites where all documents can be compiled to static HTML.

Backlight is different here and therefore we needed smth similar, but more flexible and able to use dynamic JS code where static HTML is not sufficient, e.g. for interactive stories in Markdown files.
On top of that it has to support multiple technologies at the same time, often mixed up with each other in a single project.
That's why we don't make any assumptions about how rendering is implemented, whether it's just static HTML string or JS code with dynamic variables, whether it can just be set as `innerHTML` or requires a framework or library to render.

All types of rendering mechanisms for different Markdown syntaxes we have in Backlight will be encapsulated inside `renderPage`, so you need to just import and call it, or, to be more precise, delegate this work to `speedy-links`.
When used outside of Backlight you can implement a similar architecture or adopt it for your use cases using configurable parameters.
