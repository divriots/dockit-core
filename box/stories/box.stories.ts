import '@divriots/dockit-core/box/dockit-box.define.js';
import './box-stories.css';

export default {
  parameters: {
    layout: 'centered',
  },
};

export const box = () =>
  /*html*/ `<dockit-box class-name="boxStory"></dockit-box>`;

export const box_background = () =>
  /*html*/ `<dockit-box class-name="boxStory boxStoryBackground"></dockit-box>`;

export const box_background_opacity = () =>
  /*html*/ `<dockit-box checkered-background class-name="boxStory boxStoryBackground boxStoryOpacity"></dockit-box>`;

export const box_background_roundness = () =>
  /*html*/ `<dockit-box class-name="boxStory boxStoryBackground boxStoryRoundness"></dockit-box>`;

export const box_background_roundness_opacity = () =>
  /*html*/ `<dockit-box checkered-background class-name="boxStory boxStoryBackground boxStoryRoundness boxStoryOpacity"></dockit-box>`;

export const box_background_roundness_opacity_by_style =
  () => /*html*/ `<dockit-box
    checkered-background
    showcase-style="
      background-color: #2f855a;
      opacity: 0.7;
      border-radius: 0.8rem;
    "
    class-name="boxStory">
  </dockit-box>`;
