import '~/showcases/dockit-showcases.define.js';
import { getCssCustomProps } from './css-props';
import { getZIndexHtml } from './z-index-helper';
import { getScaleHtml } from './space-helper';
import { getTransitionsHtml } from './transition-helper';
import styles from './alerts.module.scss';
import '~/clipboard/dockit-clipboard.define.js';

export class CssShowcases extends HTMLElement {
  connectedCallback() {
    const prefix = this.getAttribute('css-props-prefix') || '';
    const mode = this.getAttribute('mode') || '';

    const names = new Set(
      (this.getAttribute('css-props-names') || '').split(',')
    );

    const props = getCssCustomProps(prefix, names);

    const styleKey = this.getAttribute('style-key');
    const componentType = this.getAttribute('component-type') || 'box';

    if (
      prefix.includes('transition') ||
      prefix.includes('time') ||
      prefix.includes('ease') ||
      prefix.includes('animation') ||
      mode === 'time' ||
      mode === 'ease' ||
      mode === 'animation'
    ) {
      let _mode =
        mode != ''
          ? mode
          : prefix.includes('time') || prefix.includes('transition')
          ? 'time'
          : prefix.includes('ease')
          ? 'ease'
          : prefix.includes('animation')
          ? 'animation'
          : null;
      this.innerHTML = getTransitionsHtml(this, props, _mode);
      if (prefix.includes('transition') && !this.hasAttribute('mode'))
        this.innerHTML =
          this.innerHTML +
          /*html*/
          `<p class="${styles.warn}"><code>--transition</code> CSS Custom Props prefix is deprecated.<br>Use <code>--time</code> prefix instead, or use <code>&lt;dockit-css-showcases mode="time" css-props-prefix="--transition"/></code> elements to explicitely set the rendering mode.</p>`;
      return;
    }

    if (prefix.includes('z-index') || mode === 'z-index') {
      this.innerHTML = getZIndexHtml(props);
      return;
    }

    if (
      (prefix.includes('spacing') && !prefix.includes('letter-spacing')) ||
      mode === 'scale'
    ) {
      this.innerHTML = getScaleHtml(props);
      return;
    }

    const componentClass = this.getAttribute('component-class');
    const hasLongText = this.hasAttribute('long-text');
    const hasCheckeredBackground = this.hasAttribute('checkered-background');
    const showcaseStyles = props
      .map(([name]) => `${styleKey}: var(${name});`)
      .join(' ');

    this.innerHTML =
      this.innerHTML +
      /*html*/
      `<dockit-showcases
          component-class="${componentClass}"
          showcase-styles="${showcaseStyles}"
          component-type="${componentType}"
          ${hasLongText ? 'long-text' : ''}
          ${hasCheckeredBackground ? 'checkered-background' : ''}
      >
      </dockit-showcases>`;
  }
}
