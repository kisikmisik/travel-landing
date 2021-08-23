'use strict';

{
  const header = document.querySelector('.main-header');
  const toggler = header.querySelector('.toggler');
  const menu = header.querySelector('.main-nav');

  const toggleTogglerState = () => {
    if (!toggler.classList.contains('toggler--active')) {
      toggler.classList.add('toggler--active');
      toggler.setAttribute('aria-expanded', true);
    } else {
      toggler.classList.remove('toggler--active');
      toggler.setAttribute('aria-expanded', false);
    }
  };

  const toggleMenuState = () => {
    menu.classList.contains('main-nav--opened') ?
      menu.classList.remove('main-nav--opened') :
      menu.classList.add('main-nav--opened');
  };

  const onTogglerClickMenuToggle = () => {
    toggleTogglerState();
    toggleMenuState();
  };

  const onLinkClickCloseMenu = (evt) => {
    if (evt.target.classList.contains('main-nav__link')) {
      onTogglerClickMenuToggle();
    }
  };

  toggler.addEventListener('click', onTogglerClickMenuToggle);
  menu.addEventListener('click', onLinkClickCloseMenu);


  // скрывает меню при работающем js
  if (header.classList.contains('main-header--nojs')) {
    header.classList.remove('main-header--nojs');
  }

}
