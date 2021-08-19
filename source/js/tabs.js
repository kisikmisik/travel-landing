'use strict';

{
  const container = document.querySelector('.directions');
  const linksContainer = container.querySelector('.tabs__list');
  const links = container.querySelectorAll('.tabs__link');
  const tabsContainer = container.querySelector('.directions__list');
  const tabs = container.querySelectorAll('.directions__item');
  const cards = document.querySelectorAll('.places__link');

  // проверка устройства на поддержку тач событий
  let isTouchCapable = window.utilitary.isTouchDevise();
  let startEvent = 'click';

  // если проверка успешна, заменяем событие клика на тач-событие
  if (isTouchCapable) {
    startEvent = 'touchstart';
  }

  // закрывает текущую вкладку
  const closeCurrentTab = () => {
    let currentTab = tabsContainer.querySelector('.directions__item--show');

    if (currentTab) {
      currentTab.classList.remove('directions__item--show');
    }

  };

  // изменяет активный таб
  const activeLinkChange = (index) => {
    let currentLink = linksContainer.querySelector('.tabs__link--active');

    currentLink.classList.remove('tabs__link--active');
    links[index].classList.add('tabs__link--active');
  };

  // меняет содержимое таба
  const changeTab = (index) => {
    closeCurrentTab();
    tabs[index].classList.add('directions__item--show');
    activeLinkChange(index);
  };

  // обработчик клика по табу, открывает содержимое таба
  const onLinkClickTabOpen = (evt) => {
    evt.preventDefault();
    if (evt.target.classList.contains('tabs__link')) {
      let newTabIndex = evt.target.dataset.tab;
      changeTab(newTabIndex);
    }
  };

  // переход к подробной информации при клике на изображение тура
  const onPlacesLinkClickTabOpen = (evt) => {
    let tabIndex = evt.currentTarget.dataset.tabindex;
    changeTab(tabIndex);
  };

  //

  cards.forEach((it) => {
    it.addEventListener(startEvent, onPlacesLinkClickTabOpen);
  });

  linksContainer.addEventListener(startEvent, onLinkClickTabOpen);

}
