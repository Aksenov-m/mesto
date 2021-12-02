const showInputError = (formElement, inputElement, errorMessage, { errorClass, inputErrorClass }) => {
  // Находим элемент ошибки внутри самой функции
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

const hideInputError = (formElement, inputElement, config) => {
  const { inputErrorClass, errorClass, } = config;
  // Находим элемент ошибки
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  // Удаляем текст ошибки из блока.
  errorElement.textContent = '';
};

const isValid = (formElement, inputElement, config) => {
  if (inputElement.validity.valid) {
    // showInputError теперь получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    hideInputError(formElement, inputElement, config);
  } else {
    // hideInputError теперь получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  }
};

// Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять
const toggleButtonState = (formElement, buttonElement, inactiveButtonClass) => {
  // Проверяем валидность формы.
  const isFormValid = formElement.checkValidity();
  // Если форма невалидна, то присваиваем свойству disabled кнопки значение true
  buttonElement.disabled = !isFormValid;
  // Если форма невалидна, добавляем кнопке класс
  buttonElement.classList.toggle(inactiveButtonClass, !isFormValid)
  }


const setEventListeners = (formElement, config) => {
  const {
    inputSelector,
    submitButtonSelector,
    inactiveButtonClass,
    errorClass,
    inputErrorClass
} = config
  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);

  // чтобы проверить состояние кнопки в самом начале
  toggleButtonState(formElement, buttonElement, inactiveButtonClass);

 // Обойдём все элементы полученной коллекции
 inputList.forEach((inputElement) => {
  // каждому полю добавим обработчик события input
  inputElement.addEventListener('input', () => {
    // Внутри колбэка вызовем isValid,
    // передав ей форму и проверяемый элемент
    isValid(formElement, inputElement, { errorClass, inputErrorClass });
    // чтобы проверять его при изменении любого из полей
    toggleButtonState(formElement, buttonElement, inactiveButtonClass);
  });
});
};

const enableValidation = (config) => {
  // Из объекта config извлекаем свойство formSelector, остальные свойства помещаем в объект props. Название объекта
  const { formSelector, ...props } = config;
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll(formSelector));

  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      // У каждой формы отменим стандартное поведение
      evt.preventDefault();
    });

    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    // объект props передаём дальше. Он будет содержать в себе все необходимые свойства
    setEventListeners(formElement, props);
  });
};

  //  function resetForm() {
  //   const formList = Array.from(activePopup.querySelectorAll('form'));
  //   formList.forEach((formElement) => {
  //   Array.from(formElement.querySelectorAll('.popup__input')).forEach((inputElement) =>
  //   hideInputError(formElement, inputElement, config)
  //   )});
  // };

  function resetForm() {
    const formList = Array.from(activePopup.querySelectorAll('form'));
    formList.forEach((formElement) => {
    Array.from(formElement.querySelectorAll('.popup__input')).forEach((inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('form__input_type_error');
    errorElement.textContent = '';
    document.forms.popupInfo.reset();
    document.forms.popupImage.reset();
  }
  )});
  };
