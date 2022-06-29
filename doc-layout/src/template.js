import '~/layout/dockit-layout.define.js';
import { styles } from '@divriots/dockit-core/layout';
import '@api-viewer/docs';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { until } from 'lit/directives/until.js';
import logoSvg from './logo.svg?raw';
import { search } from '@divriots/dockit-core/search';
import '@divriots/dockit-core/search/dockit-search.define.js';
import '@divriots/dockit-core/version-selector/dockit-version-selector.define.js';

export const docLayoutTemplate = (content, context) => {
  // TODO: remove when Backlight is released with new functionality
  const isMultiverseSupported = context.isLive !== undefined;

  let versionsPromise;
  if (isMultiverseSupported) {
    if (context.isLive) {
      versionsPromise = Promise.resolve([context.version]);
    } else {
      versionsPromise = import(new URL('/docs-shared.mjs', location.href)).then(
        (m) => m.versions
      );
    }
  }
  return html`
    <style>
      ${unsafeHTML(styles)} .logo {
        color: #f8c307;
      }
      .preview-story .story_padded {
        background-color: #f3f4f6;
      }
      html.dark .preview-story .story_padded {
        background-color: #1f2937;
      }
    </style>
    <dockit-layout
      .context="${context}"
      @color-scheme-change="${(event) => {
        if (event.detail.colorScheme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }}"
    >
      <div class="logo" slot="logo" aria-label="dockit-core">
        ${unsafeHTML(logoSvg)}
      </div>
      <dockit-search slot="topbar" .search=${(query) => search(query, context)}>
      </dockit-search>
      ${isMultiverseSupported
        ? until(
            versionsPromise.then((versions) => {
              const isLatestVersion =
                context.version === versions[versions.length - 1];
              return html`
                <dockit-version-selector
                  slot="topbar"
                  .versions=${versions}
                  selected=${context.version}
                  @select=${(event) => {
                    if (!context.isLive) {
                      const baseUrl = new URL(
                        isLatestVersion ? './' : '../',
                        new URL(context.base, location.href)
                      );
                      location.href = new URL(
                        event.detail.isLatest
                          ? './'
                          : `./${event.detail.version}/`,
                        baseUrl
                      ).href;
                    }
                  }}
                ></dockit-version-selector>
              `;
            })
          )
        : null}
      <div class="prose dark:prose-invert">${unsafeHTML(content)}</div>
    </dockit-layout>
  `;
};
