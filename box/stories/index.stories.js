import '../index.js';
import './story.css';

export default {
  parameters: {
    layout: 'centered',
  },
};

export const box = () => `
<div>
  <dockit-box checkeredBackground class="boxStory"/>
</div>
`;

export const box_background = () => `
<div>
  <dockit-box checkeredBackground class="boxStory boxStoryBackground"/>
</div>
`;

export const box_background_opacity = () => `
<div>
  <dockit-box checkeredBackground class="boxStory boxStoryBackground boxStoryOpacity"/>
</div>
`;

export const box_background_roundness = () => `
<div>
  <dockit-box checkeredBackground class="boxStory boxStoryBackground boxStoryRoundness"/>
</div>
`;
