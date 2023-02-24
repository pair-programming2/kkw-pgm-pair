const $link = [...document.querySelectorAll('link')].at(-1);
$link.insertAdjacentHTML('afterend', '<link href="./datepicker/style.css" rel="stylesheet" />');

class DatePicker {
  constructor($container, Calendar) {
    this.$container = $container;
    this.$datePicker = document.createElement('input');
    this.$container.appendChild(this.$datePicker);
    [this.$datePicker.type, this.$datePicker.readOnly, this.$datePicker.placeholder] = ['text', true, 'Select date'];

    this.calendar = new Calendar($container);

    this.addEventHandler();
  }

  addEventHandler() {
    window.addEventListener('click', () => {
      this.calendar.close();
    });

    this.$container.addEventListener('click', e => {
      e.stopPropagation();
    });

    this.$container.addEventListener('select', e => {
      this.$datePicker.value = e.detail;
    });

    this.$datePicker.addEventListener('click', () => {
      const { value } = this.$datePicker;

      this.calendar.open(value === '' ? [] : value.split('-').map(Number));
    });
  }
}

export default DatePicker;
