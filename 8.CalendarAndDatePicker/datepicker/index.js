const DatePicker = ($container, Calendar) => {
  $container.innerHTML = `<input type="text" class="date-input" readonly placeholder="Select date" />`;
  Calendar($container);

  const $dateInput = $container.querySelector('.date-input');

  window.addEventListener('click', () => {
    const customEvent = new CustomEvent('close');

    $container.dispatchEvent(customEvent);
  });

  $container.addEventListener('click', e => {
    e.stopPropagation();
  });

  $container.addEventListener('select', e => {
    $dateInput.value = e.detail;
    console.log(e.detail);
  });

  $dateInput.addEventListener('click', () => {
    const customEvent = new CustomEvent('open');

    $container.dispatchEvent(customEvent);
  });
};

export default DatePicker;
