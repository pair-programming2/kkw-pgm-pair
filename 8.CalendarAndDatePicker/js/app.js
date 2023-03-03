import DatePicker from '../datepicker/index.js';
import Calendar from '../calendar/index.js';

const $datepickerContainer = document.querySelectorAll('.datepicker-container');

[...$datepickerContainer].forEach($container => {
  // eslint-disable-next-line no-new
  new DatePicker($container, Calendar);
});
