import styles from './transition-box.module.scss';

export const getTransitionsHtml = (props) => {
  setTimeout(() => {
    const boxes = document.querySelectorAll('.transitionBox');

    boxes.forEach((box) =>
      box.addEventListener('click', () => {
        if (box.className.includes('clicked'))
          box.className = box.className.replace(' clicked', '');
        else box.className = `${box.className} clicked`;
      })
    );
  }, 300);

  return /*html*/ `
<div class="${styles.wrapper}">
  <style>
    .clicked { margin-left: 20rem; }
  </style>
  ${props
    .map(
      ([name, value], i) => /*html*/ `
      <div id="transitionBox${i}"
          class="${styles.box} transitionBox"
          style="transition: all var(${name}) ease 0s;"
      >
        <code class="${styles.details}">${name}</code>
        <code class="${styles.details}">${value}</code>
      </div>`
    )
    .join('\n')}
</div>`;
};
