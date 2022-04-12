import { html } from 'lit';
import { InstructionsCard } from './InstructionsCard';

const doColor = '#36B37E';

const doIcon = (color = doColor) => html`
  <svg width="24" height="24" viewBox="0 0 24 24">
    <path
      fill="${color}"
      d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"
    />
  </svg>
`;

/**
 * Show recomendations in general or for a specific component.
 */
export class Do extends InstructionsCard {
  constructor() {
    super(doColor, doIcon, 'DO');
  }
}
