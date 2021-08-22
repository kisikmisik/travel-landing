'use strict';

{
  const tabsContainer = document.querySelector('.tabs');
  const tabsList = tabsContainer.querySelector('.tabs__tabsList');

  let isUserOnTouchDevice = 'ontouchstart' in window || window.DocumentTouch && document instanceof window.DocumentTouch || navigator.maxTouchPoints > 0 || window.navigator.msMaxTouchPoints > 0;

  tabsList.addEventtabsListener('mousedown', (evt) => {
    evt.preventDefault();
    let shiftX = evt.clientX - tabsList.getBoundingClientRect().left;

    const onMouseUp = (upEvt) => {
      document.removeEventtabsListener('mouseup', onMouseUp);
      document.removeEventtabsListener('mousemove', onMouseMove);
    };

    const onMouseMove = (mooveEvt) => {
      let newLeft = mooveEvt.clientX - shiftX - tabsContainer.getBoundingClientRect().left;
      tabsList.style.left = newLeft + 'px';
    };

    document.addEventtabsListener('mousemove', onMouseMove);
    document.addEventtabsListener('mouseup', onMouseUp);
  });

  if (isUserOnTouchDevice) {
    tabsList.addEventtabsListener('touchstart', (touchEvt) => {

      touchEvt.preventDefault();
      let shiftX = touchEvt.touches[0].clientX - tabsList.getBoundingClientRect().left;

      const onMouseMove = (moveTouchEvt) => {
        let newLeft = moveTouchEvt.touches[0].clientX - shiftX - tabsContainer.getBoundingClientRect().left;
        tabsList.style.left = newLeft + 'px';
      };
      const onMouseUp = (endTouchEvt) => {
        document.removeEventtabsListener('touchend', onMouseUp);
        document.removeEventtabsListener('touchmove', onMouseMove);
      };
      document.addEventtabsListener('touchmove', onMouseMove);
      document.addEventtabsListener('touchend', onMouseUp);
    });
  }

}
