// получаем элемент темплейт
export const template = document.querySelector('#card');

// 1 попап
export const popupElementEdit = document.querySelector('.popup_type_edit');
// 2 попап
export const popupElementAdd = document.querySelector('.popup_type_add');
// 3 попап
export const popupElementAvatar = document.querySelector('.popup_type_avatar');
// 4 попап
export const popupElementTrash = document.querySelector('.popup_type_trash');

// форма попапа с редактированием профиля
export const popupFormEdit = popupElementEdit.querySelector('.popup__info');
// форма попапа с добавлением карточки
export const popupFormAdd = popupElementAdd.querySelector('.popup__info');
// форма попапа с добавлением аватара
export const popupFormAvatar = popupElementAvatar.querySelector('.popup__info');
// кнопка открытия 1 попапа
export const navButton = document.querySelector('.profile__edit-button');
// кнопка открытия 2 попапа
export const addButton = document.querySelector('.profile__add-button');

// кнопка сохранить
export const cardAddButton = document.querySelector('.popup__button-card');

// кнопка обновление аватара пользователя (3 попап)
export const avatarButton = document.querySelector('.profile__avatar-icon');

// кнопка открытия 4 попапа (удаления карточки)
export const cardTrashButton = document.querySelector('.card__trash');

// секция с карточками
export const cardsContainer = '.cards';

// попап 2 с картинками-названия фото
export const imageNameInput = popupElementAdd.querySelector('.popup__input_string_title');

// попап 2 с картинками-ссылки на фото
export const imageLinkInput = popupElementAdd.querySelector('.popup__input_string_link');

export const profileFormElement = document.querySelector('.popup__info_form_profile');
export const nameInput = profileFormElement.querySelector('.popup__input_string_name');
export const jobInput = profileFormElement.querySelector('.popup__input_string_job');
export const avatarInput = document.querySelector('.popup__input_string_avatar-link');

export const formName = document.querySelector('.profile__name');
export const formJob = document.querySelector('.profile__job');

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
