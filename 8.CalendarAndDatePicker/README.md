# 8. Calendar & DataPicker

## 달력 계산하기

렌더할 년도(year)와 월(month)의 달력을 배열 형태로 생성한다.

### 전월의 마지막 주(`lastWeekOfPrevMonth`)

당월 1일의 요일(`startWeekDay`)과 전월의 마지막 날짜(`endDateOfPrevMonth`)을 통해 전월의 마지막 주 달력을 배열로 생성한다.

```js
const startWeekDay = new Date(thisYear, thisMonth, 1).getDay();
// date를 0으로 지정하면 전월의 마지막 날짜를 반환
const endDateOfPrevMonth = new Date(thisYear, thisMonth, 0).getDate();

const lastWeekOfPrevMonth = Array.from({ length: startWeekDay }, (_, i) => endDateOfPrevMonth - (startWeekDay - 1) + i);
```

### 당월(`weeksOfThisMonth`)

당월의 마지막 날짜(`endDay`)를 통해 당월의 달력을 배열로 생성한다.

```js
const [endDay] = [new Date(thisYear, thisMonth + 1, 0).getDate()];

const weeksOfThisMonth = Array.from({ length: endDay }, (_, i) => i + 1);
```

### 익월의 첫째 주(`firstWeekOfNextMonth`)

당월 마지막 날의 요일(`endWeekDay`)을 통해 익월 첫째 주의 달력을 배열로 생성한다.

```js
const [endWeekDay] = [new Date(thisYear, thisMonth + 1, 0).getDate()];

const firstWeekOfNextMonth = Array.from({ length: 6 - endWeekDay }, (_, i) => i + 1);
```

## 날짜 표시하기

### isToday

전달 받은 년, 월, 일과 **오늘**의 년, 월, 일을 비교하여 동일하면 today 클래스를 추가하여 **오늘**을 표시한다.

```js
const TODAY = new Date();
const [TODAY_YEAR, TODAY_MONTH, TODAY_DAY] = [TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate()];

const isToday = ({ year, month, day }) =>
  year === TODAY_YEAR && month === TODAY_MONTH && day === TODAY_DAY ? 'today' : '';
```

### isSunday

전달받은 년, 월, 일을 Date객체의 getDay() 메서드를 사용하여 지정된 날짜의 요일을 비교하여 일요일(`value: 0`)이면 `sunday`클래스를 추가한다.

```js
const isSunDay = ({ year, month, day }) => (new Date(year, month, day).getDay() === 0 ? 'sunday' : '');
```

### Select

년, 월, 일을 `yyyy-mm-dd`형식으로 날짜를 변형하기 위해 `padStart`메서드를 사용했다.
해당 작업은 `calendar.js`에서 처리되므로 `datepicker.js`에서 알 수 없기에 `customEvent`를 사용하여 `datepicker`에 `dispatchEvent`로 이벤트 핸들러를 동기 처리방식으로 호출했다.

```js
const outputDate = new Date(this.state.year, month, day);
const [outputYear, outputMonth, outputDay] = [outputDate.getFullYear(), outputDate.getMonth(), outputDate.getDate()];

const customSelectEvent = new CustomEvent('select', {
  detail: `${outputYear}-${(outputMonth + 1 + '').padStart(2, '0')}-${(outputDay + '').padStart(2, '0')}`,
});

this.$container.dispatchEvent(customSelectEvent);
```

## 리팩토링

`DatePicker`와 `Calendar`를 모두 화살표 함수로 구현했을 때는 `DatePicker`에서 디스패치한 커스텀 이벤트를 `Calendar`에서 받아야 했고 `Calendar`에서 디스패치한 커스텀 이벤트를 `DatePicker` 받아야 했다. 즉, `DatePicker`와 `Calendar`가 서로를 알고 있는 구조이다.

```js
// datepicker.js
$dateInput.addEventListener('click', () => {
  const customEvent = new CustomEvent('open');

  $container.dispatchEvent(customEvent);
});

window.addEventListener('click', () => {
  const customEvent = new CustomEvent('close');

  $container.dispatchEvent(customEvent);
});

$container.addEventListener('select', e => {
  $dateInput.value = e.detail;
  console.log(e.detail);
});
```

`DatePicker`와 `Calendar`를 모두 클래스로 구현하여 `DatePicker`는 `Calendar`를 알고있지만, `Calendar`는 `DatePicker`를 모르는 구조로 변경했다. `Calendar`의 보이기/숨기기 기능을 `Calendar`의 public 메서드로 구현하여 `DatePicker`에서 사용할 수 있도록 했다.

```js
// datepicker.js
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
```

```js
// calendar.js
addEventHandler() {
    // ...
    this.$calendar.addEventListener('click', e => {
        // ...
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
```
