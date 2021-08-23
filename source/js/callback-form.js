'use strict';

{
  const TEL_LENGTH = 12;
  const TEL_INPUT_VALUE = '+7';


  const form = document.querySelector('.form');
  const formTelInput = form.querySelector('#tel');
  const formEmailInput = form.querySelector('#email');

  const successModal = document.querySelector('.popup--success');
  const closeButton = successModal.querySelector('.popup__close');
  const modalInner = successModal.querySelector('.popup__inner');

  let errors = {};
  let user = {};

  // вставляет данные из Localstorage
  const onPageLoadSetInputsValues = () => {
    window.utilitary.setInputValuesFromLocalStorage(formTelInput, formEmailInput);
  };

  // предотвращает потерю набранного номера при повторном фокусе на инпут
  const onTelInputFocusSetValue = () => {
    if (formTelInput.value.length < 2) {
      window.utilitary.setInputValue(TEL_INPUT_VALUE, formTelInput);
    }

    window.utilitary.resetInputError(formTelInput);
  };

  // обработчик фокуса на инпут почты
  const onEmailInputFocusResetError = () => {
    window.utilitary.resetInputError(formEmailInput);
  };

  // обработчик изменения данных поля телефона
  const onTelInputChange = () => {
    window.utilitary.validateTelNumber(formTelInput, errors, TEL_LENGTH);
  };

  // обработчик изменения данных поля почты
  const onEmailInputChange = () => {
    window.utilitary.validateEmail(formEmailInput, errors);
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
      window.utilitary.setLocalStorage('tel', formTelInput.value, user);
      window.utilitary.setLocalStorage('email', formEmailInput.value, user);
      form.reset();
    }
  };

  // закрытие модалки успеха по нажатию Esc
  const onEscModalClose = (evt) => {
    window.utilitary.onEscButtonPressModalClose(evt);
  };

  // закрытие модалки успеха по нажатию на крестик
  const onCloseButtonModalClose = () => {
    window.utilitary.onCloseButtonModalClose(successModal);
  };

  // закрытие модалки успеха по нажатию за пределами окна
  const onOuterModalClickCloseModal = (evt) => {
    window.utilitary.onOverLayClickModalClose(successModal, modalInner, evt);
  };


  form.addEventListener('submit', onFormSubmit);

  formTelInput.addEventListener('change', onTelInputChange);
  formTelInput.addEventListener('blur', onTelInputChange);

  formEmailInput.addEventListener('change', onEmailInputChange);
  formEmailInput.addEventListener('blur', onEmailInputChange);

  formTelInput.addEventListener('focus', onTelInputFocusSetValue);
  formEmailInput.addEventListener('focus', onEmailInputFocusResetError);

  successModal.addEventListener('click', onOuterModalClickCloseModal);

  window.addEventListener('load', onPageLoadSetInputsValues);

}
