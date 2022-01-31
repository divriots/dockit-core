import { breakpoints } from './breakpoints';

export const mdjsLayoutStyles = /*css*/ `
  :host {
    --private--mdjs-layout-bg: var(--mdjs-layout-bg, #ffffff);
    --private--mdjs-layout-header-border-color: var(
      --mdjs-layout-header-border-color,
      #e5e5e5
    );
    --private--mdjs-layout-toggle-button-bg: var(
      --mdjs-layout-toggle-button-bg,
      #737373
    );
    --private--mdjs-layout-toggle-button-color: var(
      --mdjs-layout-toggle-button-color,
      #ffffff
    );
    --private--mdjs-layout-navigation-group-heading-color: var(
      --mdjs-layout-navigation-group-heading-color,
      #404040
    );
    --private--mdjs-layout-navigation-link-color: var(
      --mdjs-layout-navigation-link-color,
      #171717
    );
    --private--mdjs-layout-navigation-current-link-color: var(
      --mdjs-layout-navigation-current-link-color,
      #e5e5e5
    );
  }

  :host([data-color-scheme='dark']) {
    --private--mdjs-layout-bg: var(--mdjs-layout-bg, #171717);
    --private--mdjs-layout-header-border-color: var(
      --mdjs-layout-header-border-color,
      #404040
    );
    --private--mdjs-layout-toggle-button-bg: var(
      --mdjs-layout-toggle-button-bg,
      #737373
    );
    --private--mdjs-layout-toggle-button-color: var(
      --mdjs-layout-toggle-button-color,
      #ffffff
    );
    --private--mdjs-layout-navigation-group-heading-color: var(
      --mdjs-layout-navigation-group-heading-color,
      #a3a3a3
    );
    --private--mdjs-layout-navigation-link-color: var(
      --mdjs-layout-navigation-link-color,
      #ffffff
    );
    --private--mdjs-layout-navigation-current-link-color: var(
      --mdjs-layout-navigation-current-link-color,
      #404040
    );
  }

  :host {
    display: block;
    background-color: var(--private--mdjs-layout-bg);
    width: 100%;
    min-height: 100vh;
    overflow: hidden;
    --private--mdjs-layout-spacer: 1rem;
    --private--mdjs-layout-header-height: 3rem;
    --private--mdjs-layout-navigation-width: 244px;
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
    background-color: var(--private--mdjs-layout-bg);
    height: calc(
      var(--private--mdjs-layout-header-height) + 2 *
        var(--private--mdjs-layout-spacer)
    );
  }

  .logo-container {
    flex: 0;
    height: var(--private--mdjs-layout-header-height);
    padding: var(--private--mdjs-layout-spacer);
    border-bottom: 1px solid var(--private--mdjs-layout-header-border-color);
  }

  .logo-container ::slotted(:first-child) {
    display: inline-block;
  }

  @media screen and (min-width: ${breakpoints.lg}) {
    :host([data-has-navigation]) .logo-container {
      flex: none;
      width: calc(
        var(--private--mdjs-layout-navigation-width) - 2 *
          var(--private--mdjs-layout-spacer)
      );
      border-bottom-color: transparent;
    }
  }

  .topbar-container {
    flex: 1;
    display: flex;
    align-items: center;
    height: var(--private--mdjs-layout-header-height);
    padding: var(--private--mdjs-layout-spacer);
    border-bottom: 1px solid var(--private--mdjs-layout-header-border-color);
  }

  @media screen and (min-width: ${breakpoints.lg}) {
    :host([data-has-navigation]) .topbar-container {
      margin-left: calc(2 * var(--private--mdjs-layout-spacer));
      margin-right: var(--private--mdjs-layout-spacer);
      padding: var(--private--mdjs-layout-spacer) 0;
    }
  }

  .buttons-container {
    display: flex;
    position: fixed;
    bottom: var(--private--mdjs-layout-spacer);
    right: 0;
  }

  .color-scheme-toggle,
  .navigation-toggle {
    background-color: var(--private--mdjs-layout-toggle-button-bg);
    color: var(--private--mdjs-layout-toggle-button-color);
    cursor: pointer;
    font-size: calc(var(--private--mdjs-layout-header-height) / 2);
    font-family: inherit;
    margin-right: var(--private--mdjs-layout-spacer);
    width: var(--private--mdjs-layout-header-height);
    height: var(--private--mdjs-layout-header-height);
    line-height: var(--private--mdjs-layout-header-height);
    text-align: center;
    border: 0;
    padding: 0;
    border-radius: 50%;
  }

  @media screen and (min-width: ${breakpoints.lg}) {
    .buttons-container {
      position: absolute;
      top: var(--private--mdjs-layout-spacer);
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

  @media screen and (min-width: ${breakpoints.lg}) {
    :host([data-has-navigation]) .navigation-wrapper {
      display: block;
    }

    .navigation-wrapper::before {
      content: '';
      background-image: linear-gradient(
        to bottom,
        var(--private--mdjs-layout-bg),
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
      width: var(--private--mdjs-layout-navigation-width);
    }
  }

  .navigation {
    background-color: var(--private--mdjs-layout-bg);
    width: var(--private--mdjs-layout-navigation-width);
    height: 100vh;
    overflow-y: auto;
  }

  @media screen and (min-width: ${breakpoints.lg}) {
    .navigation {
      height: calc(
        100vh - var(--private--mdjs-layout-header-height) - 2 *
          var(--private--mdjs-layout-spacer)
      );
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
    padding: var(--private--mdjs-layout-spacer);
    padding-right: calc(2 * var(--private--mdjs-layout-spacer));
  }

  .navigation ul > li {
    margin: var(--private--mdjs-layout-spacer) 0;
    padding: 0;
  }

  .navigation > ul > li {
    margin: calc(2 * var(--private--mdjs-layout-spacer)) 0;
  }

  .navigation > ul > li:first-child {
    margin-top: 0;
  }

  .navigation > ul > li:last-child {
    margin-bottom: 0;
  }

  .navigation > ul > li > span {
    color: var(--private--mdjs-layout-navigation-group-heading-color);
    text-transform: uppercase;
  }

  .navigation a {
    color: var(--private--mdjs-layout-navigation-link-color);
    padding: calc(var(--private--mdjs-layout-spacer) / 2);
    margin-left: calc(-1 * var(--private--mdjs-layout-spacer) / 2);
    text-decoration: none;
  }

  .navigation a[aria-current='location'] {
    background-color: var(--private--mdjs-layout-navigation-current-link-color);
  }

  .main-container {
    max-width: 1280px;
    margin: 0 auto;
    padding-top: calc(
      var(--private--mdjs-layout-header-height) + 2 *
        var(--private--mdjs-layout-spacer)
    );
    position: relative;
    z-index: 1;
  }

  .content {
    padding: var(--private--mdjs-layout-spacer);
  }

  @media screen and (min-width: ${breakpoints.lg}) {
    :host([data-has-navigation]) .content {
      padding-left: var(--private--mdjs-layout-navigation-width);
    }

    :host([data-has-navigation]) .content > slot {
      display: block;
      padding-left: calc(2 * var(--private--mdjs-layout-spacer));
    }
  }
`;
