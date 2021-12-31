import '@divriots/dockit-core/mdjs-layout/define.js';
import { styles } from '@divriots/dockit-core/mdjs-layout';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import logoSvg from './logo.svg?raw';

export const docLayoutTemplate = (content, context) => html`
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
    <div class="logo" slot="logo" aria-label="dockit-core">
      ${unsafeHTML(logoSvg)}
    </div>
    <div class="prose dark:prose-invert">${unsafeHTML(content)}</div>
  </mdjs-layout>
`;
