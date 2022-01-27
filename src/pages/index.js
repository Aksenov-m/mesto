// index.js
import './index.css'; // импорт главного файла стилей

import { formValidators, template, popupElementEdit, popupElementAdd, navButton, addButton, cardsContainer, nameInput, jobInput, formName, formJob, config, avatarButton, avatarInput, popupElementAvatar } from '../utils/constants.js';
import { FormValidator } from '../components/FormValidator.js';
import { Card } from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithDel from '../components/PopupWithDel.js';
import UserInfo from '../components/UserInfo.js';
import { Api } from '../components/Api';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-34',
  headers: {
    authorization: '8de7cc2c-4ba5-4d74-a29d-069658d4542d',
    'Content-Type': 'application/json',
  },
});

api
  .getInitialCards()
  .then((data) => {
    cardsList.renderItems(data);
  })
  .catch((err) => alert(err));

api
  .getInitialUsers()
  .then((user) => {
    userInfo.setUserInfo({
      name: user.name,
      about: user.about,
    });
    userInfo.setUserAvatar({
      avatar: user.avatar,
    });
  })
  .catch((err) => alert(err));

const userInfo = new UserInfo({
  name: formName,
  about: formJob,
  avatar: avatarButton,
});

const submitProfileForm = (userData) => {
  // evt.preventDefault();
  const item = {
    name: userData['userName'],
    about: userData['userJob'],
  };
  api
    .editUsers(item)
    .then(() => {
      userInfo.setUserInfo(item);
    })
    .catch((err) => alert(err));
  popupEdit.close();
};

const submitAvatarForm = (avatarData) => {
  const item = {
    avatar: avatarData['avatarlink'],
  };
  api
    .editAvatar(item)
    .then(() => {
      userInfo.setUserAvatar(item);
    })
    .catch((err) => alert(err));
  popupAvatar.close();
};

// слушатель для кнопки редактирования
navButton.addEventListener('click', () => {
  const formName = popupElementEdit.querySelector(config.formSelector).name;
  formValidators[formName].resetValidation();
  popupEdit.open();
  const userInfoForm = userInfo.getUserInfo();
  nameInput.value = userInfoForm.name;
  jobInput.value = userInfoForm.about;
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
  const item = {
    name: data['imageName'],
    link: data['imagelink'],
  };

  api
    .createCard(item)
    .then(() => {
      const card = createCard(item);
      cardsList.prependAddItem(card);
    })
    .catch((err) => alert(err));
  popupAddImage.close();
};

function onDeleteClick(data, cardId) {
  popupTrash.open({ data, cardId });
}

const submitCardTrash = (data) => {
  api
    .deleteCard(data)
    .then(() => {
      data.removeCard();
    })
    .catch((err) => alert(err));
  popupTrash.close();
};

// создания новой карточки
function createCard(item) {
  // тут создаете карточку и возвращаете ее
  const card = new Card(item, template, handleCardClick, onDeleteClick);
  // Создаём карточку и возвращаем наружу
  return card.generateCard();
}

// Включение валидации
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    // вот тут в объект записываем под именем формы
    formValidators[formElement.name] = validator;
    validator.enableValidation();
  });
};

enableValidation(config);

const cardsList = new Section(
  {
    // items: initialCards,
    renderer: (item) => {
      const cardElement = createCard(item);
      cardsList.appendAddItem(cardElement);
    },
  },
  cardsContainer
);
// отрисовка карточек
// cardsList.renderItems(initialCards);

const popupImage = new PopupWithImage('.popup_image_fullscreen');
popupImage.setEventListeners();

// фннкция клика по карточке
function handleCardClick(name, link) {
  popupImage.open(name, link);
}

const popupAddImage = new PopupWithForm('.popup_type_add', submitImageFormHandler);
popupAddImage.setEventListeners();

const popupEdit = new PopupWithForm('.popup_type_edit', submitProfileForm);
popupEdit.setEventListeners();

const popupAvatar = new PopupWithForm('.popup_type_avatar', submitAvatarForm);
popupAvatar.setEventListeners();

const popupTrash = new PopupWithDel('.popup_type_trash', submitCardTrash);
popupTrash.setEventListeners();

// слушатель для кнопки обновление аватара пользователя
avatarButton.addEventListener('click', () => {
  const formName = popupElementAvatar.querySelector(config.formSelector).name;
  formValidators[formName].resetValidation();
  popupAvatar.open();
  const userInfoForm = userInfo.getUserInfo();
  avatarInput.value = userInfoForm.avatar;
});
