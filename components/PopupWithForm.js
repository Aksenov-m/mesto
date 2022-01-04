import Popup from './Popup.js';
export default class PopupWithForm extends Popup{
  constructor({popupSelector}, callBackSubmitForm){
    super({popupSelector});
    this._callBackSubmitForm = callBackSubmitForm;
    this._form = this._popup.querySelector('.popup__info');
    this._inputList = Array.from(this._form.querySelectorAll('.popup__input'));
    }
    _getInputValues(){
      return this._inputList;
    }
    setEventListeners(){
      super.setEventListeners();
      this._popup.addEventListener('submit', this._callBackSubmitForm);
    }
    close(){
      super.close();
      this._form.reset();
    }
}
