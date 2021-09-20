/**
 * This is currently how you would set a custom simba theme
 */
const bklYellow = {
  50: `#191301`,
  100: `#322701`,
  200: `#643E03`,
  300: `#957504`,
  400: `#C69C06`,
  500: `#F8C307`,
  600: `#F9CF39`,
  700: `#FBDB6A`,
  800: `#FCE79C`,
  900: `#FEF3CD`,
};

let hasSetGlobalTransition = false;

export const setBklTheme = () => {
  const primaryColors = (prefix) =>
    Object.entries(bklYellow).reduce((acc, curr, index) => {
      // --foo-color-primary-500: '#F8C307'
      acc[`--${prefix}-color-primary-${curr[0]}`] = curr[1];
      return acc;
    }, {});

  const obj = {
    ...primaryColors('bkl'),
    ...primaryColors('simba'),
    '--simba-focus-ring-color': bklYellow[300],
    '--simba-switch-color-hover': `${bklYellow[500]}30`,
    '--simba-switch-color-focus': `${bklYellow[500]}70`,
  };

  for (let [key, value] of Object.entries(obj)) {
    document.documentElement.style.setProperty(key, value);
  }

  if (!hasSetGlobalTransition) {
    const styleSheet = document.createElement('style');
    styleSheet.innerText = `
      html {
        transition: var(--theme-transition);
      }
    `;
    document.head.appendChild(styleSheet);
    hasSetGlobalTransition = true;
  }
};
