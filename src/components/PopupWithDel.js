import Popup from './Popup.js';
export default class PopupWithDel extends Popup {
  constructor(popupSelector, callBackSubmitForm) {
    super(popupSelector);
    this._callBackSubmitForm = callBackSubmitForm;
    this._form = this._popup.querySelector('.popup__info');
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._callBackSubmitForm(this._data, this._delElement);
    });
  }

  open(data, element) {
    super.open();
    this._delElement = element;
    this._data = data;
  }

  close() {
    super.close();
  }
}
