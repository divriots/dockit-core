import '~/showcases';
import { getCssCustomProps } from './css-props';
import { getZIndexHtml } from './z-index-helper';
import { getScaleHtml } from './space-helper';
import { getTransitionsHtml } from './transition-helper';

export class SassShowcases extends HTMLElement {
  connectedCallback() {
    const prefix = this.getAttribute('css-props-prefix');
    const props = getCssCustomProps(prefix);

    const styleKey = this.getAttribute('style-key');
    const componentType = this.getAttribute('component-type') || 'box';

    if (prefix.includes('transition')) {
      this.innerHTML = getTransitionsHtml(props);
      return;
    }

    if (prefix.includes('z-index')) {
      this.innerHTML = getZIndexHtml(props);
      return;
    }

    if (prefix.includes('spacing')) {
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
      ></dockit-showcases>`;
  }
}
