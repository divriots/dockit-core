import { getCaption } from './caption-helper';

const style = /*css*/ `
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-right: 1rem;
  margin-top: 1rem;
`;

export const renderCaptionedBox = ({
  showcaseClass,
  showcaseStyle,
  captionWidth,
  componentClass,
  hasCheckeredBackground = false,
}: {
  showcaseClass?: string;
  showcaseStyle?: string;
  captionWidth?: string;
  componentClass?: string;
  hasCheckeredBackground: boolean;
}) => /*html*/ `
<div style="${style}">
  <dockit-box
    ${hasCheckeredBackground ? 'checkered-background' : ''}
    class-name="${showcaseClass} ${componentClass}"
    showcase-style="${showcaseStyle}"
  ></dockit-box>
  <dockit-clipboard
    width="${captionWidth}"
  >${getCaption(showcaseClass, showcaseStyle)}</dockit-clipboard>
</div>`;
