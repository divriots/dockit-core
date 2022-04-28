import { html } from 'lit';
import '@divriots/dockit-core/note/dockit-note.define.js';

export default {
  parameters: {
    layout: 'centered',
  },
};

export const note = () => html`
  <dockit-note>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit
  </dockit-note>
`;

export const note_info_variant = () => html`
  <dockit-note variant="info">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit
  </dockit-note>
`;

export const note_warning_variant = () => html`
  <dockit-note variant="warning">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit
  </dockit-note>
`;

export const note_error_variant = () => html`
  <dockit-note variant="error">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit
  </dockit-note>
`;

export const note_custom_color = () => html`
  <dockit-note style="--dockit-note-color: #03e8fc66">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit
  </dockit-note>
`;

export const note_themed = () => html`
  <style>
    .themed-note {
      --dockit-note-color: #ffe13366;
    }
    .themed-note::part(container) {
      --dockit-note-color: #ffe13366;
      padding: 1.5rem;
      border-radius: 0.5rem;
      border-left-width: 0.5rem;
    }
  </style>
  <dockit-note class="themed-note">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit
  </dockit-note>
`;
