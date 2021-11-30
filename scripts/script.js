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

// получаем элемент темплейт
const template = document.querySelector('#card');

// 1 попап
const popupElementEdit = document.querySelector('.popup_type_edit');
// 2 попап
const popupElementAdd = document.querySelector('.popup_type_add');
// 3 попап
const popupElementImage = document.querySelector('.popup_image_fullscreen');

// кнопка закрытия 1 попапа
const closeButtonEdit = popupElementEdit.querySelector('.popup__close-button');
// кнопка закрытия 2 попапа
const closeButtonAdd = popupElementAdd.querySelector('.popup__close-button')
// кнопка закрытия 3 попапа
const closeButtonImage = popupElementImage.querySelector('.popup__close-button')

// кнопка открытия 1 попапа
const navButton = document.querySelector('.profile__edit-button');
// кнопка открытия 2 попапа
const addButton = document.querySelector('.profile__add-button');

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

// let escapeKeyDown

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
  popupElement.addEventListener('keydown', EscPopup);
};

// функция для закрытия попапа
function closePopup(popupElement) {
  resetForm();
  popupElement.classList.remove('popup_opened');
  popupElement.removeEventListener('keydown', EscPopup);
};


// слушатель для кнопки редактирования
navButton.addEventListener('click', () => {
  openPopup(popupElementEdit);
  openformElement();
});

// слушатель для кнопки добавления
addButton.addEventListener('click', () => openPopup(popupElementAdd));

// слушатель для кнопки закрытия попапа 1 X
closeButtonEdit.addEventListener('click', () => closePopup(popupElementEdit))

// слушатель для кнопки закрытия попапа 2 X
closeButtonAdd.addEventListener('click', () => closePopup(popupElementAdd));

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

// слушатель для кнопки закрытия попапа 3 X
closeButtonImage.addEventListener("click", () => closePopup(popupElementImage));

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


// function EscPopup (evt, popupElement) {
//   if (evt.key === "Escape") {
//     closePopup(popupElement);
//   }
// };

const EscPopup = (evt) => {
  if (evt.key === 'Escape') {
    closePopup(popupElement);
  }
}
