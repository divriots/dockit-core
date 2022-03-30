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

type Icon = string | TemplateResult | ((color: string) => TemplateResult);

/**
 * Component to render general instructions or for a specific component.
 */
export abstract class InstructionsCard extends LitElement {
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
