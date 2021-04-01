import '../index.js';

export default {
  parameters: {
    layout: 'centered',
  },
};

export const long_text = () => `
<div>
  <dockit-text useLongText/>
</div>
`;

export const short_text = () => `
<div>
  <dockit-text />
</div>
`;
