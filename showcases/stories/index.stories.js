import '../index.js';
import './showcases-stories.css';

export const opacity = () => {
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
    component-class="box"
    showcase-classes="${classes.join(' ')}"
  ></dockit-showcases>`;
};

export const fontSize = () => {
  const classes = ['xs', 'sm', 'base', 'lg', 'xl', 'xxl', 'xxxl'];

  return /*html*/ `
    <dockit-showcases
      component-type="text"
      showcase-classes="${classes.join(' ')}"
    ></dockit-showcases>`;
};
