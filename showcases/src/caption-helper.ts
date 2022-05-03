export const getCaption = (showcaseClass: string, showcaseStyle: string) => {
  if (showcaseClass) return showcaseClass;
  return getValue(showcaseStyle);
};

export const getValue = (style: string) => {
  const [_, val] = style.split(':');
  return (val || '').trim().replace(/var\(|\)/gi, '');
};
