export const getCaption = (showcaseClass, showcaseStyle) => {
  if (showcaseClass) return showcaseClass;
  return getValue(showcaseStyle);
};

export const getValue = (style) => {
  const [_, val] = style.split(':');
  return (val || '').trim();
};
