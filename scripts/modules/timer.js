const beginTimer = () => {
  const nominativeUnits = [1, 21, 31, 41, 51];
  const genitiveUnits =
    [2, 3, 4, 22, 23, 24, 32, 33, 34, 42, 43, 44, 52, 53, 54];

  const timerDays = document.querySelector('.timer__count_days');
  const timerHours = document.querySelector('.timer__count_hours');
  const timerMinutes = document.querySelector('.timer__count_minutes');
  const daysUnits = document.querySelector('.timer__units_days');
  const hoursUnits = document.querySelector('.timer__units_hours');
  const minutesUnits = document.querySelector('.timer__units_minutes');
  const deadline =
    document.querySelector('.timer').getAttribute('data-timer-deadline');
  const promotionText = document.querySelector('.hero__text');
  const promotionTimer = document.querySelector('.hero__timer');

  const getTimeRemaining = () => {
    const dateStop = new Date(deadline).getTime();
    const dateNow = Date.now();
    const timeRemaining = dateStop - dateNow;

    const minutes = Math.floor(timeRemaining / 1000 / 60 % 60);
    const hours = Math.floor(timeRemaining / 1000 / 60 / 60 % 24);
    const days = Math.floor(timeRemaining / 1000 / 60 / 60 / 24);

    return {
      timeRemaining,
      minutes,
      hours,
      days,
    };
  };

  const startTimer = () => {
    const timer = getTimeRemaining();

    timerDays.textContent = timer.days;
    timerHours.textContent = timer.hours;
    timerMinutes.textContent = timer.minutes;

    const intervalId = setTimeout(startTimer, 1000);


    if (timer.hours < 10) {
      timerHours.textContent = '0' + timer.hours;
    }

    if (timer.minutes < 10) {
      timerMinutes.textContent = '0' + timer.minutes;
    }

    if (nominativeUnits.includes(timer.days)) {
      daysUnits.textContent = 'день';
    } else {
      daysUnits.textContent = 'дней';
    }

    if (nominativeUnits.includes(timer.hours)) {
      hoursUnits.textContent = 'час';
    } else {
      hoursUnits.textContent = 'часов';
    }

    if (nominativeUnits.includes(timer.minutes)) {
      minutesUnits.textContent = 'минута';
    } else {
      minutesUnits.textContent = 'минут';
    }

    if (genitiveUnits.includes(timer.days)) {
      daysUnits.textContent = 'дня';
    }

    if (genitiveUnits.includes(timer.hours)) {
      hoursUnits.textContent = 'часа';
    }

    if (genitiveUnits.includes(timer.minutes)) {
      minutesUnits.textContent = 'минуты';
    }

    if (timer.timeRemaining <= 0) {
      clearInterval(intervalId);
      promotionText.remove();
      promotionTimer.remove();
    }
  };

  startTimer();
};

export default beginTimer;
