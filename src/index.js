import { formValidators, initialCards, template, popupElementEdit, popupElementAdd, popupElementImage, navButton, addButton, cardsContainer, imageNameInput, imageLinkInput, profileFormElement,
nameInput, jobInput, formName, formJob, popups, config } from '../utils/constants.js';
import { FormValidator } from '../components/FormValidator.js';
import { Card } from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';

// let activePopup = null;

// Закрытие попапа нажатием на Esc
// function closeByEscape(evt) {
//   if (evt.key === 'Escape') {
//     const openedPopup = document.querySelector('.popup_opened') //нашли открытый попап
//     closePopup(openedPopup); //закрыли попап
//   }
// }

// Закрытие попапа кликом на оверлей и Х
// popups.forEach((popup) => {
//   popup.addEventListener('click', (evt) => {
//       if (evt.target.classList.contains('popup_opened')) {
//           closePopup(popup)
//       }
//       if (evt.target.classList.contains('popup__close-button')) {
//         closePopup(popup)
//       }
//   })
// })

function submitProfileForm (evt) {
    evt.preventDefault();
    // Получите значение полей jobInput и nameInput из свойства value
    formName.textContent = nameInput.value;
    formJob.textContent = jobInput.value;
    elementEdit.close();
};

// слушатель на отрпавку формы профиля
profileFormElement.addEventListener('submit', submitProfileForm);

function openformElement() {
  nameInput.value = formName.textContent;
  jobInput.value = formJob.textContent;
};

// функция для открытия попапа
// function openPopup(popupElement) {
//   popupElement.classList.add('popup_opened');
//   document.addEventListener('keydown', closeByEscape);
//   // activePopup = popupElement;
// };

// // функция для закрытия попапа
// function closePopup(popupElement) {
//   popupElement.classList.remove('popup_opened');
//   document.removeEventListener('keydown', closeByEscape);
// };

// слушатель для кнопки редактирования
navButton.addEventListener('click', () => {
  const formName = popupElementEdit.querySelector(config.formSelector).name;
  formValidators[formName].resetValidation();
  elementEdit.open();
  openformElement();
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

// слушатель на отрпавку формы папапа добавления карточек
// popupElementAdd.addEventListener('submit', submitImageFormHandler);

// функция добавления карточки в DOM
// const prependImageCard = (cardElement) => {
//   cardsContainer.prepend(cardElement);
// };

// фннкция клика по карточке
// function handleCardClick(name, link) {
//   // устанавливаем ссылку
//   // устанавливаем подпись картинке
//   // открываем попап универсальной функцией, которая навешивает обработчик Escape внутри себя
//   popupImage.src = link;
//   popupTitle.textContent = name;
//   popupImage.alt = name;
//   openPopup(popupElementImage);
// }

// создания новой карточки
function createCard(item) {
  // тут создаете карточку и возвращаете ее
  const card = new Card(item, template, handleCardClick);
  // Создаём карточку и возвращаем наружу
  return card.generateCard();
}

// проход по масиву карточек и добавление карточек
// initialCards.forEach((item) => {
//   const card = createCard(item);
//   prependImageCard(card);
// });

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

// const elementEdit = new Popup('.popup_type_edit');
// elementEdit.setEventListeners();

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
