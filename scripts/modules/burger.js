const burger = () => {
  const headerContainer = document.querySelector('.header__container');
  const burgerButton = document.querySelector('.header__menu-button');
  const burgerMenu = document.querySelector('.header__menu');

  headerContainer.addEventListener('click', (event) => {
    if (event.target === burgerButton) {
      burgerMenu.classList.toggle('header__menu_active');
    } else {
      burgerMenu.classList.remove('header__menu_active');
    }
  });
};

export default burger;
