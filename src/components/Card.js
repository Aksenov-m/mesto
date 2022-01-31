export class Card {
  constructor(data, userId, cardTemplate, handleCardClick, handleDeleteClick, { handleLikeClick }) {
    this._data = data;
    this._userId = userId;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes || [];
    this._id = data._id;
    this._cardTemplate = cardTemplate;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
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
    this._element.querySelector('.card__title').textContent = this._name;
    this._setEventListeners();
    if (!this._checkOwnerCard()) {
      this._removeTrash();
    }
    this.updateLikesNumber(this._data);
    // Вернём элемент наружу
    return this._element;
  }

  isLiked(data) {
    this._data = data;
    if (data.likes.some((user) => user._id === this._userId)) return true;
    else return false;
  }

  updateLikesNumber(data) {
    this._likeСounter.textContent = data.likes.length;
    if (this.isLiked(data)) {
      this._likeButton.classList.add('card__like-icon_active');
    } else {
      this._likeButton.classList.remove('card__like-icon_active');
    }
  }

  _checkOwnerCard() {
    if (this._userId === this._data.owner._id) {
      return true;
    }
    return false;
  }

  removeCard = () => {
    this._element.remove();
    this._element = null;
  };

  _removeTrash = () => {
    this._trash.remove();
    this._trash = null;
  };

  _setEventListeners() {
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
    //добавления лайка
    this._likeButton.addEventListener('click', () => this._handleLikeClick(this._data));

    // кнопка удаления карточки
    this._trash.addEventListener('click', () => this._handleDeleteClick(this._data, this._element));
  }
}
