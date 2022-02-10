import { mdjsLayoutStyles } from './mdjs-layout.styles';

type ColorScheme = 'light' | 'dark';

const sanitize = (str) => {
  var div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
};

const getInitialColorScheme = (): ColorScheme => {
  return (
    (localStorage.getItem('colorScheme') as ColorScheme | undefined) ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches && 'dark') ||
    'light'
  );
};

export class MdjsLayout extends HTMLElement {
  context: any;

  private _isNavigationShown: boolean = false;
  private _colorScheme: ColorScheme =
    this.initialColorScheme || getInitialColorScheme();

  private $colorSchemeToggle?: HTMLElement;
  private $navigationToggle?: HTMLElement;
  private $navigationWrapper?: HTMLElement;
  private listenerRemovers: Function[] = [];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  private connectedCallback(): void {
    this.render();
    this.dispatchColorSchemeChange();
    this.setupEvents();
  }

  private disconnectedCallback(): void {
    this.teardownEvents();
  }

  private render() {
    this.shadowRoot.innerHTML = this.renderTemplate();
    this.$colorSchemeToggle = this.shadowRoot.querySelector(
      '.color-scheme-toggle'
    );
    this.$navigationToggle =
      this.shadowRoot.querySelector('.navigation-toggle');
    this.$navigationWrapper = this.shadowRoot.querySelector(
      '.navigation-wrapper'
    );
    this.renderColorScheme();
    this.renderHasNavigation();
    this.renderIsNavigationShown();
  }

  private dispatchColorSchemeChange(): void {
    this.dispatchEvent(
      new CustomEvent('color-scheme-change', {
        detail: { colorScheme: this.colorScheme },
      })
    );
  }

  private setupEvents() {
    if (this.$colorSchemeToggle) {
      const colorSchemeToggleClickListener = () => this.toggleColorScheme();
      this.$colorSchemeToggle.addEventListener(
        'click',
        colorSchemeToggleClickListener
      );
      this.listenerRemovers.push(() => {
        this.$colorSchemeToggle.removeEventListener(
          'click',
          colorSchemeToggleClickListener
        );
      });
    }

    if (this.$navigationToggle) {
      const navigationToggleClickListener = () => this.toggleNavigation();
      this.$navigationToggle.addEventListener(
        'click',
        navigationToggleClickListener
      );
      this.listenerRemovers.push(() => {
        this.$navigationToggle.removeEventListener(
          'click',
          navigationToggleClickListener
        );
      });
    }

    if (this.$navigationWrapper) {
      const navigationWrapperClickListener = (event: Event) =>
        this.onNavigationWrapperClick(event);
      this.$navigationWrapper.addEventListener(
        'click',
        navigationWrapperClickListener
      );
      this.listenerRemovers.push(() => {
        this.$navigationWrapper.removeEventListener(
          'click',
          navigationWrapperClickListener
        );
      });
    }

    const windowKeydownListener = (event: KeyboardEvent) =>
      this.onWindowKeydown(event);
    window.addEventListener('keydown', windowKeydownListener);
    this.listenerRemovers.push(() => {
      window.removeEventListener('keydown', windowKeydownListener);
    });
  }

  private teardownEvents() {
    this.listenerRemovers.forEach((removeListener) => removeListener());
    this.listenerRemovers = [];
  }

  private renderColorScheme() {
    this.setAttribute('data-color-scheme', this.colorScheme);
    if (this.$colorSchemeToggle) {
      this.$colorSchemeToggle.setAttribute(
        'aria-label',
        `Press to activate ${
          this.colorScheme === 'dark' ? 'light' : 'dark'
        } mode`
      );
      this.$colorSchemeToggle.innerText =
        this.colorScheme === 'dark' ? '🌙' : '☀';
    }
  }

  private renderHasNavigation() {
    if (this.hasNavigation) {
      this.setAttribute('data-has-navigation', '');
    } else {
      this.removeAttribute('data-has-navigation');
    }
  }

  private renderIsNavigationShown() {
    if (this._isNavigationShown) {
      this.setAttribute('data-is-navigation-shown', '');
    } else {
      this.removeAttribute('data-is-navigation-shown');
    }
    if (this.$navigationToggle) {
      this.$navigationToggle.setAttribute(
        'aria-label',
        `Press to ${this.isNavigationShown ? 'close' : 'open'} navigation`
      );
      this.$navigationToggle.innerText = this.isNavigationShown ? '✕' : '☰';
    }
  }

