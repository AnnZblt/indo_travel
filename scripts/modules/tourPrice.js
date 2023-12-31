const tourDateInfo = document.querySelector('#tour__date');
const tourPeopleInfo = document.querySelector('#tour__people');
const reservationSelectDate = document.querySelector('#reservation__date');
const reservationSelectPeople = document.querySelector('#reservation__people');
const reservationInfo = document.querySelector('.reservation__info');
const reservationConditions = document.querySelector('.reservation__conditions');
const reservationData = reservationInfo.querySelector('.reservation__data');
const reservationPrice = reservationInfo.querySelector('.reservation__price');
const findTourPrice = document.querySelector('.tour__button');
const peopleDeclension = ['человек', 'человека', 'человек'];
const sharedData = {
  resprice: 0,
};

const wordDeclension = (num, arr) => {
  const cases = [2, 0, 1, 1, 1, 2];
  return arr[(num % 100 > 4 && num % 100 < 20) ?
    2 : cases[(num % 10 < 5) ? num % 10 : 5]];
};

const loadData = async () => {
  const result = await fetch('./../date.json');
  const data = await result.json();

  return data;
};

const fillSelectors = async () => {
  const data = await loadData();

  const fillDateSelect = (selectArea) => {
    data.map(item => {
      const dateOption = document.createElement('option');
      dateOption.value = item.date;
      dateOption.textContent = item.date;
      dateOption.classList.add('tour__option', 'reservation__option');
      selectArea.append(dateOption);
    });
  };

  fillDateSelect(tourDateInfo);
  fillDateSelect(reservationSelectDate);

  const fillPeopleSelect = (selectedDate, selectArea) => {
    const selectedItem = data.find(item => item.date === selectedDate);

    if (selectedItem) {
      const minPeople = selectedItem['min-people'];
      const maxPeople = selectedItem['max-people'];

      for (let i = minPeople; i <= maxPeople; i++) {
        const peopleOption = document.createElement('option');
        peopleOption.value = i;
        peopleOption.textContent = i;
        peopleOption.classList.add('tour__option', 'reservation__option');
        selectArea.append(peopleOption);
      }
    }
  };

  const resetPeopleSelect = (selectArea) => {
    selectArea.innerHTML = '';
    const peopleOption = document.createElement('option');
    peopleOption.value = '';
    peopleOption.textContent = 'Количество человек';
    peopleOption.disabled = true;
    peopleOption.selected = true;
    peopleOption.classList.add('tour__option', 'reservation__option');
    selectArea.append(peopleOption);
  };

  const hideConditions = (reConditions) => {
    reConditions.classList.add('hidden');
  };

  const showConditions = (reConditions, reData, rePrice) => {
    reConditions.classList.remove('hidden');
    reData.textContent = '';
    rePrice.textContent = '0₽';
  };

  const updateReservationResults = async () => {
    const data = await loadData();
    const selectedDate = reservationSelectDate.value;
    const selectedPeopleCount = reservationSelectPeople.value;
    const selectedItem = data.find(item => item.date === selectedDate);

    if (selectedItem) {
      const pricePerPerson = selectedItem.price;
      const totalPrice = pricePerPerson * selectedPeopleCount;

      reservationData.textContent =
        `${selectedDate}, ${selectedPeopleCount} ${wordDeclension(selectedPeopleCount, peopleDeclension)}`;

      reservationPrice.textContent = `${totalPrice}₽`;
      hideConditions(reservationConditions);

      sharedData.resprice = totalPrice;
    } else {
      showConditions(reservationConditions, reservationData, reservationPrice);
    }
  };

  tourDateInfo.addEventListener('change', event => {
    resetPeopleSelect(tourPeopleInfo);
    fillPeopleSelect(event.target.value, tourPeopleInfo);
    resetPeopleSelect(reservationSelectPeople);
    fillPeopleSelect(event.target.value, reservationSelectPeople);
    reservationSelectDate.value = event.target.value;
    updateReservationResults();
  });

  tourPeopleInfo.addEventListener('change', event => {
    reservationSelectPeople.value = event.target.value;
    updateReservationResults();
  });

  findTourPrice.addEventListener('click', event => {
    event.preventDefault();
    window.location.href = '#reservation';
  });

  reservationSelectDate.addEventListener('change', event => {
    resetPeopleSelect(reservationSelectPeople);
    fillPeopleSelect(event.target.value, reservationSelectPeople);
    updateReservationResults();
  });

  reservationSelectPeople.addEventListener('change', event => {
    updateReservationResults();
  });
};

fillSelectors();

export {
  peopleDeclension,
  sharedData,
  wordDeclension,
};
