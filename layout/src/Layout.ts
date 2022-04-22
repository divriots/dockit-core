import type { Context, Page } from '@divriots/studio-doc-compiler';
import { html, LitElement, nothing } from 'lit';
import { property, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { LayoutStyles } from './Layout.styles';
import menuSvg from './menu.svg?raw';
import moonSvg from './moon.svg?raw';
import sunSvg from './sun.svg?raw';
import xSvg from './x.svg?raw';

type ColorScheme = 'light' | 'dark';

const getInitialColorScheme = (): ColorScheme => {
  return (
    (localStorage.getItem('colorScheme') as ColorScheme | undefined) ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches && 'dark') ||
    'light'
  );
};

/**
 * Customisable layout for your documentation site.
 */
export class Layout extends LitElement {
  static styles = LayoutStyles;

  @property({ attribute: false })
  context?: Context;

  @property({ type: Boolean, attribute: 'disable-color-scheme-change' })
  disableColorSchemeChange: boolean = false;

  @property({ attribute: 'initial-color-scheme' })
  initialColorScheme?: ColorScheme;

  @state()
  private isNavigationShown: boolean = false;

  @state()
  private colorScheme: ColorScheme;

  @state()
  private locationPathname = location.pathname;

  private listenerRemovers: Function[] = [];

  connectedCallback(): void {
    super.connectedCallback();
    this.colorScheme = this.initialColorScheme || getInitialColorScheme();
    this.dispatchColorSchemeChange();
    this.setupWindowEvents();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.teardownWindowEvents();
  }

  requestUpdate(...args): void {
    super.requestUpdate(...args);
    const name = args[0] as PropertyKey;
    if (name === 'context') {
      this.locationPathname = location.pathname;
    }
  }

  render() {
    this.renderHost();
    return html`
      <div class="root">
        <div class="fixed-container">
          <div class="relative-container">
            <header class="header">
              <div class="logo-container">
                ${this.hasNavigation
                  ? html`<a class="logo-link" href="${this.getLogoHref()}">
                      <slot name="logo"></slot>
                    </a>`
                  : html`<slot name="logo"></slot>`}
              </div>
              <div class="topbar-container">
                <slot name="topbar"></slot>
              </div>
              <div class="buttons-container">
                ${this.disableColorSchemeChange
                  ? nothing
                  : html`
                      <button
                        class="color-scheme-toggle"
                        aria-live="polite"
                        aria-label="${`Press to activate ${
                          this.colorScheme === 'dark' ? 'light' : 'dark'
                        } mode`}"
                        @click="${() => this.toggleColorScheme()}"
                      >
                        ${unsafeHTML(
                          this.colorScheme === 'dark' ? moonSvg : sunSvg
                        )}
                      </button>
                    `}
                ${this.hasNavigation
                  ? html`
                      <button
                        class="navigation-toggle"
                        aria-live="polite"
                        aria-label="${`Press to ${
                          this.isNavigationShown ? 'close' : 'open'
                        } navigation`}"
                        @click="${() => this.toggleNavigation()}"
                      >
                        ${unsafeHTML(this.isNavigationShown ? xSvg : menuSvg)}
                      </button>
                    `
                  : nothing}
              </div>
            </header>
            ${this.hasNavigation
              ? html`<div
                  class="navigation-wrapper"
                  @click="${(event) => this.onNavigationWrapperClick(event)}"
                >
                  <nav class="navigation">
                    <ul>
                      ${this.context.pagesGraph
                        .filter(
                          (group) =>
                            !group.children || group.children.length > 0
                        )
                        .map(
                          (group) => html`<li>
                            ${group.children
                              ? html`<span>${group.key}</span>`
                              : nothing}
                            <ul>
                              ${(group.children ? group.children : [group]).map(
                                (item) => html`<li>
                                  <a
                                    href="${this.getPageUrlWithoutOrigin(
                                      item.page
                                    )}"
                                    aria-current="${ifDefined(
                                      this.locationPathname ===
                                        this.getPageUrlWithoutOrigin(item.page)
                                        ? 'location'
                                        : undefined
                                    )}"
                                  >
                                    ${item.key}
                                  </a>
                                </li>`
                              )}
                            </ul>
                          </li>`
                        )}
                    </ul>
                  </nav>
                </div>`
              : nothing}
          </div>
        </div>
        <main class="main-container">
          <article class="content">
            <slot></slot>
          </article>
        </main>
      </div>
    `;
  }

  private renderHost() {
    if (this.hasNavigation) {
      this.setAttribute('data-has-navigation', '');
    } else {
      this.removeAttribute('data-has-navigation');
    }
    if (this.isNavigationShown) {
      this.setAttribute('data-is-navigation-shown', '');
    } else {
      this.removeAttribute('data-is-navigation-shown');
    }
    this.setAttribute('data-color-scheme', this.colorScheme);
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

  private teardownWindowEvents() {
    this.listenerRemovers.forEach((removeListener) => removeListener());
    this.listenerRemovers = [];
  }

  private getLogoHref() {
    let page = '';
    if (this.hasNavigation && this.context.pagesGraph?.length > 0) {
      const pageGraph = this.context.pagesGraph[0];
      page =
        pageGraph.page ||
        (pageGraph.children?.length > 0 ? pageGraph.children[0].page : '');
    }
    return page ? this.getPageUrlWithoutOrigin(page) : '';
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
    if (
      event.target === event.currentTarget ||
      (event.target as HTMLElement).tagName === 'A'
    ) {
      this.hideNavigation();
    }
  }

  private hideNavigation(): void {
    this.isNavigationShown = false;
  }
}
