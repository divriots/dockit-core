import styles from './transition-box.module.scss';

export const getTransitionsHtml = (element, props, mode) => {
  function style(name) {
    let rules = [];
    if (mode === 'animation') {
      rules.push(`animation: var(${name}) forwards`);
    } else {
      rules.push('transition-delay: 0');
      rules.push(
        `transition-duration: ${mode === 'time' ? `var(${name})` : '1s'}`
      );
      rules.push('transition-property: margin-left');
      rules.push(
        `transition-timing-function: ${
          mode === 'ease' ? `var(${name})` : 'linear'
        }`
      );
    }

    return rules.join(';');
  }

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

  return /*html*/ `
<div class="${styles.wrapper}">
  <style>
    .clicked { margin-left: 20rem; }
    .no-anim { animation: none !important; }
  </style>
  ${props
    .map(
      ([name, value], i) => /*html*/ `
      <div id="transitionBox${i}"
          class="${styles.box} ${
        mode === 'animation' ? 'no-anim' : ''
      } transitionBox"
          style="${style(name)}"
      >
        <code class="${styles.details}">${name}</code>
        <code class="${styles.details} ${styles['details-sm']}">${value}</code>
      </div>`
    )
    .join('\n')}
</div>`;
};
