import '~/showcases';
import { getCssCustomProps } from './css-props';
import { getZIndexHtml } from './z-index-helper';
import { getScaleHtml } from './space-helper';
import { getTransitionsHtml } from './transition-helper';

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
        mode != '' && mode != 'transition'
          ? mode
          : prefix.includes('time') ||
            prefix.includes('transition') ||
            mode === 'transition'
          ? 'time'
          : prefix.includes('ease')
          ? 'ease'
          : prefix.includes('animation')
          ? 'animation'
          : null;
      this.innerHTML = getTransitionsHtml(props, _mode);
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
    const useLongText = this.getAttribute('long-text');
    const checkeredBackground = this.getAttribute('checkered-background');
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
          long-text="${useLongText}"
          checkered-background="${checkeredBackground}"
      >
      </dockit-showcases>`;
  }
}
