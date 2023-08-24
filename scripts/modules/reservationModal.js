import loadStyle from './loadStyles.js';
import {
  peopleDeclension,
  sharedData,
  wordDeclension,
} from './tourPrice.js';
import sentData from './feedback.js';

const showModal = async (err, data) => {
  await loadStyle('css/modal.css');
  const tourPrice = sharedData.resprice;
  const resData = sentData;

  const overlay = document.createElement('div');
  const modalWindow = document.createElement('div');
  const title = document.createElement('h2');
  const peopleCount = document.createElement('p');
  const dates = document.createElement('p');
  const price = document.createElement('p');
  const btnWrapper = document.createElement('div');
  const confirm = document.createElement('button');
  const edit = document.createElement('button');

  overlay.classList.add('overlay', 'overlay__confirm');
  modalWindow.classList.add('modal');

  title.classList.add('modal__title');
  title.textContent = 'Подтверждение заявки';

  peopleCount.classList.add('modal__text');
  peopleCount.textContent =
    `Бронирование путешествия в Индонезию, ${resData.peopleCount} ${wordDeclension(resData.peopleCount, peopleDeclension)}`;
  dates.classList.add('modal__text');
  dates.textContent = `В даты: ${resData.dates} `;
  price.classList.add('modal__text');
  price.textContent = `Стоимость тура ${tourPrice}₽`;

  btnWrapper.classList.add('modal__button');
  confirm.classList.add('modal__btn', 'modal__btn_confirm');
  confirm.textContent = 'Подтверждаю';
  edit.classList.add('modal__btn', 'modal__btn_edit');
  edit.textContent = 'Изменить данные';

  btnWrapper.append(confirm, edit);
  modalWindow.append(title, peopleCount, dates, price, btnWrapper);
  overlay.append(modalWindow);

  document.body.append(overlay);

  return new Promise(resolve => {
    edit.addEventListener('click', () => {
      overlay.remove();
      resolve(false);
    });

    confirm.addEventListener('click', () => {
      overlay.remove();
      resolve(true);
    });
  });
};

export default showModal;
