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
  const obj = {
    // Needed for the simba-switch to be themed with bkl yellow
    '--simba-color-primary-50': bklYellow[50],
    '--simba-color-primary-100': bklYellow[100],
    '--simba-color-primary-200': bklYellow[200],
    '--simba-color-primary-300': bklYellow[300],
    '--simba-color-primary-400': bklYellow[400],
    '--simba-color-primary-500': bklYellow[500],
    '--simba-color-primary-600': bklYellow[600],
    '--simba-color-primary-700': bklYellow[700],
    '--simba-color-primary-800': bklYellow[800],
    '--simba-color-primary-900': bklYellow[900],
    '--simba-focus-ring-color': bklYellow[300],
    '--simba-switch-color-hover': `${bklYellow[500]}30`,
    '--simba-switch-color-focus': `${bklYellow[500]}70`,

    // used in other places, at some point we should decide
    // whether we want this globally in all of BKL instead of
    // set as a side effect from mdjs-layout
    '--bkl-color-primary-50': bklYellow[50],
    '--bkl-color-primary-100': bklYellow[100],
    '--bkl-color-primary-200': bklYellow[200],
    '--bkl-color-primary-300': bklYellow[300],
    '--bkl-color-primary-400': bklYellow[400],
    '--bkl-color-primary-500': bklYellow[500],
    '--bkl-color-primary-600': bklYellow[600],
    '--bkl-color-primary-700': bklYellow[700],
    '--bkl-color-primary-800': bklYellow[800],
    '--bkl-color-primary-900': bklYellow[900],
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
