import DatePicker from '../datepicker/index.js';
import Calendar from '../calendar/index.js';

const $datepickerContainer = document.querySelectorAll('.datepicker-container');
// const $datepickerContainer2 = document.querySelector('.datepicker-container2');

// DatePicker($datepickerContainer, Calendar);

[...$datepickerContainer].forEach($container => {
  new DatePicker($container, Calendar);
});
// new DatePicker($datepickerContainer2, Calendar);
