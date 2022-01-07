export const formValidators = {};

export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];

// получаем элемент темплейт
export const template = document.querySelector('#card');

// // // 1 попап
export const popupElementEdit = document.querySelector('.popup_type_edit');
// 2 попап
export const popupElementAdd = document.querySelector('.popup_type_add');
// // 3 попап
// export const popupElementImage = document.querySelector('.popup_image_fullscreen');

// // 1 попап
// export const popupElementEdit = '.popup_type_edit';

// форма попапа с редактированием профиля
export const popupFormEdit = popupElementEdit.querySelector(
  '.popup__info_form_profile'
);
// форма попапа с добавлением карточки
export const popupFormAdd = popupElementAdd.querySelector('.popup__info');

// кнопка открытия 1 попапа
export const navButton = document.querySelector('.profile__edit-button');
// кнопка открытия 2 попапа
export const addButton = document.querySelector('.profile__add-button');

// кнопка сохранить
export const cardAddButton = document.querySelector('.popup__button-card');

// секция с карточками
export const cardsContainer = '.cards';

// попап 2 с картинками-названия фото
export const imageNameInput = popupElementAdd.querySelector(
  '.popup__input_string_title'
);

// попап 2 с картинками-ссылки на фото
export const imageLinkInput = popupElementAdd.querySelector(
  '.popup__input_string_link'
);

export const profileFormElement = document.querySelector(
  '.popup__info_form_profile'
);
export const nameInput = profileFormElement.querySelector(
  '.popup__input_string_name'
);
export const jobInput = profileFormElement.querySelector(
  '.popup__input_string_job'
);

export const formName = document.querySelector('.profile__name');
export const formJob = document.querySelector('.profile__job');

// export const popupImage = popupElementImage.querySelector('.popup__image');
// export const popupTitle = popupElementImage.querySelector('.popup__photo-title');

// открытый попап
// const openedPopup = document.querySelector('.popup_opened');

// Все попапы в проекте
export const popups = document.querySelectorAll('.popup');

export const config = {
  formSelector: '.popup__info',
  inputSelector: '.popup__input',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active',
  submitButtonSelector: '.popup__button',
};
