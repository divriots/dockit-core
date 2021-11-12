/* @jsx h */
import { Host, h } from '@stencil/core';
import { MdjsLayout } from './mdjs-layout';

export function mdjsLayoutTemplate(component: MdjsLayout) {
  return (
    <Host
      data-color-scheme={component.colorScheme}
      data-has-navigation={component.hasNavigation ? '' : undefined}
    >
      <div class="fixed-container">
        <div class="relative-container">
          <header class="header">
            <div class="logo-container">
              <a
                href={
                  component.hasNavigation && component.context.pagesGraph[0]
                    ? component.relativeUrl(
                        component.context.pagesGraph[0].children
                          ? component.context.pagesGraph[0].children[0].page.url
                          : component.context.pagesGraph[0].page.url
                      )
                    : undefined
                }
              >
                <slot name="logo"></slot>
              </a>
            </div>
            <div class="topbar-container">
              <slot name="topbar"></slot>
            </div>
            <div class="buttons-container">
              <button
                class="color-scheme-toggle"
                aria-label={`Press to activate ${
                  component.colorScheme === 'dark' ? 'light' : 'dark'
                } mode`}
                aria-live="polite"
                onClick={() => component.toggleColorScheme()}
              >
                {component.colorScheme === 'dark' ? '🌙' : '☀'}
              </button>
              {component.hasNavigation ? (
                <button
                  class="navigation-toggle"
                  aria-label={`Press to ${
                    component.isNavigationShown ? 'close' : 'open'
                  } navigation`}
                  aria-live="polite"
                  onClick={() => component.toggleNavigation()}
                >
                  {component.isNavigationShown ? '✕' : '☰'}
                </button>
              ) : undefined}
            </div>
          </header>
          {component.hasNavigation ? (
            <div
              class={
                'navigation-wrapper' +
                (component.isNavigationShown
                  ? ' navigation-wrapper--shown'
                  : '')
              }
              onClick={(event) => component.onNavigationWrapperClick(event)}
            >
              <nav class="navigation">
                <ul>
                  {component.context.pagesGraph
                    .filter(
                      (group) => !group.children || group.children.length > 0
                    )
                    .map((group) => (
                      <li>
                        {group.children ? <span>{group.key}</span> : undefined}
                        <ul>
                          {(group.children ? group.children : [group]).map(
                            (item) => (
                              <li>
                                <a
                                  href={component.relativeUrl(item.page.url)}
                                  aria-current={
                                    location.href.endsWith(item.page.url)
                                      ? 'location'
                                      : ''
                                  }
                                >
                                  {item.key}
                                </a>
                              </li>
                            )
                          )}
                        </ul>
                      </li>
                    ))}
                </ul>
              </nav>
            </div>
          ) : null}
        </div>
      </div>
      <main class="main-container">
        <article class="content">
          <slot></slot>
        </article>
      </main>
    </Host>
  );
}
