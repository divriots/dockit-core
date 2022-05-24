export const getCaption = (showcaseClass?: string, showcaseStyle?: string) => {
  if (showcaseClass) {
    return showcaseClass;
  } else if (showcaseStyle) {
    return getValue(showcaseStyle);
  } else {
    return '';
  }
};

export const getValue = (style: string) => {
  const [_, val] = style.split(':');
  return (val || '').trim().replace(/var\(|\)/gi, '');
};
