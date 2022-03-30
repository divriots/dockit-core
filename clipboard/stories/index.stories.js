import '../dockit-clipboard.define.js';

export default {
  parameters: {
    layout: 'centered',
  },
};

export const clipboard = () =>
  /*html*/ `<dockit-clipboard><pre>test clipboard</pre></dockit-clipboard>`;
