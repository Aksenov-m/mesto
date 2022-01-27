export class Card {
  constructor(data, cardTemplate, handleCardClick, onDeleteClick) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data._id;
    this._cardTemplate = cardTemplate;
    this._handleCardClick = handleCardClick;
    this._onDeleteClick = onDeleteClick;
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
    this._likeButton = this._element.querySelector('.card__like-icon');
    this._likeСounter = this._element.querySelector('.card__like-counter');
    this._trash = this._element.querySelector('.card__trash');
    // Добавим данные
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._likeСounter.textContent = this._likes.length;
    this._element.querySelector('.card__title').textContent = this._name;
    this._setEventListeners();
    // Вернём элемент наружу
    return this._element;
  }

  _toggleLike() {
    this._likeButton.classList.toggle('card__like-icon_active');
  }

  removeCard = () => {
    this._element.remove();
    this._element = null;
  };

  _setEventListeners() {
    this._cardImage.addEventListener('click', () => {
      //  debugger
      this._handleCardClick(this._name, this._link);
    });
    //добавления лайка
    this._likeButton.addEventListener('click', () => this._toggleLike());
    // удаление карточки, кнопка удаления карточки
    // this._trash.addEventListener('click', this._removeCard);

    this._trash.addEventListener('click', () => this._onDeleteClick(this._element, this._id));
  }
}
