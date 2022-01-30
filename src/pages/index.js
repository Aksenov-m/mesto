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
let userId = null;

api.getAllData().then(([data, user]) => {
  // const user = {};
  // // userDataId = Object.assign({}, user);
  // user = userDataId;
  userId = user._id;
  cardsList.renderItems(data, userId);
  userInfo.setUserInfo({
    name: user.name,
    about: user.about,
  });
  userInfo.setUserAvatar({
    avatar: user.avatar,
  });
});

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
  popupEdit.renderLoading(true);
  api
    .editUsers(item)
    .then(() => {
      userInfo.setUserInfo(item);
    })
    .catch((err) => alert(err))
    .finally(() => {
      popupEdit.renderLoading(false);
      setTimeout(popupEdit.close, 5000);
    });
  // setTimeout(popupEdit.close, 3000);
};

const submitAvatarForm = (avatarData) => {
  const item = {
    avatar: avatarData['avatarlink'],
  };
  popupAvatar.renderLoading(true);
  api
    .editAvatar(item)
    .then(() => {
      userInfo.setUserAvatar(item);
    })
    .catch((err) => alert(err))
    .finally(() => {
      popupAvatar.renderLoading(false);
      setTimeout(popupAvatar.close, 5000);
    });
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
    _id: userId,
  };

  // Добавление новой карточки
  api
    .createCard(item)
    .then((data) => {
      const card = createCard(data, userId);
      cardsList.prependAddItem(card);
    })
    .catch((err) => alert(err));
  popupAddImage.close();
};

const handleDeleteClick = (data, cardElement) => {
  popupTrash.open(data, cardElement);
};

// const handleLikeClick = (data) => {
//   const card = new Card (data);
//   if (card.isLiked()) {
//     api.deleteLikeCard(data)
//       .then(() => {
//         card.updateLikesNumber()
//       })
//       .catch((err) => alert(err));
//   } else {
//     api.likeCard(cardId)
//       .then((data) => {
//         card.updateLikesNumber(data)
//       })
//       .catch((error) => {
//         console.log(error)
//       })
//   }
// },

const submitCardTrash = (data, cardElement) => {
  api
    .deleteCard(data)
    .then(() => {
      cardElement.remove();
      cardElement = null;
    })
    .catch((err) => alert(err));
  popupTrash.close();
};

// // создания новой карточки
function createCard(item, userId) {
  // тут создаете карточку и возвращаете ее
  const card = new Card(item, userId, template, handleCardClick, handleDeleteClick, {
    handleLikeClick: (item) => {
      if (card.isLiked(item)) {
        api
          .deleteLikeCard(item)
          .then((item) => {
            card.updateLikesNumber(item);
          })
          .catch((err) => alert(err));
      } else {
        api
          .likeCard(item)
          .then((item) => {
            card.updateLikesNumber(item);
          })
          .catch((err) => alert(err));
      }
    },
  });
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
    renderer: (item, userId) => {
      const cardElement = createCard(item, userId);
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

// function renderLoading(isLoading){
//   if (isLoading) {
//      spinner.classList.add('spinner_visible');
//     content.classList.add('content_hidden');

//     } else {
//        spinner.classList.remove('spinner_visible');
//       content.classList.remove('content_hidden');
//     }
//   }
