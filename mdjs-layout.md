# MDJS Layout discussion

## Requirements

- Docs styles that look good out of the box, without needing to import something in every .md(x) file
- Must support dark-mode, in a way that is flexible and extendible. Different DS have different color-scheming approaches
- Allow for a default decorator to switch to light/dark (keeping other future customizations in mind), to which any DS can hook into to sync their internal color-scheming
- Keep the product unopinionated, encapsulate opinionated things in the dockit-core component/sb decorator

## Proposal

3 parts:

- mdjs-layout component
- mdjs-layout-controls component which is used inside mdjs-layout
- mdjs.config.js where mdjs-layout is configured to be used as docs layout wrapper

### Decorator

Storybook decorator (global) <https://storybook.js.org/docs/react/writing-stories/decorators#context-for-mocking>

```js
// when user selects "dark" in the decorator
// prefix used: `mdjs-color-scheme-`, suffix can be anything, dark, luminance, color, font-size etc.
localStorage.setItem('mdjs-color-scheme-dark', true);
```

We choose localStorage so the user preference is stored for future use.

### mdjs-layout component

```js
import { css, html, LitElement } from 'lit';

export class MdjsLayoutControls extends LitElement {
  static get properties() {
    return {
      config: { attribute: false },
    }
  }

  updated(changedProperties) {

  }

  render() {
    return html`
      <simba-switch label="Dark mode" @checked-changed=${this.darkModeChanged}>...</simba-switch>
    `;
  }

  darkModeChanged(ev) {
    if (ev.target.checked) {
      this.config = {
        ...this.config,
        'color-scheme-dark-mode': true,
      }
    } else {
      this.config = {
        ...this.config,
        'color-scheme-dark-mode': false,
      }
    }
  }
}
```

### mdjs-layout component

```js
import { css, html, LitElement } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import 'prism-themes/themes/prism-vsc-dark-plus.css';
import './mdjs-styles.css';

export class MdjsLayout extends LitElement {
  static get properties() {
    return {
      content: { attribute: false },
    };
  }

  render() {
    return html`
      ${unsafeHTML(this.content)}
      <mdjs-layout-controls @config-changed=${this.configChanged}></mdjs-layout-controls>
    `;
  }

  // redispatch for user to allow catching it in mdjs.config.js
  configChanged(ev) {
    /**
     * Example:
     * { 
     *   key: 'color-scheme-dark-mode',  
     *   oldValue: true,
     *   newValue: false,
     * }
     * or
     * {
     *   key: 'font-size',
     *   oldValue: '16px',
     *   newValue: '20px',  
     * }
     */ 
    const { details } = ev;
    this.dispatchEvent(new CustomEvent('config-changed', { 
      details, 
    }));
  }

  createRenderRoot() {
    return this;
  }
}
```


### mdjs.config.js

Example of mdjs.config.js for FAST, which uses luminance concept for dark/light.

```js
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { baseLayerLuminance } from '@divriots/starter-furious';
import { StandardLuminance } from '@microsoft/fast-components';

function configChanged(ev) {
  const changed = ev.details;
  if (changed.key === 'color-scheme-dark-mode') {
    const theme = changed.newValue ? 'dark' : 'light';

    // specific to mdjs-layout component, or simba (they currently use the same html attr)
    document.documentElement.setAttribute('theme', theme);
    
    // specific to FAST, which sets a bunch of CSS custom props
    const newLuminanceValue = theme === 'dark' ? StandardLuminance.DarkMode : StandardLuminance.LightMode;
      baseLayerLuminance.setValueFor(document.body, newLuminanceValue);
  }
}

export default {
  htmlParser: html,
  layout: (content, context) => html`
    <mdjs-layout @config-changed=${configChanged} .content=${content}></mdjs-layout>
  `,
};
```
