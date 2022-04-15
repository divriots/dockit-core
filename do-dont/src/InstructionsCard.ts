import { LitElement, html, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { InstructionsCardStyles } from './InstructionsCard.styles';

type Icon = string | TemplateResult | ((color: string) => TemplateResult);

export abstract class InstructionsCard extends LitElement {
  static styles = InstructionsCardStyles;

  @property()
  color: string;

  /**
   * Takes string or lit-html template. To render correct color automatically wrap in a function with `color` as a param.
   * @type string | `lit-html template` | `(color: string) => lit-html template`
   */
  @property()
  icon: Icon;

  @property()
  label: string;

  render() {
    const icon =
      typeof this.icon === 'function' ? this.icon(this.color) : this.icon;

    return html`
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
