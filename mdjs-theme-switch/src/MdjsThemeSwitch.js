import { ThemeToggler } from 'dark-theme-utils';
import '@divriots/starter-simba/switch/simba-switch.js';
import { setBklTheme } from './setupSimbaBklTheme.js';

setBklTheme();

const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: block;
    }

    simba-switch {
      gap: 1rem;
    }
  </style>
  <simba-switch label="Dark Mode"></simba-switch>
`;

export class MdjsThemeSwitch extends ThemeToggler {
  _localStorageKey = 'mdjs-color-scheme-dark';
  _cssPropNames = {
    background: '--mdjs-theme-bg',
    color: '--mdjs-theme-color',
    fill: '--mdjs-theme-fill',
  };

  get switchBtn() {
    return this.shadowRoot.querySelector('simba-switch');
  }

  setup() {
    super.setup();

    // Ensure the switch button is synced to our theme prop after it has rendered
    requestAnimationFrame(() => {
      this.switchBtn.checked = this.theme === 'dark';
    });
  }

  setupThemeTransition() {
    // TODO: remove this override when we no longer need double animation
    // frame. This is needed because of how we load CSSStyleSheet in mdjs-layout
    // which will actually take 2 render frames to load fully...
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.documentElement.style.setProperty(
          this._cssPropNames.background,
          `background 0.3s ease-in-out`
        );

        ['color', 'fill'].forEach((prop) => {
          document.documentElement.style.setProperty(
            this._cssPropNames[prop],
            `${prop} 0.6s ease-in-out`
          );
        });
      });
    });
  }

  setTheme(theme, store = false) {
    const oldTheme = this.theme;
    super.setTheme(theme, store);
    if (this.theme !== oldTheme) {
      this.dispatchEvent(new Event('theme-changed'));
    }
  }

  render() {
    this.shadowRoot?.appendChild(template.content.cloneNode(true));
  }

  keyDown(ev) {
    ev.preventDefault();
    switch (ev.key) {
      case 'Enter':
      case ' ':
        this.toggle();
        break;
    }
  }
}
