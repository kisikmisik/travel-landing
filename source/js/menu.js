'use strict';

{
  const header = document.querySelector('.page-header');
  const toggler = header.querySelector('.toggler');
  const menu = header.querySelector('.page-nav');

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
    menu.classList.contains('page-nav--opened') ?
      menu.classList.remove('page-nav--opened') :
      menu.classList.add('page-nav--opened');
  };

  const onTogglerClickMenuToggle = () => {
    toggleTogglerState();
    toggleMenuState();
  };

  const onLinkClickCloseMenu = (evt) => {
    if (evt.target.classList.contains('page-nav__link')) {
      onTogglerClickMenuToggle();
    }
  };

  toggler.addEventListener('click', onTogglerClickMenuToggle);
  menu.addEventListener('click', onLinkClickCloseMenu);


  // скрывает меню при работающем js
  if (header.classList.contains('page-header--nojs')) {
    header.classList.remove('page-header--nojs');
  }

}
