const styles = /*css*/ `.transition-box-label {
  font-family: monospace;
  margin: 0.125rem;
  font-size: 0.75rem;
  color: #fff;
}

.transition-box-label-sm {
  font-size: 0.55rem;
}

.transition-box-wrapper {
  display: flex;
  flex-direction: column;
}

.transition-box {
  cursor: pointer;
  height: 6rem;
  width: 12rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid #fff;
  border-radius: 0.375rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  background-color: #6366f1;
}
`;

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
  <style>${styles}</style>
<div class="transition-box-wrapper">
  <style>
    .clicked { margin-left: 20rem; }
    .no-anim { animation: none !important; }
  </style>
  ${props
    .map(
      ([name, value], i) => /*html*/ `
      <div id="transitionBox${i}"
          class="transition-box ${
            mode === 'animation' ? 'no-anim' : ''
          } transitionBox"
          style="${style(name)}"
      >
        <div class="transition-box-label">${name}</div>
        <div class="transition-box-label transition-box-label-sm">${value}</div>
      </div>`
    )
    .join('\n')}
</div>`;
};
