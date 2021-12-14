export class FormValidator {
  constructor(config, form) {
    this._config = config;
    this._form = form;
  }
  _showInputError (inputElement) {
    // Находим элемент ошибки внутри самой функции
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._config.errorClass);
  };
  _hideInputError = (inputElement) => {
    // Находим элемент ошибки
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.classList.remove(this._config.errorClass);
    // Удаляем текст ошибки из блока.
    errorElement.textContent = '';
  };
  _isValid = (inputElement) => {
    if (inputElement.validity.valid) {
      // showInputError теперь получает параметром форму, в которой
      // находится проверяемое поле, и само это поле
      this._hideInputError(inputElement);
    } else {
      // hideInputError теперь получает параметром форму, в которой
      // находится проверяемое поле, и само это поле
      this._showInputError(inputElement);
    }
  };
  // Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять
   _toggleButtonState = (buttonElement) => {
  // Проверяем валидность формы.
  const isFormValid = this._form.checkValidity();
  // Если форма невалидна, то присваиваем свойству disabled кнопки значение true
  buttonElement.disabled = !isFormValid;
  // Если форма невалидна, добавляем кнопке класс
  buttonElement.classList.toggle(this._config.inactiveButtonClass, !isFormValid)
  }

  _setEventListeners = () => {
    // Находим все поля внутри формы,
    // сделаем из них массив методом Array.from
    const inputList = Array.from(this._form.querySelectorAll(this._config.inputSelector));
    const buttonElement = this._form.querySelector(this._config.submitButtonSelector);

    // чтобы проверить состояние кнопки в самом начале
    this._toggleButtonState(buttonElement);

   // Обойдём все элементы полученной коллекции
   inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener('input', () => {
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
      this._isValid(inputElement);
      // чтобы проверять его при изменении любого из полей
      this._toggleButtonState(buttonElement);
    });
  });
  };
  enableValidation () {
      this._form.addEventListener('submit', (evt) => {
        // У каждой формы отменим стандартное поведение
        evt.preventDefault();
      });

      // Для каждой формы вызовем функцию setEventListeners,
      // передав ей элемент формы
      // объект props передаём дальше. Он будет содержать в себе все необходимые свойства
      this._setEventListeners();
  };
  resetForm() {
    // const form = openedPopup.querySelector(formSelector);
    const inputs = this._form.querySelectorAll(this._config.inputSelector);
    inputs.forEach((input) => this._hideInputError(input));
    this._form.reset();
    };
}
