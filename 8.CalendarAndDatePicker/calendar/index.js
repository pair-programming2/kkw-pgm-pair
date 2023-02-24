const $link = [...document.querySelectorAll('link')].at(-1);
$link.insertAdjacentHTML('afterend', '<link href="./calendar/style.css" rel="stylesheet" />');

const DAY_OF_THE_WEEK = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
const MONTHS_OF_YEAR = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const TODAY = new Date();
const [TODAY_YEAR, TODAY_MONTH, TODAY_DAY] = [TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate()];

const isToday = ({ year, month, day }) =>
  year === TODAY_YEAR && month === TODAY_MONTH && day === TODAY_DAY ? 'today' : '';

const isSunDay = ({ year, month, day }) => (new Date(year, month, day).getDay() === 0 ? 'sunday' : '');

const getCreatedCalendar = ({ year, month }) => {
  const date = new Date(year, month);
  const [thisYear, thisMonth] = [date.getFullYear(), date.getMonth()];

  const startWeekDay = new Date(thisYear, thisMonth, 1).getDay();

  const [endDay, endWeekDay] = [
    new Date(thisYear, thisMonth + 1, 0).getDate(),
    new Date(thisYear, thisMonth + 1, 0).getDay(),
  ];

  const endDateOfPrevMonth = new Date(thisYear, thisMonth, 0).getDate();

  const lastWeekOfPrevMonth = Array.from(
    { length: startWeekDay },
    (_, i) => endDateOfPrevMonth - (startWeekDay - 1) + i
  );
  const WeeksOfThisMonth = Array.from({ length: endDay }, (_, i) => i + 1);
  const firstWeekOfNextMonth = Array.from({ length: 6 - endWeekDay }, (_, i) => i + 1);

  return {
    WeeksOfThisMonth,
    lastWeekOfPrevMonth,
    firstWeekOfNextMonth,
    year: thisYear,
    month: thisMonth,
  };
};

class Calendar {
  constructor($container) {
    this.$container = $container;
    this.$calendar = document.createElement('div');
    this.state = {
      year: TODAY_YEAR,
      month: TODAY_MONTH,
      selectedDate: [],
    };

    this.$calendar.classList.add('calendar', 'hide');
    this.$calendar.style.setProperty('--calendar-size', '300px');

    this.$container.appendChild(this.$calendar);

    this.addEventHandler();
    this.render();
  }

  isSelect({ year, month, day }) {
    const { selectedDate } = this.state;
    const [_year, _month, _day] = selectedDate;

    return _year === year && _month === month && _day === day ? 'select' : '';
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };

    this.render();
  }

  render() {
    const { lastWeekOfPrevMonth, WeeksOfThisMonth, firstWeekOfNextMonth, year, month } = getCreatedCalendar(this.state);

    const { isSelect } = this;
    const that = this;

    // prettier-ignore
    this.$calendar.innerHTML = `
      <div class="calendar-nav">
        <button type="button" class="btn--prev">◀️</button>
          <div class="date-info">
            <p class="months">${MONTHS_OF_YEAR[month]}</p>
            <span class="year">${year}</span>
          </div>
        <button type="button" class="btn--next">▶️</button>
      </div>
      <div class="calendar-grid">
        ${DAY_OF_THE_WEEK.map(weekDay => `<span class="week-day">${weekDay}</span>`).join('')}
        ${lastWeekOfPrevMonth.map(day => `<span class="blur day ${isSelect.call(that, { year, month, day })}" data-time-seq="prev">${day}</span>`).join('')}
        ${WeeksOfThisMonth.map(day => 
          `<span class="${isToday({year, month, day})} ${isSunDay({year, month, day})} day ${isSelect.call(that, { year, month: month + 1, day })}">
            ${day}
          </span>`
          ).join('')}
        ${firstWeekOfNextMonth.map(day => `<span class="blur day ${isSelect.call(that, { year, month: month + 2, day })}" data-time-seq="next">${day}</span>`).join('')}
      </div>
    `;
  }

  addEventHandler() {
    this.$calendar.addEventListener('click', e => {
      if (!(e.target.matches('.btn--prev') || e.target.matches('.btn--next'))) return;

      const { year, month } = this.state;

      this.setState({
        year,
        month: e.target.matches('.btn--prev') ? month - 1 : month + 1,
      });
    });

    this.$calendar.addEventListener('click', e => {
      if (!e.target.matches('.day')) return;

      const { timeSeq } = e.target.dataset;
      let { month } = this.state;
      const day = e.target.textContent;

      if (timeSeq === 'prev') month -= 1;
      if (timeSeq === 'next') month += 1;

      const outputDate = new Date(this.state.year, month, day);
      const [outputYear, outputMonth, outputDay] = [
        outputDate.getFullYear(),
        outputDate.getMonth(),
        outputDate.getDate(),
      ];

      const customSelectEvent = new CustomEvent('select', {
        detail: `${outputYear}-${(outputMonth + 1 + '').padStart(2, '0')}-${(outputDay + '').padStart(2, '0')}`,
      });

      this.$container.dispatchEvent(customSelectEvent);
      this.close();
    });
  }

  close() {
    this.$calendar.classList.add('hide');
  }

  open(selectedDate) {
    this.$calendar.classList.remove('hide');

    if (!selectedDate.length) return;

    const [year, month] = selectedDate;

    this.setState({
      year,
      month: month - 1,
      selectedDate,
    });
  }
}

export default Calendar;
