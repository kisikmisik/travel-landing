'use strict';

{
  const ESC_BUTTON = 'Escape';
  const EMAIL_REG = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

  // устанавливает дефолтное значение инпута
  const setInputValue = (string, input) => {
    input.value += string;
  };

  // ------------- localstorage

  const setLocalStorage = (key, value, userObj) => {
    userObj[key] = value;
    localStorage.setItem('user', JSON.stringify(userObj));
  };

  const getLocalStorageValue = (key) => {
    return JSON.parse(localStorage.getItem(key));
  };

  const setInputValuesFromLocalStorage = (telInput, emailInput) => {
    let data = getLocalStorageValue('user');

    if (data) {
      telInput.value = data.tel;
      emailInput.value = data.email;
    }
  };

  // ------------- модалки

  const onEscButtonPressModalClose = (evt) => {
    let currentActiveModal = document.querySelector('.popup--show');

    if (evt.key === ESC_BUTTON && currentActiveModal) {
      currentActiveModal.classList.remove('modal--show');
      document.removeEventListener('keydown', onEscButtonPressModalClose);
    }
  };

  const onCloseButtonModalClose = (modal) => {
    if (modal.classList.contains('modal--show')) {
      modal.classList.remove('modal--show');
    }
  };

  const onOverLayClickModalClose = (overlay, innerModal, evt) => {
    if (evt.target === overlay && evt.target !== innerModal) {
      overlay.classList.remove('modal--show');
    }
  };

  // ------------- валидация

  // сброс стилей ошибки
  const resetInputError = (input) => {
    if (input.previousElementSibling.classList.contains('form__error--show')) {
      input.previousElementSibling.classList.remove('form__error--show');
    }

    if (input.classList.contains('form__input--invalid')) {
      input.classList.remove('form__input--invalid');
    }

    if (input.classList.contains('modal__input--invalid')) {
      input.classList.remove('modal__input--invalid');
    }
  };

  // установка стилей ошибки
  const setErrorStyle = (input) => {
    if (input.classList.contains('modal__input')) {
      input.classList.add('modal__input--invalid');
    } else {
      input.classList.add('form__input--invalid');
    }

    input.previousElementSibling.classList.add('form__error--show');
  };

  // валидация поля телефона
  const validateTelNumber = (input, errors, telLegth) => {
    let value = input.value;
    if (value.length !== telLegth) {
      setErrorStyle(input);
      errors.tel = 'wrong telephone number';
    } else {
      delete errors.tel;
    }
  };

  // валидация поля почты
  const validateEmail = (input, errors) => {
    let value = input.value;

    if (!EMAIL_REG.test(value) && value.length !== 0) {
      setErrorStyle(input);
      errors.email = 'wrong email';
    } else {
      delete errors.email;
    }
  };

  // проверка устройства на поддержку тач событий
  const isTouchDevise = () => {
    return 'ontouchstart' in window ||
      window.DocumentTouch && document instanceof window.DocumentTouch ||
      navigator.maxTouchPoints > 0 ||
      window.navigator.msMaxTouchPoints > 0;
  };

  window.utilitary = {
    setInputValuesFromLocalStorage: setInputValuesFromLocalStorage,
    onEscButtonPressModalClose: onEscButtonPressModalClose,
    onCloseButtonModalClose: onCloseButtonModalClose,
    onOverLayClickModalClose: onOverLayClickModalClose,
    resetInputError: resetInputError,
    setErrorStyle: setErrorStyle,
    setInputValue: setInputValue,
    validateTelNumber: validateTelNumber,
    validateEmail: validateEmail,
    setLocalStorage: setLocalStorage,
    isTouchDevise: isTouchDevise
  };

}
