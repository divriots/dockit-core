import { LitElement, html, TemplateResult, CSSResultGroup } from 'lit';
import { property } from 'lit/decorators.js';
import { InstructionsCardStyles } from './InstructionsCard.styles';

type Icon = string | TemplateResult;

export abstract class InstructionsCard extends LitElement {
  static styles: CSSResultGroup = InstructionsCardStyles;

  @property()
  label: string;

  icon: Icon = '';

  render() {
    return html`
      <div part="container">
        <div part="component-container">
          <slot name="component"></slot>
        </div>
        <div part="instructions-container">
          <div class="background"></div>
          <div class="title-container">
            <slot name="icon">${this.icon}</slot>
            <span class="title">${this.label}</span>
          </div>
          <slot name="instructions"></slot>
        </div>
      </div>
    `;
  }
}
