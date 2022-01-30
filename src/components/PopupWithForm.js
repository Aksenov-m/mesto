import Popup from './Popup.js';
export default class PopupWithForm extends Popup {
  constructor(popupSelector, callBackSubmitForm) {
    super(popupSelector);
    this._callBackSubmitForm = callBackSubmitForm;
    this._form = this._popup.querySelector('.popup__info');
    this._inputList = Array.from(this._form.querySelectorAll('.popup__input'));
    this._submitButton = this._form.querySelector('.popup__button');
  }
  _getInputValues() {
    // создаём пустой объект
    this._formValues = {};
    // добавляем в этот объект значения всех полей
    this._inputList.forEach((input) => (this._formValues[input.name] = input.value));
    // возвращаем объект значений
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._callBackSubmitForm(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._form.reset();
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = 'Сохранение...';
    } else {
      this._submitButton.textContent = 'Сохранить';
    }
  }
}
