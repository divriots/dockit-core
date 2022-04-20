import { html } from 'lit';
import '~/note/dockit-note.define';

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
  <dockit-note color="aqua">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit
  </dockit-note>
`;

export const note_themed = () => html`
  <style>
    dockit-note.themed-note {
      --dockit-note-color: #ffe133;
      padding: 1.5rem;
      border-radius: 0.5rem;
      border-left-width: 0.5rem;
    }
  </style>
  <dockit-note class="themed-note">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit
  </dockit-note>
`;
