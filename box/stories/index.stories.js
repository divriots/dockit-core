import '../index.js';
import './box-stories.css';

export default {
  parameters: {
    layout: 'centered',
  },
};

export const box = () =>
  /*html*/ `<dockit-box checkered-background class-name="boxStory"></dockit-box>`;

export const box_background = () =>
  /*html*/ `<dockit-box checkered-background class-name="boxStory boxStoryBackground"></dockit-box>`;

export const box_background_opacity = () =>
  /*html*/ `<dockit-box checkered-background class-name="boxStory boxStoryBackground boxStoryOpacity"></dockit-box>`;

export const box_background_roundness = () =>
  /*html*/ `<dockit-box checkered-background class-name="boxStory boxStoryBackground boxStoryRoundness"></dockit-box>`;