  private getLogoHref() {
    if (this.hasNavigation && this.context.pagesGraph[0]) {
      return this.relativeUrl(
        this.context.pagesGraph[0].children
          ? this.context.pagesGraph[0].children[0].page.url
          : this.context.pagesGraph[0].page.url
      );
    } else {
      return '';
    }
  }

  private get hasNavigation(): boolean {
    return this.context && this.context.pagesGraph;
  }

  private relativeUrl(url: string): string {
    return [
      Array(url.split('/').length - 1)
        .fill('..')
        .join('/'),
      url,
    ].join('/');
  }

  private toggleColorScheme(): void {
    this.colorScheme = this.colorScheme === 'dark' ? 'light' : 'dark';
    this.dispatchColorSchemeChange();
    localStorage.setItem('colorScheme', this.colorScheme);
  }

  private toggleNavigation(): void {
    this.isNavigationShown = !this.isNavigationShown;
  }

  private onWindowKeydown(event: KeyboardEvent): void {
    if (this.isNavigationShown && event.key === 'Escape') {
      this.hideNavigation();
    }
  }

  private onNavigationWrapperClick(event: Event): void {
    if (event.currentTarget === event.target) {
      this.hideNavigation();
    }
  }

  private hideNavigation(): void {
    this.isNavigationShown = false;
  }

  private get isNavigationShown(): boolean {
    return this._isNavigationShown;
  }

  private set isNavigationShown(value: boolean) {
    this._isNavigationShown = value;
    this.renderIsNavigationShown();
  }

  private get initialColorScheme(): ColorScheme | null {
    return this.getAttribute('initial-color-scheme') as ColorScheme | null;
  }

  private set initialColorScheme(value: ColorScheme | null | undefined) {
    if (!value) {
      this.removeAttribute('initial-color-scheme');
    } else {
      this.setAttribute('initial-color-scheme', value);
    }
  }

  private get disableColorSchemeChange() {
    return this.hasAttribute('disable-color-scheme-change');
  }

  private set disableColorSchemeChange(value) {
    if (value) {
      this.setAttribute('disable-color-scheme-change', '');
    } else {
      this.removeAttribute('disable-color-scheme-change');
    }
  }

  private get colorScheme(): ColorScheme {
    return this._colorScheme;
  }

  private set colorScheme(value: ColorScheme) {
    this._colorScheme = value;
    this.renderColorScheme();
  }

  private renderTemplate() {
    return /*html*/ `
      <style>
        ${mdjsLayoutStyles}
      </style>
      <div class="fixed-container">
        <div class="relative-container">
          <header class="header">
            <div class="logo-container">
            ${
              this.hasNavigation
                ? `<a href="${sanitize(
                    this.getLogoHref()
                  )}"><slot name="logo"></slot></a>`
                : '<slot name="logo"></slot>'
            }
            </div>
            <div class="topbar-container">
              <slot name="topbar"></slot>
            </div>
            <div class="buttons-container">
              ${
                this.disableColorSchemeChange
                  ? ''
                  : /* html */ `
                  <button
                    class="color-scheme-toggle"
                    aria-live="polite"
                  ></button>
                `
              }
              ${
                this.hasNavigation
                  ? /*html*/ `
                    <button
                      class="navigation-toggle"
                      aria-live="polite"
                    ></button>
                  `
                  : ''
              }
            </div>
          </header>
          ${
            this.hasNavigation
              ? /*html*/ `
                <div
                  class="navigation-wrapper"
                >
                  <nav class="navigation">
                    <ul>
                      ${this.context.pagesGraph
                        .filter(
                          (group) =>
                            !group.children || group.children.length > 0
                        )
                        .map(
                          (group) => `<li>
                            ${
                              group.children
                                ? `<span>${sanitize(group.key)}</span>`
                                : ''
                            }
                            <ul>
                              ${(group.children ? group.children : [group])
                                .map(
                                  (item) => `<li>
                                    <a
                                      href="${sanitize(
                                        this.relativeUrl(item.page.url)
                                      )}"
                                      aria-current="${
                                        location.href.endsWith(
                                          '/' + item.page.url
                                        )
                                          ? 'location'
                                          : ''
                                      }"
                                    >
                                      ${sanitize(item.key)}
                                    </a>
                                  </li>`
                                )
                                .join('')}
                            </ul>
                          </li>`
                        )
                        .join('')}
                    </ul>
                  </nav>
                </div>`
              : ''
          }
        </div>
      </div>
      <main class="main-container">
        <article class="content">
          <slot></slot>
        </article>
      </main>
    `;
  }
}
