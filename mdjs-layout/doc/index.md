# MDJS Layout

Below we demonstrate our MDJS Layout component which acts as a default wrapper around Docs in Backlight starter kits.

To really show the difference, this text and above is default docs without a layout wrapper.

The demos below are rendered through the mdjs-layout component to show what it looks like with some nice defaults!

```js script
import { html } from 'lit';
import '../mdjs-layout.js';

// A copy of a preview-story from rendered docs index.md from Simba
const demoContent = `
  <h1>Button</h1>
  <p>Button web component.</p>
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

```js story
export const demo = () => html`
  <mdjs-layout .content=${demoContent}></mdjs-layout>
`;
```
