const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

import { FormValidator } from './FormValidator.js';
import { Card } from './Card.js';

// let activePopup = null;

// получаем элемент темплейт
const template = document.querySelector('#card');

// 1 попап
const popupElementEdit = document.querySelector('.popup_type_edit');
// 2 попап
const popupElementAdd = document.querySelector('.popup_type_add');
// 3 попап
const popupElementImage = document.querySelector('.popup_image_fullscreen');

// форма попапа с редактированием профиля
const popupFormEdit = popupElementEdit.querySelector('.popup__info_form_profile');
// форма попапа с добавлением карточки
const popupFormAdd = popupElementAdd.querySelector('.popup__info');

// кнопка открытия 1 попапа
const navButton = document.querySelector('.profile__edit-button');
// кнопка открытия 2 попапа
const addButton = document.querySelector('.profile__add-button');

// кнопка сохранить
const cardAddButton = document.querySelector('.popup__button-card');

// секция с карточками
const cardsContainer = document.querySelector('.cards');

// попап 2 с картинками-названия фото
const imageNameInput = popupElementAdd.querySelector('.popup__input_string_title');

// попап 2 с картинками-ссылки на фото
const imageLinkInput = popupElementAdd.querySelector('.popup__input_string_link');

const profileFormElement = document.querySelector('.popup__info_form_profile');
const nameInput = profileFormElement.querySelector('.popup__input_string_name');
const jobInput = profileFormElement.querySelector('.popup__input_string_job');

const formName = document.querySelector('.profile__name');
const formJob = document.querySelector('.profile__job');

const popupImage = popupElementImage.querySelector('.popup__image');
const popupTitle = popupElementImage.querySelector('.popup__photo-title');

// открытый попап
const openedPopup = document.querySelector('.popup_opened');

// Все попапы в проекте
const popups = document.querySelectorAll('.popup');

const config = {
  formSelector: '.popup__info',
  inputSelector: '.popup__input',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active',
  submitButtonSelector: '.popup__button',
};

// Закрытие попапа нажатием на Esc
function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened') //нашли открытый попап
    closePopup(openedPopup); //закрыли попап
  }
}

// Закрытие попапа кликом на оверлей и Х
popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
          closePopup(popup)
      }
      if (evt.target.classList.contains('popup__close-button')) {
        closePopup(popup)
      }
  })
})

// function disableSubmitButton() {
//   cardAddButton.disabled = true;
//   cardAddButton.classList.add('popup__button_disabled');
// };

function submitProfileForm (evt) {
    evt.preventDefault();
    // Получите значение полей jobInput и nameInput из свойства value
    formName.textContent = nameInput.value;
    formJob.textContent = jobInput.value;
    closePopup(popupElementEdit);
};

profileFormElement.addEventListener('submit', submitProfileForm);

function openformElement() {
  nameInput.value = formName.textContent;
  jobInput.value = formJob.textContent;
};

// функция для открытия попапа
function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
  // activePopup = popupElement;
};

// функция для закрытия попапа
function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
};

// слушатель для кнопки редактирования
navButton.addEventListener('click', () => {
  openPopup(popupElementEdit);
  // ValidatorEditProfile.resetValidation();
  openformElement();
});

// слушатель для кнопки добавления
addButton.addEventListener('click', () => {
openPopup(popupElementAdd)
// ValidatorEditCard.resetValidation();
});

// function addOnCardClick(data) {
//   const cardImage = data.querySelector('.card__image');
//   const cardTitle = data.querySelector('.card__title');
//   cardImage.addEventListener("click", () =>
//   {openPopup(popupElementImage);
//   popupImage.src = cardImage.src;
//   popupTitle.textContent = cardTitle.textContent;
//   popupImage.alt = cardImage.alt;
//   })
// };

// функция отправки формы добавления карточки
const submitImageFormHandler = (evt) => {
  evt.preventDefault();
  const inputImageName = imageNameInput.value;
  const inputImageLink = imageLinkInput.value;
  addImageCard(inputImageName, inputImageLink);
  closePopup(popupElementAdd);
  imageNameInput.value = '';
  imageLinkInput.value = '';
  // disableSubmitButton();
  // form2.reset();
};
// слушатель на отрпавку формы папапа добавления карточек
popupElementAdd.addEventListener('submit', submitImageFormHandler);

// функция добавления карточки
const addImageCard = (cardInfo) => {
  // Создадим экземпляр карточки
  const card = new Card(cardInfo, template, handleCardClick);
  // Создаём карточку и возвращаем наружу
  const cardElement = card.generateCard();
  // Добавляем в DOM
  cardsContainer.prepend(cardElement);
};


function handleCardClick(name, link) {
  // устанавливаем ссылку
  // устанавливаем подпись картинке
  // открываем попап универсальной функцией, которая навешивает обработчик Escape внутри себя
  popupImage.src = link.src;
  popupTitle.textContent = name.textContent;
  popupImage.alt = name.alt;
  openPopup(popupElementImage);
}

// создание новой карточки
//  function createCard(item) {
//   const card = new Card(cardInfo, template, handleCardClick);
//   const item = card.generateCard();
//   // тут создаете карточку и возвращаете ее
//  return createCard();
// };

function createCard(item) {
  // тут создаете карточку и возвращаете ее
  const card = new Card(item, template, handleCardClick);
  // Создаём карточку и возвращаем наружу
  const cardElement = card.generateCard();
return cardElement;
}

// проход по масиву карточек и добавление карточек
initialCards.forEach((item) => {
  return createCard(item);
});

// Добавляем в DOM
// cardsContainer.prepend(cardElement);

  // const ValidatorEditProfile = new FormValidator(config, popupFormEdit);
  // ValidatorEditProfile.enableValidation();

  // const ValidatorEditCard = new FormValidator(config, popupFormAdd);
  // ValidatorEditCard.enableValidation();
  // const formValidators = {};

  // Включение валидации
//   const enableValidation = (config) => {
//     const formList = Array.from(document.querySelectorAll(config.formSelector))
//     formList.forEach((formElement) => {
//       const validator = new FormValidator(formElement, config)
//      // вот тут в объект записываем под именем формы
//       formValidators[ formElement.name ] = validator;
//      validator.enableValidation();
//     });
//   };

//   enableValidation(config);

//   formValidators[ profileForm.popupInfo ].resetValidation()

// // или
// formValidators[ addCardForm.popupImage ].resetValidation()
