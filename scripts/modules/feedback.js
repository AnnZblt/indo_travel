import showModal from './reservationModal.js';
import {
  fetchRequest,
} from '/scripts/modules/fetchRequest.js';


const reservationContainer = document.querySelector('.reservation__container');
const reservationForm = document.querySelector('.reservation__form');
const reservationButton = reservationForm.querySelector('.reservation__button');
const reservationInfo = reservationForm.querySelector('.reservation__info');
const footerContent = document.querySelector('.footer__content');
const footerForm = document.querySelector('.footer__form');
const setDataURL = 'https://jsonplaceholder.typicode.com/posts/';
const dbUrl = './../date.json';
const sentData = {};

const succesReservationContent = () => {
  const reservationContainerSucces = document.createElement('div');
  const reservationTitle = document.createElement('h2');
  const reservationText = document.createElement('p');
  const reservationImage = document.createElement('div');

  reservationContainerSucces.classList.add('reservation__succes');
  reservationTitle.classList.add('reservation__succes-title');
  reservationText.classList.add('reservation__succes-text');
  reservationImage.classList.add('reservation__succes-image');

  reservationTitle.textContent = 'Ваша заявка успешно отправлена';
  reservationText.textContent = 'Наши менеджеры свяжутся с вами в течение 3-х рабочих дней';

  reservationContainerSucces.append(reservationTitle, reservationText, reservationImage);
  reservationContainer.append(reservationContainerSucces);

  return {
    reservationContainerSucces,
  };
};

const errorReservationContent = () => {
  const reservationContainerError = document.createElement('div');
  const reservationTitle = document.createElement('h2');
  const reservationText = document.createElement('p');
  const reservationButton = document.createElement('button');

  reservationContainerError.classList.add('reservation__error');
  reservationTitle.classList.add('reservation__error-title');
  reservationText.classList.add('reservation__error-text');
  reservationButton.classList.add('button', 'reservation__error-button');

  reservationTitle.textContent = 'Упс... Что-то пошло не так';
  reservationText.textContent = 'Не удалось отправить заявку. Пожалуйста, повторите отправку еще раз';
  reservationButton.textContent = 'Забронировать';

  reservationContainerError.append(reservationTitle, reservationText, reservationButton);
  reservationContainer.append(reservationContainerError);

  return {
    reservationContainerError,
    reservationButton,
  };
};

const succesFooterContent = () => {
  const feedbackContainer = document.createElement('div');
  const feedbackTitle = document.createElement('h2');
  const feedbackText = document.createElement('p');

  feedbackContainer.classList.add('feedback__succes');
  feedbackTitle.classList.add('footer__title', 'feedback__succes-title');
  feedbackText.classList.add('feedback__succes-text');

  feedbackTitle.textContent = 'Ваша заявка успешно отправлена';
  feedbackText.textContent = 'Наши менеджеры свяжутся с вами в течении 3-х рабочих дней';

  feedbackContainer.append(feedbackTitle, feedbackText);
  footerContent.append(feedbackContainer);

  return {
    feedbackContainer,
  };
};

const errorFooterContent = () => {
  const feedbackContainer = document.createElement('div');
  const feedbackTitle = document.createElement('h2');
  const feedbackText = document.createElement('p');
  const feedbackButton = document.createElement('button');

  feedbackContainer.classList.add('feedback__error');
  feedbackTitle.classList.add('footer__title', 'feedback__error-title');
  feedbackText.classList.add('feedback__error-text');
  feedbackButton.classList.add('button', 'feedback__error-button');

  feedbackTitle.textContent = 'Не удалось отправить e-mail';
  feedbackText.textContent = 'Произошла ошибка при отправке вашего сообщения';
  feedbackButton.textContent = 'Отправить еще раз';

  feedbackContainer.append(feedbackTitle, feedbackText, feedbackButton);
  footerContent.append(feedbackContainer);

  return {
    feedbackContainer,
    feedbackButton,
  };
};

const errorMessage = () => {
  const errorMessageContainer = document.createElement('div');
  const errorMessage = document.createElement('p');

  errorMessageContainer.classList.add('error__message_container');
  errorMessage.classList.add('error__message_text');
  errorMessage.textContent = 'Пожалуйста, заполните все поля';

  errorMessageContainer.append(errorMessage);
  reservationForm.append(errorMessageContainer);

  setTimeout(() => {
    errorMessageContainer.remove();
  }, 1500);
};

const disableForm = () => {
  reservationForm.reset();
  reservationForm.dates.value = 'Дата путешествия';
  reservationForm.dates.disabled = true;
  reservationForm.people.value = 'Количество человек';
  reservationForm.people.disabled = true;
  reservationForm.resname.disabled = true;
  reservationForm.resphone.disabled = true;
  reservationInfo.textContent = '';
  reservationButton.disabled = true;
};

const succesReservationForm = () => {
  const succesContent = succesReservationContent();
  reservationForm.classList.add('hidden');
  setTimeout(() => {
    succesContent.reservationContainerSucces.remove();
    reservationForm.reset();
    reservationForm.classList.remove('hidden');
    disableForm();
  }, 6000);
};

const errorReservationForm = () => {
  const errorContent = errorReservationContent();
  reservationForm.classList.add('hidden');
  errorContent.reservationButton.addEventListener('click', event => {
    errorContent.reservationContainerError.remove();
    reservationForm.reset();
    reservationForm.classList.remove('hidden');
  });
};

const succesFooterForm = () => {
  const footerContent = succesFooterContent();
  footerForm.classList.add('hidden');
  setTimeout(() => {
    footerContent.feedbackContainer.remove();
    footerForm.reset();
    footerForm.classList.remove('hidden');
  }, 6000);
};

const errorFooterForm = () => {
  const feedbackContent = errorFooterContent();
  footerForm.classList.add('hidden');
  feedbackContent.feedbackButton.addEventListener('click', event => {
    feedbackContent.feedbackContainer.remove();
    footerForm.reset();
    footerForm.classList.remove('hidden');
  });
};

reservationForm.addEventListener('click', async (event) => {
  event.preventDefault();

  if (event.target.classList.contains('reservation__button')) {
    const dates = reservationForm.dates.value;
    const peopleCount = reservationForm.people.value;
    const contactName = reservationForm.resname.value;
    const contactNumber = reservationForm.resphone.value;

    if (!dates || !peopleCount || !contactName || !contactNumber) {
      let startTime = performance.now();
      const duration = 300;
      const errorReservationShake = (timestamp) => {
        const elapsed = timestamp - startTime;

        if (elapsed < duration) {
          const progress = elapsed / duration;
          const angle = Math.sin(progress * Math.PI * 4) * 5;
          reservationForm.style.transform = `translateX(${angle}px)`;
          requestAnimationFrame(errorReservationShake);
        } else {
          reservationForm.style.transform = '';
        }
      };
      errorMessage();
      requestAnimationFrame(errorReservationShake);
      return;
    }

    sentData.dates = dates;
    sentData.peopleCount = peopleCount;
    sentData.contactName = contactName;
    sentData.contactNumber = contactNumber;

    const checkReservation = await fetchRequest(dbUrl, {
      callback: showModal,
    });

    console.log('Чек резервейшон', checkReservation);

    if (checkReservation) {
      fetchRequest(setDataURL, {
        method: 'POST',
        body: {
          title: 'Заявка на бронирование тура',
          body: sentData,
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
    }

    return sentData;
  }
});

footerForm.addEventListener('submit', (event) => {
  event.preventDefault();

  fetchRequest(setDataURL, {
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

export default sentData;
