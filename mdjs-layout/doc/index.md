# mdjs-layout

Below we demonstrate our `mdjs-layout` component which acts as a default wrapper around Docs in Backlight starter kits.

The demos below are rendered through the `mdjs-layout` component to show what it looks like with some nice defaults.

As you may see, this text right here is also styled, this is because the `mdjs-layout` component adds some styles that affect the page globally as a side-effect.

Also, the demo looks like a demo inside a demo, because it is, the outer layer shows how you would interact with the `mdjs-layout`-component to listen to config changes; in this case dark-mode toggle. The inner layer is just a dummy demo of a button to show what the docs page would look like.

## Components

These are the three components in the package in hierarchical order (starting top-most parent).

- mdjs-layout: the main wrapping element, which takes care of global styles, prism theme, and rendering the UI to control the layout
- mdjs-layout-controls: the UI element for adjusting settings for the mdjs-layout
- mdjs-theme-switch: an extension of the theme-toggler component of `dark-theme-utils`, in order to switch dark-mode on/off and store in localStorage where appropriate

```js script
import { html } from 'lit';
import '../mdjs-layout.js';

// A copy of a preview-story from rendered docs index.md from Simba
const demoContent = `
  <h1>Button</h1>
  <p>Button web component.</p>
  <blockquote>Foo bar</blockquote>
  <div class="preview-story">
    <div data-story-id="submitButton" class="story_padded">
      <button>Submit</button>
    </div>
    <details>
      <summary>Code</summary>
      <pre class="language-js"><code class="language-js"><span class="token keyword module">export</span> <span class="token keyword">const</span> <span class="token function-variable function">submitButton</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token arrow operator">=&gt;</span> html<span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token html language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span><span class="token punctuation">&gt;</span></span>Submit<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">&gt;</span></span></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">;</span>
</code></pre>
    </details>
  </div>
`;
```

```js preview-story
export const demo = () => {
  const configChanged = (ev) => {
    const change = ev.detail;
    if (change.key === 'color-scheme-dark-mode') {
      console.table([change])
      // Do any changes to sync with your DS dark-mode logic
    }
  }

  return html`
    <mdjs-layout @config-changed=${configChanged} .content=${demoContent}></mdjs-layout>
  `;
}
```
