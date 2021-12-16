export class Card {
  constructor(data, cardTemplate, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardTemplate = cardTemplate;
    this._handleCardClick = handleCardClick;
  }
  // здесь выполним все необходимые операции, чтобы вернуть разметку
  _getTemplate() {
    const cardElement = this._cardTemplate.content.querySelector('.card').cloneNode(true);
  // вернём DOM-элемент карточки
    return cardElement;
  }
  generateCard() {
  // Запишем разметку в приватное поле _element.
  // Так у других элементов появится доступ к ней.
  this._element = this._getTemplate();
  this._cardImage = this._element.querySelector('.card__image');

  // Добавим данные
  this._cardImage.src = this._link;
  this._cardImage.alt = this._name;
  this._element.querySelector('.card__title').textContent = this._name;
  this._setEventListeners();
  // Вернём элемент наружу
  return this._element;
 }

 _setEventListeners() {
 this._cardImage.addEventListener('click', () => {
  //  debugger
  this._handleCardClick(this._name, this._link)
 });
 //добавления лайка
 this._element.querySelector('.card__like-icon').addEventListener('click', function (evt) {
  evt.target.classList.toggle('card__like-icon_active');
  });
  // удаление карточки, кнопка удаления карточки
  this._element.querySelector('.card__trash').addEventListener("click", () => {
    this._element.remove();
   });
 }
}
