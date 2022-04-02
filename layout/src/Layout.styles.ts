import { css, unsafeCSS } from 'lit';
import { breakpoints } from './breakpoints';

export const LayoutStyles = css`
  :host {
    --proxy--dockit-layout-bg: var(--dockit-layout-bg);
    --proxy--dockit-layout-header-border-color: var(
      --dockit-layout-header-border-color
    );
    --proxy--dockit-layout-toggle-button-bg: var(
      --dockit-layout-toggle-button-bg
    );
    --proxy--dockit-layout-toggle-button-color: var(
      --dockit-layout-toggle-button-color
    );
    --proxy--dockit-layout-navigation-group-heading-color: var(
      --dockit-layout-navigation-group-heading-color
    );
    --proxy--dockit-layout-navigation-link-color: var(
      --dockit-layout-navigation-link-color
    );
    --proxy--dockit-layout-navigation-current-link-color: var(
      --dockit-layout-navigation-current-link-color
    );
  }

  :host([data-color-scheme='light']) .root {
    --dockit-layout-bg: var(--proxy--dockit-layout-bg, #ffffff);
    --dockit-layout-header-border-color: var(
      --proxy--dockit-layout-header-border-color,
      #e5e5e5
    );
    --dockit-layout-toggle-button-bg: var(
      --proxy--dockit-layout-toggle-button-bg,
      #737373
    );
    --dockit-layout-toggle-button-color: var(
      --proxy--dockit-layout-toggle-button-color,
      #ffffff
    );
    --dockit-layout-navigation-group-heading-color: var(
      --proxy--dockit-layout-navigation-group-heading-color,
      #404040
    );
    --dockit-layout-navigation-link-color: var(
      --proxy--dockit-layout-navigation-link-color,
      #171717
    );
    --dockit-layout-navigation-current-link-color: var(
      --proxy--dockit-layout-navigation-current-link-color,
      #e5e5e5
    );
  }

  :host([data-color-scheme='dark']) .root {
    --dockit-layout-bg: var(--proxy--dockit-layout-bg, #171717);
    --dockit-layout-header-border-color: var(
      --proxy--dockit-layout-header-border-color,
      #404040
    );
    --dockit-layout-toggle-button-bg: var(
      --proxy--dockit-layout-toggle-button-bg,
      #737373
    );
    --dockit-layout-toggle-button-color: var(
      --proxy--dockit-layout-toggle-button-color,
      #ffffff
    );
    --dockit-layout-navigation-group-heading-color: var(
      --proxy--dockit-layout-navigation-group-heading-color,
      #a3a3a3
    );
    --dockit-layout-navigation-link-color: var(
      --proxy--dockit-layout-navigation-link-color,
      #ffffff
    );
    --dockit-layout-navigation-current-link-color: var(
      --proxy--dockit-layout-navigation-current-link-color,
      #404040
    );
  }

  :host {
    display: block;
    --private--dockit-layout-spacer: 1rem;
    --private--dockit-layout-header-content-height: 3rem;
    --private--dockit-layout-header-height: calc(
      var(--private--dockit-layout-header-content-height) + 2 *
        var(--private--dockit-layout-spacer)
    );
    --private--dockit-layout-logo-height: var(
      --private--dockit-layout-header-content-height
    );
    --private--dockit-layout-navigation-width: 244px;
  }

  .root {
    background-color: var(--dockit-layout-bg);
    width: 100%;
    min-height: 100vh;
    overflow: hidden;
  }

  .fixed-container {
    position: fixed;
    width: 100%;
    z-index: 2;
  }

  .relative-container {
    position: relative;
    max-width: 1280px;
    margin: 0 auto;
  }

  .header {
    display: flex;
    background-color: var(--dockit-layout-bg);
    height: var(--private--dockit-layout-header-height);
  }

  .logo-container {
    display: flex;
    height: var(--private--dockit-layout-header-content-height);
    padding: var(--private--dockit-layout-spacer);
    border-bottom: 1px solid var(--dockit-layout-header-border-color);
  }

  .logo-link {
    display: flex;
    text-decoration: none;
  }

  @media screen and (min-width: ${unsafeCSS(breakpoints.lg)}) {
    :host([data-has-navigation]) .logo-container {
      flex: none;
      width: calc(
        var(--private--dockit-layout-navigation-width) - 2 *
          var(--private--dockit-layout-spacer)
      );
      border-bottom-color: transparent;
    }
  }

  .topbar-container {
    flex: 1;
    display: flex;
    align-items: center;
    height: var(--private--dockit-layout-header-content-height);
    padding: var(--private--dockit-layout-spacer);
    border-bottom: 1px solid var(--dockit-layout-header-border-color);
  }

  @media screen and (min-width: ${unsafeCSS(breakpoints.lg)}) {
    :host([data-has-navigation]) .topbar-container {
      margin-left: calc(2 * var(--private--dockit-layout-spacer));
      margin-right: var(--private--dockit-layout-spacer);
      padding: var(--private--dockit-layout-spacer) 0;
    }
  }

  .buttons-container {
    display: flex;
    position: fixed;
    bottom: var(--private--dockit-layout-spacer);
    right: 0;
  }

  .color-scheme-toggle,
  .navigation-toggle {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--dockit-layout-toggle-button-bg);
    color: var(--dockit-layout-toggle-button-color);
    cursor: pointer;
    margin-right: var(--private--dockit-layout-spacer);
    width: var(--private--dockit-layout-header-content-height);
    height: var(--private--dockit-layout-header-content-height);
    line-height: var(--private--dockit-layout-header-content-height);
    text-align: center;
    border: 0;
    padding: 0;
    border-radius: 50%;
  }

  .color-scheme-toggle > svg,
  .navigation-toggle > svg {
    width: 1.5rem;
  }

  @media screen and (min-width: ${unsafeCSS(breakpoints.lg)}) {
    .buttons-container {
      position: absolute;
      top: var(--private--dockit-layout-spacer);
      bottom: unset;
    }

    .navigation-toggle {
      display: none;
    }
  }

  .navigation-wrapper {
    display: none;
    position: absolute;
  }

  :host([data-is-navigation-shown]) .navigation-wrapper {
    display: block;
    background-color: rgba(0, 0, 0, 0.5);
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 9999;
  }

  @media screen and (min-width: ${unsafeCSS(breakpoints.lg)}) {
    :host([data-has-navigation]) .navigation-wrapper {
      display: block;
    }

    .navigation-wrapper::before {
      content: '';
      background-image: linear-gradient(
        to bottom,
        var(--dockit-layout-bg),
        #ffffff00
      );
      height: 20px;
      position: absolute;
    }

    :host([data-is-navigation-shown]) .navigation-wrapper {
      background-color: transparent;
      position: static;
      height: auto;
    }

    .navigation-wrapper,
    :host([data-is-navigation-shown]) .navigation-wrapper,
    .navigation-wrapper::before {
      width: var(--private--dockit-layout-navigation-width);
    }
  }

  .navigation {
    background-color: var(--dockit-layout-bg);
    width: var(--private--dockit-layout-navigation-width);
    height: 100vh;
    overflow-y: auto;
  }

  @media screen and (min-width: ${unsafeCSS(breakpoints.lg)}) {
    .navigation {
      height: calc(100vh - var(--private--dockit-layout-header-height));
    }
  }

  :host([data-color-scheme='light']) .navigation {
    color-scheme: light;
  }

  :host([data-color-scheme='dark']) .navigation {
    color-scheme: dark;
  }

  .navigation ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .navigation > ul {
    padding: var(--private--dockit-layout-spacer);
    padding-right: calc(2 * var(--private--dockit-layout-spacer));
  }

  .navigation ul > li {
    margin: var(--private--dockit-layout-spacer) 0;
    padding: 0;
  }

  .navigation > ul > li {
    margin: calc(2 * var(--private--dockit-layout-spacer)) 0;
  }

  .navigation > ul > li:first-child {
    margin-top: 0;
  }

  .navigation > ul > li:last-child {
    margin-bottom: 0;
  }

  .navigation > ul > li > span {
    color: var(--dockit-layout-navigation-group-heading-color);
    text-transform: uppercase;
  }

  .navigation a {
    color: var(--dockit-layout-navigation-link-color);
    padding: calc(var(--private--dockit-layout-spacer) / 2);
    margin-left: calc(-1 * var(--private--dockit-layout-spacer) / 2);
    text-decoration: none;
  }

  .navigation a[aria-current='location'] {
    background-color: var(--dockit-layout-navigation-current-link-color);
  }

  .main-container {
    max-width: 1280px;
    margin: 0 auto;
    padding-top: calc(var(--private--dockit-layout-header-height));
    position: relative;
    z-index: 1;
  }

  .content {
    padding: var(--private--dockit-layout-spacer);
  }

  @media screen and (min-width: ${unsafeCSS(breakpoints.lg)}) {
    :host([data-has-navigation]) .content {
      padding-left: var(--private--dockit-layout-navigation-width);
    }

    :host([data-has-navigation]) .content > slot {
      display: block;
      padding-left: calc(2 * var(--private--dockit-layout-spacer));
    }
  }
`;
