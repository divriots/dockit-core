import { html } from 'lit';
import { InstructionsCard } from './InstructionsCard';

const dontColor = '#DE350B';

const dontIcon = (color = dontColor) => html`
  <svg width="24" height="24" viewBox="0 0 24 24">
    <path
      fill="${color}"
      d="M8.27,3L3,8.27V15.73L8.27,21H15.73L21,15.73V8.27L15.73,3M8.41,7L12,10.59L15.59,7L17,8.41L13.41,12L17,15.59L15.59,17L12,13.41L8.41,17L7,15.59L10.59,12L7,8.41"
    />
  </svg>
`;

/**
 * Show cautions in general or for a specific component.
 */
export class Dont extends InstructionsCard {
  constructor() {
    super(dontColor, dontIcon(dontColor), "DON'T");
  }
}
