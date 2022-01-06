// index.js
import './index.css'; // добавьте импорт главного файла стилей

import { formValidators, initialCards, template, popupElementEdit, popupElementAdd, navButton, addButton, cardsContainer, imageNameInput, imageLinkInput,
nameInput, jobInput, formName, formJob, popups, config } from '../utils/constants.js';
import { FormValidator } from '../components/FormValidator.js';
import { Card } from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

const submitProfileForm = (userData) => {
    // evt.preventDefault();
    const item = {
      name: userData['userName'],
      job: userData['userJob']
  };
    popupUserInfo.setUserInfo(item);
    popupEdit.close();
};

// слушатель для кнопки редактирования
navButton.addEventListener('click', () => {
  const formName = popupElementEdit.querySelector(config.formSelector).name;
  formValidators[formName].resetValidation();
  popupEdit.open();
  const userInfo = popupUserInfo.getUserInfo();
  nameInput.value = userInfo.name;
  jobInput.value = userInfo.job;
  // openformElement();
});

// слушатель для кнопки добавления
addButton.addEventListener('click', () => {
  const formName = popupElementAdd.querySelector(config.formSelector).name;
  formValidators[formName].resetValidation();
  popupAddImage.open();
});


// функция отправки формы добавления карточки
const submitImageFormHandler = (data) => {
  // evt.preventDefault();
  // const inputImageName = imageNameInput.value;
  // const inputImageLink = imageLinkInput.value;
  const item = {
    name: data['imageName'],
    link: data['imagelink']
};
  const card = createCard(item);
  // prependImageCard(card);
  cardsList.appendAddItem(card);
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
  // items: initialCards,
  renderer: (item) => {
    const cardElement = createCard(item);
    cardsList.prependAddItem(cardElement);
  },
},
cardsContainer
);
// отрисовка карточек
cardsList.renderItems(initialCards);


const popupImage = new PopupWithImage(
'.popup_image_fullscreen');
popupImage.setEventListeners();

// фннкция клика по карточке
function handleCardClick(name, link) {
  popupImage.open(name, link);
}

const popupAddImage = new PopupWithForm(
 '.popup_type_add', submitImageFormHandler);
 popupAddImage.setEventListeners();

const popupEdit = new PopupWithForm(
 '.popup_type_edit', submitProfileForm);
 popupEdit.setEventListeners();

const popupUserInfo = new UserInfo({
  name: formName,
  job: formJob
});
