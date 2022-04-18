import '~/caption/dockit-caption.define';

export default {
  parameters: {
    layout: 'centered',
  },
};

export const caption_for_image = () => /*html*/ `
  <div>
    <img src="https://picsum.photos/300" alt="Random image for showcasing caption component"></img>
    <dockit-caption>Lorem ipsum dolor sit amet.</dockit-caption>
  </div>
`;

export const caption_for_component = () => /*html*/ `
  <div>
    <div style="background-color: #00000030; padding: .5rem; font-weight: 600; border-radius: .25rem; text-align: center;">
      SAMPLE BUTTON
    </div>
    <dockit-caption>Lorem ipsum dolor sit amet.</dockit-caption>
  </div>
`;
