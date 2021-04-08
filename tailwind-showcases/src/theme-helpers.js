const getSuffixes = (key, value) => {
  if (typeof value === 'string' || Array.isArray(value)) {
    if (key === 'DEFAULT') return [''];
    return [`-${key}`];
  }
  return Object.entries(value).flatMap(([k, v]) =>
    getSuffixes(k, v).map((s) => (!!key ? `-${key}${s}` : s))
  );
};

export const extractClassSuffixes = (key, theme) => {
  if (!theme[key]) return [];
  return getSuffixes('', theme[key]);
};
