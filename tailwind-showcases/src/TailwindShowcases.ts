import '~/showcases/dockit-showcases.define.js';
import '~/clipboard/dockit-clipboard.define.js';
import { extractClassSuffixes } from './theme-helpers';
import { getZIndexHtml } from './z-index-helper';
import { getScaleHtml } from './space-helper';
import resolveConfig from 'tailwindcss/resolveConfig';
import { TailwindTheme } from 'tailwindcss/tailwind-config';

const getClassSuffixes = (theme) => ({
  colors: extractClassSuffixes('colors', theme),
  opacity: extractClassSuffixes('opacity', theme),
  boxShadow: extractClassSuffixes('boxShadow', theme),
  borderRadius: extractClassSuffixes('borderRadius', theme),
  borderWidth: extractClassSuffixes('borderWidth', theme),
  fontFamily: extractClassSuffixes('fontFamily', theme),
  fontSize: extractClassSuffixes('fontSize', theme),
  fontWeight: extractClassSuffixes('fontWeight', theme),
  letterSpacing: extractClassSuffixes('letterSpacing', theme),
  lineHeight: extractClassSuffixes('lineHeight', theme),
});

const getClassNames = (suffixes) => ({
  backgroundColor: {
    componentType: 'box',
    classes: suffixes.colors.map((s) => `bg${s}`),
    requiresCheckeredBackground: true,
  },
  opacity: {
    componentType: 'box',
    classes: suffixes.opacity.map((s) => `opacity${s}`),
    requiresCheckeredBackground: true,
  },
  shadow: {
    componentType: 'box',
    classes: suffixes.boxShadow.map((s) => `shadow${s}`),
  },
  borderRadius: {
    componentType: 'box',
    classes: suffixes.borderRadius.map((s) => `rounded${s}`),
  },
  borderWidth: {
    componentType: 'box',
    classes: suffixes.borderWidth.map((s) => `border${s}`),
  },
  borderColor: {
    componentType: 'box',
    classes: suffixes.colors.map((s) => `border${s}`),
  },
  fontFamily: {
    componentType: 'text',
    classes: suffixes.fontFamily.map((s) => `font${s}`),
  },
  fontSize: {
    componentType: 'text',
    classes: suffixes.fontSize.map((s) => `text${s}`),
  },
  fontWeight: {
    componentType: 'text',
    classes: suffixes.fontWeight.map((s) => `font${s}`),
  },
  textColor: {
    componentType: 'text',
    classes: suffixes.colors.map((s) => `text${s}`),
  },
  letterSpacing: {
    componentType: 'text',
    classes: suffixes.letterSpacing.map((s) => `tracking${s}`),
  },
  lineHeight: {
    componentType: 'text',
    classes: suffixes.lineHeight.map((s) => `leading${s}`),
    requiresLongText: true,
  },
});

export class TailwindShowcases extends HTMLElement {
  theme: TailwindTheme;

  constructor() {
    super();
    this.theme = {};
  }

  connectedCallback() {
    const partialTheme = this.theme;
    const { theme } = resolveConfig({ theme: partialTheme });

    const showcaseKey = this.getAttribute('showcase-key');
    if (showcaseKey === 'zIndex') {
      this.innerHTML = getZIndexHtml(theme);
      return;
    }

    if (showcaseKey === 'space') {
      this.innerHTML = getScaleHtml(theme.spacing);
      return;
    }

    const classSuffixes = getClassSuffixes(theme);
    const classNames = getClassNames(classSuffixes);

    const supportedKeys = Object.keys(classNames);

    if (!supportedKeys.includes(showcaseKey)) {
      this.innerHTML =
        this.innerHTML +
        /*html*/ `<p style="color:red;">Other keys than ${supportedKeys.join(
          ', '
        )} are not yet supported</p>`;
      return;
    }

    const {
      classes,
      componentType,
      requiresLongText,
      requiresCheckeredBackground,
    } = classNames[showcaseKey];

    const componentClass = this.getAttribute('component-class');

    this.innerHTML =
      this.innerHTML +
      /*html*/
      `<dockit-showcases
          component-class="${componentClass}"
          showcase-classes="${classes.join(' ')}"
          component-type="${componentType}"
          ${requiresLongText ? 'long-text' : ''}
          ${requiresCheckeredBackground ? 'checkered-background' : ''}
      ></dockit-showcases>`;
  }
}
