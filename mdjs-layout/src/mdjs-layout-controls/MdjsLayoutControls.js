import { LitElement, css, html } from 'lit';
import deepmerge from 'deepmerge';
import { isPlainObject } from 'is-plain-object';
import '../mdjs-theme-switch/mdjs-theme-switch.js';

export class MdjsLayoutControls extends LitElement {
  static get properties() {
    return {
      config: { attribute: false },
    };
  }

  static get styles() {
    return css`
      :host {
        position: fixed;
        right: 20px;
        bottom: 20px;
      }
    `;
  }

  firstUpdated(changedProperties) {
    super.firstUpdated(changedProperties);
    this.config = {
      'color-scheme-dark-mode':
        this.shadowRoot.getElementById('theme-switch').theme === 'dark',
    };
  }

  render() {
    return html`
      <mdjs-theme-switch
        id="theme-switch"
        label="Dark Mode"
        @theme-changed=${this.darkModeChanged}
      ></mdjs-theme-switch>
    `;
  }

  updateConfig(newCfg) {
    const oldCfg = this.config;
    this.config = deepmerge(this.config, newCfg, {
      isMergeableObject: isPlainObject,
    });

    // Assumption: only a single key of the config gets updated at a time
    // because user can only change one control at a time
    const key = Object.keys(newCfg)[0];
    this.dispatchEvent(
      new CustomEvent('config-changed', {
        detail: {
          key,
          oldValue: oldCfg[key],
          newValue: this.config[key],
        },
      })
    );
  }

  darkModeChanged(ev) {
    this.updateConfig({
      'color-scheme-dark-mode': ev.target.theme === 'dark',
    });
  }
}
