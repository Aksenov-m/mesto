import Popup from './Popup.js';
export default class PopupWithImage extends Popup{
  constructor(popupSelector){
  super(popupSelector);
  this._popupImage = this._popup.querySelector('.popup__image');
  this._popupTitle = this._popup.querySelector('.popup__photo-title');
  }
  open(name, link) {
    super.open();
    this._popupImage.src = link;
    this._popupTitle.textContent = name;
    this._popupImage.alt = name;
  };
}
