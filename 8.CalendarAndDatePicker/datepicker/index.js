const $link = [...document.querySelectorAll('link')].at(-1);
$link.insertAdjacentHTML('afterend', '<link href="./datepicker/style.css" rel="stylesheet" />');

class DatePicker {
  #$container = null;

  #$datePicker = null;

  #calendar = null;

  constructor($container, Calendar) {
    this.#$container = $container;
    this.#$datePicker = document.createElement('input');

    [this.#$datePicker.type, this.#$datePicker.readOnly, this.#$datePicker.placeholder] = ['text', true, 'Select date'];

    this.#$container.appendChild(this.#$datePicker);

    this.#calendar = new Calendar($container);

    this.#addEventHandler();
  }

  #addEventHandler() {
    window.addEventListener('click', e => {
      if (this.#$container.contains(e.target)) return;
      this.#calendar.close();
    });

    this.#$container.addEventListener('choose', e => {
      this.#$datePicker.value = e.detail;
    });

    this.#$datePicker.addEventListener('click', () => {
      const { value } = this.#$datePicker;

      this.#calendar.open(value === '' ? [] : value.split('-').map(Number));
    });
  }
}

export default DatePicker;
