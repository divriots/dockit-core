import { html, css } from 'lit';
import { InstructionsCard } from './InstructionsCard';

/**
 * Show cautions in general or for a specific component.
 */
export class Dont extends InstructionsCard {
  static styles = [
    InstructionsCard.styles,
    css`
      :host {
        --dockit-dont-color: #de350b;
      }

      [part='instructions-container'] {
        border-top-color: var(--dockit-dont-color);
      }

      .background {
        background-color: var(--dockit-dont-color);
      }

      svg {
        color: var(--dockit-dont-color);
      }

      slot[name='icon']::slotted(*) {
        color: var(--dockit-dont-color);
      }
    `,
  ];

  icon = html`
    <svg width="24" height="24" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M8.27, 3L3, 8.27V15.73L8.27, 21H15.73L21, 15.73V8.27L15.73, 3M8.41, 7L12, 10.59L15.59, 7L17, 8.41L13.41, 12L17, 15.59L15.59, 17L12, 13.41L8.41, 17L7, 15.59L10.59, 12L7, 8.41"
      />
    </svg>
  `;

  label = "DON'T";
}
