export class Card {
  constructor(data, cardTemplate) {
    this._name = data.name;
    this._link = data.link;
    this._cardTemplate = cardTemplate;
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

  // Добавим данные
  this._element.querySelector('.card__image').src = this._link;
  this._element.querySelector('.card__image').alt = this._name;
  this._element.querySelector('.card__title').textContent = this._name;
  this._deleteCard();
  this._addLike();
  // Вернём элемент наружу
  return this._element;
 }
 // удаление карточки
 _deleteCard() {
  // кнопка удаления карточки
  this._element.querySelector('.card__trash').addEventListener("click", () => {
    this._element.remove();
   })};
 //добавления лайка
 _addLike() {
  this._element.querySelector('.card__like-icon').addEventListener('click', function (evt) {
  evt.target.classList.toggle('card__like-icon_active');
  })
 };

}
