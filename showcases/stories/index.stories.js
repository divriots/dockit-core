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
    <div>
      <dockit-showcases
        data-showcase-classes=${classes.join(',')}
        data-component-class='box'
      />
    </div>
  `;
};

export const fontSize = () => {
  const classes = ['xs', 'sm', 'base', 'lg', 'xl', 'xxl', 'xxxl'];

  return /*html*/ `
    <div>
      <dockit-showcases
        data-component-type="text"
        data-showcase-classes=${classes.join(',')}
      />
    </div>
  `;
};
