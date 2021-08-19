'use strict';

{
  const container = document.querySelector('.tabs');
  const list = container.querySelector('.tabs__list');

  // проверка на тач-устройство
  let isTouchCapable = 'ontouchstart' in window ||
    window.DocumentTouch && document instanceof window.DocumentTouch ||
    navigator.maxTouchPoints > 0 ||
    window.navigator.msMaxTouchPoints > 0;

  // drag'n'drop для мыши. При ширине меньше 1024px некоторые элементы списка скрываются, список получает позиционирование relative, на бОльших ширинах drag'n'drop не работает, все элементы видны.

  list.addEventListener('mousedown', (evt) => {
    evt.preventDefault();
    let shiftX = evt.clientX - list.getBoundingClientRect().left;

    const onMouseMoove = (mooveEvt) => {
      let newLeft = mooveEvt.clientX - shiftX - container.getBoundingClientRect().left;
      list.style.left = newLeft + 'px';
    };

    const onMouseUp = (upEvt) => {
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mousemove', onMouseMoove);
    };

    document.addEventListener('mousemove', onMouseMoove);
    document.addEventListener('mouseup', onMouseUp);
  });

  if (isTouchCapable) {
    list.addEventListener('touchstart', (touchEvt) => {

      touchEvt.preventDefault();
      let shiftX = touchEvt.touches[0].clientX - list.getBoundingClientRect().left;

      const onMouseMoove = (moveTouchEvt) => {
        let newLeft = moveTouchEvt.touches[0].clientX - shiftX - container.getBoundingClientRect().left;
        list.style.left = newLeft + 'px';
      };

      const onMouseUp = (endTouchEvt) => {
        document.removeEventListener('touchend', onMouseUp);
        document.removeEventListener('touchmove', onMouseMoove);
      };

      document.addEventListener('touchmove', onMouseMoove);
      document.addEventListener('touchend', onMouseUp);
    });
  }

}
