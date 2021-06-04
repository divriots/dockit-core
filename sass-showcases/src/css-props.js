import uniqBy from 'lodash/uniqBy';

const getAllCSSCustomProps = () => {
  const isSameDomain = (styleSheet) =>
    !styleSheet.href || styleSheet.href.indexOf(window.location.origin) === 0;

  const sheets = [...document.styleSheets].filter(isSameDomain);

  const isCustomProperty = ([propName]) => propName.indexOf('--') === 0;

  const getRuleProps = (rule) =>
    [...rule.style]
      .map((propName) => [
        propName.trim(),
        rule.style.getPropertyValue(propName).trim(),
      ])
      .filter(isCustomProperty);

  const isStyleRule = (rule) => rule.type === 1;

  const getAllProps = (sheet) =>
    [...sheet.cssRules]
      .filter(isStyleRule)
      .reduce((all, rule) => all.concat(getRuleProps(rule)), []);

  const allProps = sheets.reduce(
    (all, sheet) => all.concat(getAllProps(sheet)),
    []
  );
  return uniqBy(allProps, ([name]) => name);
};

export const getCssCustomProps = (prefix = '') =>
  getAllCSSCustomProps().filter(([name]) => name.startsWith(prefix));
