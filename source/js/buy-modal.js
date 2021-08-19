'use strict';

{
  const TEL_INPUT_VALUE = '+7';
  const TEL_LENGTH = 12;

  const buyButtons = document.querySelectorAll('.button--buy');
  const buyModal = document.querySelector('.modal--buy');
  const closeButton = buyModal.querySelector('.modal__close');
  const modalInner = buyModal.querySelector('.modal__inner');

  const form = modalInner.querySelector('.modal__form');
  const telInput = form.querySelector('.modal__input--tel');
  const mailInput = form.querySelector('.modal__input--email');

  const successModal = document.querySelector('.modal--success');

  let errors = {};
  let user = {};

  // modal manipulation

  const onButtonClickModalOpen = (evt) => {
    evt.preventDefault();
    if (!buyModal.classList.contains('modal--show')) {
      buyModal.classList.add('modal--show');
      window.utilitary.setInputValuesFromLocalStorage(telInput, mailInput);
    }

    document.addEventListener('keydown', onEscModalClose);
  };

  const onEscModalClose = (evt) => {
    window.utilitary.onEscButtonPressModalClose(evt);
  };

  const onCloseButtonModalClose = () => {
    window.utilitary.onCloseButtonModalClose(buyModal);
  };

  const onOuterModalClickCloceModal = (evt) => {
    window.utilitary.onOverLayClickModalClose(buyModal, modalInner, evt);
  };

  // -------------- валидация

  // предотвращает потерю набранного номера при повторном фокусе на инпут
  const onTelInputFocusSetValue = () => {
    if (telInput.value.length < 2) {
      window.utilitary.setInputValue(TEL_INPUT_VALUE, telInput);
    }

    window.utilitary.resetInputError(telInput);
  };

  // обработчик фокуса на инпут почты
  const onEmailInputFocusResetError = () => {
    window.utilitary.resetInputError(mailInput);
  };

  // обработчик изменения данных поля телефона
  const onTelInputChange = () => {
    window.utilitary.validateTelNumber(telInput, errors, TEL_LENGTH);
  };

  // обработчик изменения данных поля почты
  const onEmailInputChange = () => {
    window.utilitary.validateEmail(mailInput, errors);
  };

  // обработчик отправки формы
  const onFormSubmit = (evt) => {
    if (errors.tel || errors.email) {
      evt.preventDefault();
    } else {
      evt.preventDefault();
      successModal.classList.add('modal--show');
      document.addEventListener('keydown', onEscModalClose);
      closeButton.addEventListener('click', onCloseButtonModalClose);
      window.utilitary.setLocalStorage('tel', telInput.value, user);
      window.utilitary.setLocalStorage('email', mailInput.value, user);
      form.reset();
      buyModal.classList.remove('modal--show');
    }
  };

  const onOuterModalClickCloseModal = (evt) => {
    window.utilitary.onOverLayClickModalClose(successModal, modalInner, evt);
  };

  form.addEventListener('submit', onFormSubmit);
  telInput.addEventListener('change', onTelInputChange);
  telInput.addEventListener('blur', onTelInputChange);
  mailInput.addEventListener('change', onEmailInputChange);
  mailInput.addEventListener('blur', onEmailInputChange);
  telInput.addEventListener('focus', onTelInputFocusSetValue);
  mailInput.addEventListener('focus', onEmailInputFocusResetError);
  successModal.addEventListener('click', onOuterModalClickCloseModal);

  // обработчики
  buyModal.addEventListener('click', onOuterModalClickCloceModal);
  buyButtons.forEach((it) => {
    it.addEventListener('click', onButtonClickModalOpen);
  });
  closeButton.addEventListener('click', onCloseButtonModalClose);

}
