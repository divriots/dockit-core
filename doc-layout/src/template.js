import '@divriots/dockit-core/layout/dockit-layout.define.js';
import { styles } from '@divriots/dockit-core/layout';
import { setupSpeedyLinks } from '@divriots/dockit-core/speedy-links';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import logoSvg from './logo.svg?raw';
import { search } from '~/search';
import '~/search/dockit-search.define';

export const docLayoutTemplate = (content, context) => {
  setupSpeedyLinks({
    mapLinkUrlToModuleUrl: (url) => {
      return context.mapPageUrlToRenderModuleUrl(url);
    },
  });
  const docs = context.pages.map((p) => context.base + p.input);
  const docSearch = (searchValue) => search(searchValue, docs);
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
      <doc-search
        slot="topbar"
        .search=${docSearch}
        style="width:80%"
      ></doc-search>
      <div class="prose dark:prose-invert">${unsafeHTML(content)}</div>
    </dockit-layout>
  `;
};
