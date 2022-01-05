// index.js
import './index.css'; // добавьте импорт главного файла стилей

import { formValidators, initialCards, template, popupElementEdit, popupElementAdd, popupElementImage, navButton, addButton, cardsContainer, imageNameInput, imageLinkInput, profileFormElement,
nameInput, jobInput, formName, formJob, popups, config } from './utils/constants.js';
import { FormValidator } from './components/FormValidator.js';
import { Card } from './components/Card.js';
import Section from './components/Section.js';
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForm from './components/PopupWithForm.js';
import UserInfo from './components/UserInfo.js';

function submitProfileForm (evt) {
    evt.preventDefault();
    // Получите значение полей jobInput и nameInput из свойства value
    popupUserInfo.setUserInfo(nameInput, jobInput);
    popupEdit.close();
};

// слушатель для кнопки редактирования
navButton.addEventListener('click', () => {
  const formName = popupElementEdit.querySelector(config.formSelector).name;
  formValidators[formName].resetValidation();
  popupEdit.open();
  popupEdit.setEventListeners();
  nameInput.value = popupUserInfo.getUserInfo().name;
  jobInput.value = popupUserInfo.getUserInfo().job;
  // openformElement();
});

// слушатель для кнопки добавления
addButton.addEventListener('click', () => {
  const formName = popupElementAdd.querySelector(config.formSelector).name;
  formValidators[formName].resetValidation();
  popupAddImage.open();
  popupAddImage.setEventListeners();
});


// функция отправки формы добавления карточки
const submitImageFormHandler = (evt) => {
  evt.preventDefault();
  const inputImageName = imageNameInput.value;
  const inputImageLink = imageLinkInput.value;
  const card = createCard({ name: inputImageName, link: inputImageLink });
  // prependImageCard(card);
  cardsList.addItem(card);
  popupAddImage.close();
};


// создания новой карточки
function createCard(item) {
  // тут создаете карточку и возвращаете ее
  const card = new Card(item, template, handleCardClick);
  // Создаём карточку и возвращаем наружу
  return card.generateCard();
}

// Включение валидации
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement)
    // вот тут в объект записываем под именем формы
    formValidators[ formElement.name ] = validator;
    validator.enableValidation();
  });
};

enableValidation(config);

const cardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, template, handleCardClick);
    const cardElement = card.generateCard();
    cardsList.addItem(cardElement);
  },
},
cardsContainer
);
cardsList.renderItems();


const popupImage = new PopupWithImage({
  popupSelector: popupElementImage,
});
popupImage.setEventListeners();

// фннкция клика по карточке
function handleCardClick(name, link) {
  popupImage.open(name, link);
}

const popupAddImage = new PopupWithForm({
  popupSelector: popupElementAdd,
}, submitImageFormHandler);

const popupEdit = new PopupWithForm({
  popupSelector: popupElementEdit,
}, submitProfileForm);

const popupUserInfo = new UserInfo({
  nameSelector: formName,
  jobSelector: formJob
});
