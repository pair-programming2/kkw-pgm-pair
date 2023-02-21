const AnalogClock = $analogClock => {
  // prettier-ignore
  $analogClock.innerHTML=`
    <div class="hand hour"></div>
    <div class="hand minute"></div>
    <div class="hand second"></div>
    <div class="time time1">|</div>
    <div class="time time2">|</div>
    <div class="time time3">|</div>
    <div class="time time4">|</div>
    <div class="time time5">|</div>
    <div class="time time6">|</div>
    <div class="time time7">|</div>
    <div class="time time8">|</div>
    <div class="time time9">|</div>
    <div class="time time10">|</div>
    <div class="time time11">|</div>
    <div class="time time12">|</div>
  `
  const [$handHour, $handMinute, $HandSecond] = $analogClock.querySelectorAll('.hand');

  setInterval(() => {
    const date = new Date();
    const [hour, minute, second] = [date.getHours(), date.getMinutes(), date.getSeconds()];

    $handHour.style.setProperty('--deg', (hour + minute / 60 + second / 3600) * 30);
    $handMinute.style.setProperty('--deg', (minute + second / 60) * 6);
    $HandSecond.style.setProperty('--deg', second * 6);
  }, 1000);
};

export default AnalogClock;
