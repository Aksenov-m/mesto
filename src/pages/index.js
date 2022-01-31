// index.js
import './index.css'; // импорт главного файла стилей

import { template, navButton, addButton, cardsContainer, nameInput, jobInput, formName, formJob, config, avatarButton, popupFormEdit, popupFormAvatar, popupFormAdd } from '../utils/constants.js';
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
    .then(() => {
      setTimeout(popupEdit.close, 5000);
    })
    .catch((err) => alert(err))
    .finally(() => {
      popupEdit.renderLoading(false);
    });
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
    .then(() => {
      setTimeout(popupAvatar.close, 5000);
    })
    .catch((err) => alert(err))
    .finally(() => {
      popupAvatar.renderLoading(false);
    });
};

// слушатель для кнопки редактирования юзера
navButton.addEventListener('click', () => {
  const validatorFormUser = new FormValidator(config, popupFormEdit);
  validatorFormUser.enableValidation();
  validatorFormUser.resetValidation();
  popupEdit.open();
  const userInfoForm = userInfo.getUserInfo();
  nameInput.value = userInfoForm.name;
  jobInput.value = userInfoForm.about;
});

// слушатель для кнопки добавления карт
addButton.addEventListener('click', () => {
  const validatorFormCard = new FormValidator(config, popupFormAdd);
  validatorFormCard.enableValidation();
  validatorFormCard.resetValidation();
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
    .then(() => {
      popupAddImage.close();
    })
    .catch((err) => alert(err));
};

const handleDeleteClick = (data, cardElement) => {
  popupTrash.open(data, cardElement);
};

const submitCardTrash = (data, card) => {
  api
    .deleteCard(data)
    .then(() => {
      card.remove();
    })
    .then(() => {
      popupTrash.close();
    })
    .catch((err) => alert(err));
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

// отрисовка карточек
const cardsList = new Section(
  {
    renderer: (item, userId) => {
      const cardElement = createCard(item, userId);
      cardsList.appendAddItem(cardElement);
    },
  },
  cardsContainer
);

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
  const validatorFormAvatar = new FormValidator(config, popupFormAvatar);
  validatorFormAvatar.enableValidation();
  validatorFormAvatar.resetValidation();
  popupAvatar.open();
  userInfo.getUserInfo();
});
