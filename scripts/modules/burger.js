const burger = () => {
  const body = document.querySelector('body');
  const burgerButton = document.querySelector('.header__menu-button');
  const burgerMenu = document.querySelector('.header__menu');

  body.addEventListener('click', (event) => {
    if (event.target === burgerButton) {
      burgerMenu.classList.toggle('header__menu_active');
    } else if (event.target !== burgerMenu &&
      !event.target.classList.contains('header__item') &&
      !event.target.classList.contains('header__list')) {
      burgerMenu.classList.remove('header__menu_active');
    }
  });
};

export default burger;
