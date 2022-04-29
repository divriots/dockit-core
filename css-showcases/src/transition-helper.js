import styles from './transition-box.module.scss';

export const getTransitionsHtml = (element, props, mode) => {
  const style = (name) => {
    if (mode === 'animation') {
      return `animation: var(${name}) forwards`;
    } else {
      return `
        transition-delay: 0;
        transition-duration: ${mode === 'time' ? `var(${name})` : '1s'};
        transition-property: margin-left';
        transition-timing-function: ${
          mode === 'ease' ? `var(${name})` : 'linear'
        };`;
    }
  };

  setTimeout(() => {
    const boxes = element.querySelectorAll('.transitionBox');
    const toggle = mode === 'animation' ? 'no-anim' : 'clicked';
    boxes.forEach((box) =>
      box.addEventListener('click', () => {
        if (box.className.includes(toggle))
          box.className = box.className.replace(` ${toggle}`, '');
        else box.className = `${box.className} ${toggle}`;
      })
    );
  }, 300);

  const getAnimationMode = () => (mode === 'animation' ? 'no-anim' : '');

  const boxWidth = '12rem';

  return /*html*/ `
    <div class="${styles.boxesContainer}">
      <style>
        .clicked { margin-left: calc(100% - ${boxWidth}); }
        .no-anim { animation: none !important; }
      </style>
      ${props
        .map(
          ([name, value], i) => /*html*/ `
          <div id="transitionBox${i}"
              class="${styles.box} ${getAnimationMode()} transitionBox"
              style="width: ${boxWidth}; ${style(name)}"
          >
            <div class="${styles.boxLabel}">${name}</div>
            <div class="${styles.boxLabel} ${
            styles.boxLabelSmall
          }">${value}</div>
          </div>`
        )
        .join('\n')}
    </div>`;
};
