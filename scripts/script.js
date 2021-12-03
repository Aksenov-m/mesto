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

// let activePopup = null;

// получаем элемент темплейт
const template = document.querySelector('#card');

// 1 попап
const popupElementEdit = document.querySelector('.popup_type_edit');
// 2 попап
const popupElementAdd = document.querySelector('.popup_type_add');
// 3 попап
const popupElementImage = document.querySelector('.popup_image_fullscreen');

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
  errorClass: 'form__input-error_active'
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

function disableSubmitButton() {
  cardAddButton.disabled = true;
  cardAddButton.classList.add('popup__button_disabled');
};

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
  openformElement();
  resetForm(popupElementEdit, config)
});

// слушатель для кнопки добавления
addButton.addEventListener('click', () => {
openPopup(popupElementAdd)
resetForm(popupElementAdd, config)
});

const result = initialCards.forEach(item => {
  addImageCard(item.name, item.link);
});

function addImageCard(name, link) {
  const cardElement = createTaskDomNode(name, link);
  cardsContainer.prepend(cardElement);
};

function createTaskDomNode(name, link) {
	const taskTemplate = template.content.querySelector('.card').cloneNode(true);
  taskTemplate.querySelector('.card__title').textContent = name;
  const cardImage = taskTemplate.querySelector('.card__image');
  cardImage.src = link;
  cardImage.alt = name;
  deleteCard(taskTemplate);
  addLike(taskTemplate);
  openPopupImage(taskTemplate);
  return taskTemplate;
};

function openPopupImage(data) {
  const cardImage = data.querySelector('.card__image');
  const cardTitle = data.querySelector('.card__title');
  cardImage.addEventListener("click", () =>
  {openPopup(popupElementImage);
  popupImage.src = cardImage.src;
  popupTitle.textContent = cardTitle.textContent;
  popupImage.alt = cardImage.alt;
  })
};

//добавления лайка
function addLike(data) {
  const likeButton = data.querySelector('.card__like-icon');
  likeButton.addEventListener('click', function (evt) {
  evt.target.classList.toggle('card__like-icon_active');
  })
};

// форма добавления карточек
const submitImageFormHandler = (evt) => {
  evt.preventDefault();
  const inputImageName = imageNameInput.value;
  const inputImageLink = imageLinkInput.value;
  addImageCard(inputImageName, inputImageLink);
  closePopup(popupElementAdd);
  imageNameInput.value = '';
  imageLinkInput.value = '';
  disableSubmitButton();
  // form2.reset();
};

popupElementAdd.addEventListener('submit', submitImageFormHandler);

// удаление карточки
function deleteCard(data) {
    // кнопка удаления карточки
    const deleteButton = data.querySelector('.card__trash');
    deleteButton.addEventListener("click", () => {
    data.remove();
  })
};

enableValidation({
  formSelector: '.popup__info',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
});
