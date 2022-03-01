import type { Context, Page } from '@divriots/studio-doc-compiler';
import { LayoutStyles } from './Layout.styles';

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

export class Layout extends HTMLElement {
  set context(context: Context) {
    this._context = context;
    this.scheduleRender();
  }

  get context(): Context {
    return this._context;
  }

  private _context: Context;

  private _isNavigationShown: boolean = false;
  private _colorScheme: ColorScheme =
    this.initialColorScheme || getInitialColorScheme();

  private isRenderScheduled = false;
  private $colorSchemeToggle?: HTMLElement;
  private $navigationToggle?: HTMLElement;
  private $navigationWrapper?: HTMLElement;
  private listenerRemovers: Function[] = [];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  private connectedCallback(): void {
    this.scheduleRender();
    this.dispatchColorSchemeChange();
    this.setupWindowEvents();
  }

  private disconnectedCallback(): void {
    this.teardownWindowEvents();
  }

  private scheduleRender() {
    if (this.isRenderScheduled) return;
    this.isRenderScheduled = true;
    requestAnimationFrame(() => {
      this.render();
      this.isRenderScheduled = false;
    });
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
    this.setupTemplateEvents();
  }

  private dispatchColorSchemeChange(): void {
    this.dispatchEvent(
      new CustomEvent('color-scheme-change', {
        detail: { colorScheme: this.colorScheme },
      })
    );
  }

  private setupWindowEvents() {
    const windowKeydownListener = (event: KeyboardEvent) =>
      this.onWindowKeydown(event);
    window.addEventListener('keydown', windowKeydownListener);
    this.listenerRemovers.push(() => {
      window.removeEventListener('keydown', windowKeydownListener);
    });
  }

  private setupTemplateEvents() {
    if (this.$colorSchemeToggle) {
      this.$colorSchemeToggle.addEventListener('click', () =>
        this.toggleColorScheme()
      );
    }

    if (this.$navigationToggle) {
      this.$navigationToggle.addEventListener('click', () =>
        this.toggleNavigation()
      );
    }

    if (this.$navigationWrapper) {
      this.$navigationWrapper.addEventListener('click', (event) =>
        this.onNavigationWrapperClick(event)
      );
    }
  }

  private teardownWindowEvents() {
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
      const page = this.context.pagesGraph[0].children
        ? this.context.pagesGraph[0].children[0].page
        : this.context.pagesGraph[0].page;
      return this.getPageUrlWithoutOrigin(page);
    } else {
      return '';
    }
  }

  private get hasNavigation(): boolean {
    return !!(this.context && this.context.pagesGraph);
  }

  private getPageUrlWithoutOrigin(page: Page): string {
    return this.context.base + page.url;
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
        ${LayoutStyles}
      </style>
      <div class="fixed-container">
        <div class="relative-container">
          <header class="header">
            <div class="logo-container">
            ${
              this.hasNavigation
                ? `<a class="logo-link" href="${sanitize(
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
                                        this.getPageUrlWithoutOrigin(item.page)
                                      )}"
                                      aria-current="${
                                        location.pathname ===
                                        this.getPageUrlWithoutOrigin(item.page)
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
