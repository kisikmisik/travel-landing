'use strict';

{
  const countriesContainer = document.querySelector('.countries-details');
  const tabsLinksContainer = countriesContainer.querySelector('.tabs__list');
  const tabsLinks = countriesContainer.querySelectorAll('.tabs__link');
  const tabsContainer = countriesContainer.querySelector('.countries-details__list');
  const tabs = countriesContainer.querySelectorAll('.countries-details__item');
  const cards = document.querySelectorAll('.countries__link');

  let isUserOnTouchDevice = window.utilitary.isTouchDevise();
  let startEvent = 'click';

  if (isUserOnTouchDevice) {
    startEvent = 'touchstart';
  }

  const activeLinkChange = (i) => {
    let currentLink = tabsLinksContainer.querySelector('.tabs__link--active');

    currentLink.classList.remove('tabs__link--active');
    tabsLinks[i].classList.add('tabs__link--active');
  };

  const closeCurrentTab = () => {
    let currentTab = tabsContainer.querySelector('.countries-details__item--show');
    if (currentTab) {
      currentTab.classList.remove('countries-details__item--show');
    }

  };
  const changeTab = (i) => {
    closeCurrentTab();
    tabs[i].classList.add('countries-details__item--show');
    activeLinkChange(i);
  };

  const onLinkClickTabOpen = (evt) => {
    evt.preventDefault();
    if (evt.target.classList.contains('tabs__link')) {
      let newTabIndex = evt.target.dataset.tab;
      changeTab(newTabIndex);
    }
  };

  const onCountriesLinkClick = (evt) => {
    let tabIndex = evt.currentTarget.dataset.tabindex;
    changeTab(tabIndex);
  };


  cards.forEach((item) => {
    item.addEventListener(startEvent, onCountriesLinkClick);
  });

  tabsLinksContainer.addEventListener(startEvent, onLinkClickTabOpen);
}
