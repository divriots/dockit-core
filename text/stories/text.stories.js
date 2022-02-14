import '../dockit-text.define.js';

export default {
  parameters: {
    layout: 'centered',
  },
};

export const short_text = () => /*html*/ `<dockit-text></dockit-text>`;

export const long_text = () => /*html*/ `<dockit-text long-text></dockit-text>`;
