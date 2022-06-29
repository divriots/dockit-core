```js script
import { html } from 'lit';
```

# dockit-version-selector

Reusable version selector to implement multiple versions support on the exported static doc site.
Designed and styled to fit the topbar slot of [`<dockit-layout>`](../../layout/doc/index.md).

## Use in Backlight within dockit-layout topbar

You need to add a few things to the [layout template](../../layout/doc/index.md):

- load a list of versions which you plan to expose on the exported static site (build your own shared module for that)
- hardcode versions array to contain the current version if `context.isLive` flag is set
- use `until` directive to render `dockit-version-selector` when versions are loaded
- place it in `slot="topbar"`
- set `dockit-layout.versions` and `dockit-layout.selected`
- provide select handler

```js
// mdjs.config.js
import '@divriots/dockit-core/layout/dockit-layout.define.js';
import '@divriots/dockit-core/layout/dockit-version-selector.define.js';
import { styles } from '@divriots/dockit-core/layout';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { until } from 'lit/directives/until.js';

export default {
  layout: (content, context) => {
    let versionsPromise;
    if (context.isLive) {
      versionsPromise = Promise.resolve([context.version]);
    } else {
      versionsPromise = import(new URL('/docs-shared.mjs', location.href)).then(
        (m) => m.versions
      );
    }
    return html`
      <style>
        /* ... */ ${unsafeHTML(styles)}; /* ... */
      </style>
      ...
      <dockit-layout>
        <!- ... ->
        ${until(
          versionsPromise.then((versions) => {
            return html`
              <dockit-version-selector
                slot="topbar"
                .versions=${versions}
                selected=${context.version}
                @select=${(event) => {
                  ...
                }}
              ></dockit-version-selector>
            `;
          })
        )}
        <!- ... ->
      </dockit-layout>
    `;
  },
};
```

You can find full documentation of [how to setup multiple versions for the exported static doc site in Backlight](https://backlight.dev/docs/doc-multiple-versions).

## Latest version

By convention the last item in `versions` array is the latest version.
This is used inside the component to provide a different label for it and you can use it outside of it to determine if the version is latest if necessary.

## Latest label

By default the latest version will be displayed with the ` (latest)` at the end.
You can adjust this behavior by using one of the following:

- set a dynamic function via `.latestLabel` property, e.g. `` .latestLabel=${(version) => `${version} (current)`} ``
- set a static value via `latest-label` attribute, e.g. `latest-label="latest"`

## Select event

Select event is dispatched when new version is selected and contains `event.detail` with 2 values: `isLatest` flag and `version` value which let you decide where to redirect the page to.
Simple example of the select event handler might look like this:

```js
@select=${(event) => {
  if (!context.isLive) {
    const version = event.detail.isLatest ? 'latest' : event.detail.version;
    location.href = new URL(
      `../${version}/`,
      new URL(context.base, location.href)
    ).href;
  }
}}
```

## API

```js story
import manifest from '../../custom-elements.json';
export const api = () => html`<api-docs
  .manifest="${manifest}"
  only="dockit-version-selector"
  selected="dockit-version-selector"
></api-docs>`;
```
