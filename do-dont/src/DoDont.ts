import { LitElement, html, svg, css, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';

const styles = css`
  .container {
    border-radius: 0.25rem;
    overflow: hidden;
  }

  .component-container {
    background-color: #00000010;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  ::slotted(*[slot='component']) {
    margin: 3rem 0;
  }

  .instructions-container {
    border-top-width: 0.2rem;
    border-top-style: solid;
    padding: 1.5rem;
    position: relative;
  }

  .background {
    position: absolute;
    opacity: 0.1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .title-container {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .title {
    margin-left: 0.5rem;
  }

  .instructions-wrapper {
    margin-top: 1rem;
  }
`;

const doColor = '#36B37E';
const dontColor = '#DE350B';

const doIcon = (color = doColor) => svg`
  <svg width="24" height="24" viewBox="0 0 24 24">
    <path
      fill="${color}"
      d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"
    />
  </svg>
`;

const dontIcon = (color = dontColor) => svg`
  <svg width="24" height="24" viewBox="0 0 24 24">
    <path
      fill="${color}"
      d="M8.27,3L3,8.27V15.73L8.27,21H15.73L21,15.73V8.27L15.73,3M8.41,7L12,10.59L15.59,7L17,8.41L13.41,12L17,15.59L15.59,17L12,13.41L8.41,17L7,15.59L10.59,12L7,8.41"
    />
  </svg>
`;
type Icon = string | TemplateResult | ((color: string) => TemplateResult);

/**
 * Component to render general instructions or for a specific component.
 */
abstract class InstructionsCard extends LitElement {
  @property()
  color: string;

  @property()
  icon: Icon;

  @property()
  label: string;

  constructor(color: string, icon: Icon, label: string) {
    super();

    this.color = color;
    this.label = label;
    this.icon = icon;
  }

  render() {
    const icon =
      typeof this.icon === 'function' ? this.icon(this.color) : this.icon;

    return html`
      <style>
        ${styles}
      </style>
      <div class="container">
        <div class="component-container">
          <slot name="component"></slot>
        </div>
        <div
          class="instructions-container"
          style="
            border-top-color: ${this.color};
          "
        >
          <div class="background" style="background-color: ${this.color}"></div>
          <div class="title-container">
            ${icon}
            <span class="title">${this.label}</span>
          </div>
          <div class="instructions-wrapper">
            <slot name="instructions"></slot>
          </div>
        </div>
      </div>
    `;
  }
}

/**
 * Component to render general instructions or for a specific component.
 */
export class Do extends InstructionsCard {
  constructor() {
    super(doColor, doIcon, 'DO');
  }
}

/**
 * Component to render general instructions or for a specific component.
 */
export class Dont extends InstructionsCard {
  constructor() {
    super(dontColor, dontIcon(dontColor), "DON'T");
  }
}
