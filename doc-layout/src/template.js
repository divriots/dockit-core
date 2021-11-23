import '@divriots/dockit-core/mdjs-layout/load-all';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { logoSvg } from './logo.svg.js';

export const docLayoutTemplate = (content, context) => html`
  <style>
    .logo {
      color: #f8c307;
    }
    .preview-story .story_padded {
      background-color: #f3f4f6;
    }
    html.dark .preview-story .story_padded {
      background-color: #1f2937;
    }
  </style>
  <mdjs-layout
    .context="${context}"
    @color-scheme-change="${(event) => {
      if (event.detail.colorScheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }}"
  >
    <div class="logo" slot="logo" aria-label="dockit-core">${logoSvg}</div>
    <div class="prose dark:prose-light">${unsafeHTML(content)}</div>
  </mdjs-layout>
`;