import {
  fetchRequest,
} from '/scripts/modules/fetchRequest.js';

const reservationForm = document.querySelector('.reservation__form');
const reservationFormTitle = reservationForm.querySelector('.reservation__title');
const reservationInputs = reservationForm.querySelector('.reservation__inputs');
const reservationContacts = reservationForm.querySelector('.reservation__contacts');
const reservationBottom = reservationForm.querySelector('.reservation__bottom');
const reservationBottomInfo = reservationForm.querySelector('.reservation__info');
const reservationButton = reservationForm.querySelector('.reservation__button');

const footerForm = document.querySelector('.footer__form');
const footerFormTitle = footerForm.querySelector('.footer__form-title');
const footerText = footerForm.querySelector('.footer__text');
const footerInputWrap = footerForm.querySelector('.footer__input-wrap');
const footerInput = footerForm.querySelector('.footer__input');

const URL = 'https://jsonplaceholder.typicode.com/posts/';

const succesReservationForm = () => {
  reservationInputs.classList.add('hidden');
  reservationContacts.classList.add('hidden');
  reservationBottom.classList.add('hidden');
  reservationButton.classList.add('hidden');
  reservationFormTitle.textContent = 'Ваша заявка успешно отправлена';

  const succesReservationText = document.createElement('p');
  succesReservationText.textContent = 'Наши менеджеры свяжутся с вами в течение 3-х рабочих дней';
  succesReservationText.classList.add('reservation__succes');

  const succesImage = document.createElement('div');
  succesImage.classList.add('reservation__succes-image');

  reservationForm.append(succesReservationText, succesImage);
};

const errorReservationForm = () => {
  reservationInputs.classList.add('hidden');
  reservationContacts.classList.add('hidden');
  reservationBottomInfo.classList.add('hidden');
  reservationBottom.classList.add('reservation__bottom-error');
  reservationFormTitle.textContent = 'Упс... Что-то пошло не так';

  const errorReservationText = document.createElement('p');
  errorReservationText.textContent = 'Не удалось отправить заявку. Пожалуйста, повторите отправку еще раз';
  errorReservationText.classList.add('reservation__error');
  reservationButton.disabled = true;

  reservationForm.append(errorReservationText);
};

reservationForm.addEventListener('submit', (event) => {
  event.preventDefault();

  fetchRequest(URL, {
    method: 'POST',
    body: {
      title: 'Заявка на бронирование тура',
      body: {
        dates: reservationForm.dates.value,
        people: reservationForm.people.value,
        nameContact: reservationForm.resname.value,
        phoneNumber: reservationForm.resphone.value,
        tourPrice: reservationForm.resprice,
      },
    },
    callback(err, data) {
      if (err) {
        console.warn(err, data);
        errorReservationForm();
        return;
      } else {
        succesReservationForm();
      }
    },
    headers: {
      'Content-Type': 'application/json',
    },
  });
});

const succesFooterForm = () => {
  footerInputWrap.classList.add('hidden');
  footerInput.classList.add('hidden');
  footerFormTitle.textContent = 'Ваша заявка успешно отправлена';
  footerText.textContent = 'Наши менеджеры свяжутся с вами в течение 3-х рабочих дней';
};

const errorFooterForm = () => {
  footerInputWrap.classList.add('hidden');
  footerInput.classList.add('hidden');
  footerFormTitle.textContent = 'Не удалось отправить e-mail';
  footerText.textContent = 'Произошла ошибка при отправке вашего сообщения';
};

footerForm.addEventListener('submit', (event) => {
  event.preventDefault();

  fetchRequest(URL, {
    method: 'POST',
    body: {
      title: 'E-mail для обратной связи по вопросам по туру',
      body: footerForm.feedback.value,
    },
    callback(err, data) {
      if (err) {
        console.warn(err, data);
        errorFooterForm();
      } else {
        succesFooterForm();
      }
    },
    headers: {
      'Content-Type': 'application/json',
    },
  });
});
