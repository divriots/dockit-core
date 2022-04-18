import '~/image-container/dockit-image-container.define';
import '~/caption/dockit-caption.define';

export default {
  parameters: {
    layout: 'centered',
  },
};

export const image_container = () => /*html*/ `
  <div>
    <dockit-image-container>
      <img src="https://picsum.photos/300" alt="Random image"></img>
    </dockit-image-container>
    <dockit-caption>The caption is here</dockit-caption>
  </div>
`;
