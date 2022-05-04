import { getCaption } from './caption-helper';

const style = /*css*/ `
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 1rem;
`;

export const renderCaptionedText = ({
  showcaseClass,
  showcaseStyle,
  captionWidth,
  hasLongText = false,
}: {
  showcaseClass?: string;
  showcaseStyle?: string;
  captionWidth?: string;
  hasLongText: boolean;
}) => /*html*/ `
<div style="${style}">
  <dockit-clipboard
    width="${captionWidth}"
  >${getCaption(showcaseClass, showcaseStyle)}</dockit-clipboard>
  <dockit-text
    ${hasLongText ? 'long-text' : ''}
    class="${showcaseClass}"
    style="${showcaseStyle}"
  ></dockit-text>
</div>`;
