import {
  Component,
  Event,
  EventEmitter,
  Listen,
  Prop,
  State,
} from '@stencil/core';
import { mdjsLayoutTemplate } from './mdjs-layout.template';

type ColorScheme = 'light' | 'dark';

@Component({
  tag: 'mdjs-layout',
  styleUrl: 'mdjs-layout.styles.scss',
  shadow: true,
})
export class MdjsLayout {
  @Prop() context: any;

  @Event({
    eventName: 'color-scheme-change',
    bubbles: false,
    cancelable: false,
    composed: false,
  })
  colorSchemeChange: EventEmitter<{ colorScheme: ColorScheme }>;

  @State() isNavigationShown: boolean = false;
  @State() colorScheme: ColorScheme = MdjsLayout.getInitialColorScheme();

  static getInitialColorScheme(): ColorScheme {
    return (
      (localStorage.getItem('colorScheme') as ColorScheme | undefined) ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches && 'dark') ||
      'light'
    );
  }

  render() {
    return mdjsLayoutTemplate(this);
  }

  connectedCallback(): void {
    this.dispatchColorSchemeChange();
  }

  toggleColorScheme(): void {
    this.colorScheme = this.colorScheme === 'dark' ? 'light' : 'dark';
    this.dispatchColorSchemeChange();
    localStorage.setItem('colorScheme', this.colorScheme);
  }

  toggleNavigation(): void {
    this.isNavigationShown = !this.isNavigationShown;
  }

  @Listen('keydown', { target: 'window' })
  onWindowKeydown(event: KeyboardEvent): void {
    if (this.isNavigationShown && event.key === 'Escape') {
      this.hideNavigation();
    }
  }

  onNavigationWrapperClick(event: Event): void {
    if (event.currentTarget === event.target) {
      this.hideNavigation();
    }
  }

  hideNavigation(): void {
    this.isNavigationShown = false;
  }

  get hasNavigation(): boolean {
    return this.context && this.context.pagesGraph;
  }

  relativeUrl(url: string): string {
    return [
      Array(url.split('/').length - 1)
        .fill('..')
        .join('/'),
      url,
    ].join('/');
  }

  dispatchColorSchemeChange(): void {
    this.colorSchemeChange.emit({ colorScheme: this.colorScheme });
  }
}
