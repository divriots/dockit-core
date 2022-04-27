import { html, css } from 'lit';
import { InstructionsCard } from './InstructionsCard';

/**
 * Show recomendations in general or for a specific component.
 */
export class Do extends InstructionsCard {
  static styles = [
    InstructionsCard.styles,
    css`
      :host {
        --dockit-do-color: #36b37e;
      }

      [part='instructions-container'] {
        border-top-color: var(--dockit-do-color);
      }

      .background {
        background-color: var(--dockit-do-color);
      }

      svg {
        color: var(--dockit-do-color);
      }

      slot[name='icon']::slotted(*) {
        color: var(--dockit-do-color);
      }
    `,
  ];

  icon = html`
    <svg width="24" height="24" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"
      />
    </svg>
  `;

  label = 'DO';
}
