import '../dockit-showcases.define.js';
import './showcases-stories.css';

export const opacity_classes = () => {
  const classes = [
    'opacity-0',
    'opacity-10',
    'opacity-20',
    'opacity-30',
    'opacity-40',
    'opacity-50',
    'opacity-60',
    'opacity-70',
    'opacity-80',
    'opacity-90',
    'opacity-100',
  ];

  return /*html*/ `
  <dockit-showcases
    checkered-background
    component-class="box"
    showcase-classes="${classes.join(' ')}"
  ></dockit-showcases>`;
};

export const font_size_classes = () => {
  const classes = ['xs', 'sm', 'base', 'lg', 'xl', 'xxl', 'xxxl'];

  return /*html*/ `
    <dockit-showcases
      component-type="text"
      showcase-classes="${classes.join(' ')}"
    ></dockit-showcases>`;
};

export const opacity_styles = () => {
  const styles = [
    'opacity: 0;',
    'opacity: 0.1;',
    'opacity: 0.2;',
    'opacity: 0.3;',
    'opacity: 0.4;',
    'opacity: 0.5;',
    'opacity: 0.6;',
    'opacity: 0.7;',
    'opacity: 0.8;',
    'opacity: 0.9;',
    'opacity: 1;',
  ];

  return /*html*/ `
  <dockit-showcases
    checkered-background
    component-class="box"
    showcase-styles="${styles.join(' ')}"
  ></dockit-showcases>`;
};

export const font_size_styles = () => {
  const styles = [
    'font-size: 12px;',
    'font-size: 14px;',
    'font-size: 16px;',
    'font-size: 18px;',
    'font-size: 20px;',
    'font-size: 24px;',
    'font-size: 30px;',
  ];

  return /*html*/ `
    <dockit-showcases
      component-type="text"
      showcase-styles="${styles.join(' ')}"
    ></dockit-showcases>`;
};
