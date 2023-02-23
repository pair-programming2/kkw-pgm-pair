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

const today = new Date();
const [todayYear, todayMonth, todayDay] = [today.getFullYear(), today.getMonth(), today.getDate()];

const isToday = ({ expressYear, expressMonth, targetDay }) =>
  expressYear === todayYear && expressMonth === todayMonth && targetDay === todayDay;

const isSunDay = ({ expressYear, expressMonth, targetDay }) =>
  new Date(expressYear, expressMonth, targetDay).getDay() === 0;

const getCreatedCalendar = ({ year, month, day }) => {
  const expressDate = new Date(year, month, day);
  const [expressYear, expressMonth, expressDay] = [
    expressDate.getFullYear(),
    expressDate.getMonth(),
    expressDate.getDate(),
  ];

  const startWeekDay = new Date(expressYear, expressMonth, 1).getDay();
  const [endDay, endWeekDay] = [
    new Date(expressYear, expressMonth + 1, 0).getDate(),
    new Date(expressYear, expressMonth + 1, 0).getDay(),
  ];
  const endDateOfPrevMonth = new Date(expressYear, expressMonth, 0).getDate();

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
    expressMonth,
    expressYear,
    expressDay,
  };
};

const Calendar = $container => {
  const $calendar = document.createElement('div');
  $calendar.classList.add('calendar', 'hide');
  $container.appendChild($calendar);

  let state = {
    year: todayYear,
    month: todayMonth,
    day: todayDay,
  };

  // prettier-ignore
  const render = () => {
    const { 
      lastWeekOfPrevMonth, 
      WeeksOfThisMonth, 
      firstWeekOfNextMonth, 
			expressYear,
			expressMonth,
			expressDay,
    } = getCreatedCalendar(state);

// prettier-ignore
    $calendar.innerHTML = `
      <div class="calendar-nav">
        <button type="button" class="btn--prev">◀️</button>
          <div class="date-info">
            <p>${MONTHS_OF_YEAR[expressMonth]}</p>
            <span>${expressYear}</span>
          </div>
        <button type="button" class="btn--next">▶️</button>
      </div>
      <div class="calendar-grid">
        ${DAY_OF_THE_WEEK.map(weekDay => `<span class="blur">${weekDay}</span>`).join('')}
        ${lastWeekOfPrevMonth.map(day => `<span class="blur day" data-year="${expressYear}" data-month="${expressMonth - 1}">${day}</span>`).join('')}
        ${WeeksOfThisMonth.map(day => `<span class="${isToday({expressYear, expressMonth, targetDay: day})? 'today' : ""}${isSunDay({expressYear, expressMonth, targetDay: day}) ? 'sunday' : ''} day" data-year="${expressYear}" data-month="${expressMonth}">${day}</span>`).join('')}
        ${firstWeekOfNextMonth.map(day => `<span class="blur day" data-year="${expressYear}" data-month="${expressMonth + 1}">${day}</span>`).join('')}
      </div>
    `;
  };

  const setState = newState => {
    state = { ...state, ...newState };

    render();
  };

  $container.addEventListener('click', e => {
    if (!(e.target.matches('.btn--prev') || e.target.matches('.btn--next'))) return;

    setState({
      year: state.year,
      month: e.target.matches('.btn--prev') ? state.month - 1 : state.month + 1,
      day: state.day,
    });
  });

  $container.addEventListener('close', () => {
    $calendar.classList.add('hide');
  });

  $container.addEventListener('open', () => {
    $calendar.classList.remove('hide');
  });

  $calendar.addEventListener('click', e => {
    if (!e.target.matches('.day')) return;

    const { year, month } = e.target.dataset;
    const day = e.target.textContent;

    const target = new Date(year, month, day);
    console.log(target);

    const customEvent = new CustomEvent('select', {
      detail: `${target.getFullYear()}-${(target.getMonth() + 1).toString().padStart(2, '0')}-${target
        .getDate()
        .toString()
        .padStart(2, '0')}`,
    });

    $container.dispatchEvent(customEvent);
  });

  render();
};

export default Calendar;
