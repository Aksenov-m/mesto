// const popupElement = document.querySelector('.popup');

// const popupOpened = popupElement.querySelector('popup_opened');

// 1 попап
const popupElementEdit = document.querySelector('.popup_type_edit');
// 2 попап
const popupElementAdd = document.querySelector('.popup_type_add');
// кнопка закрытия 1 попапа
const closeButtonEdit = popupElementEdit.querySelector('.popup__close-button');
// кнопка закрытия 2 попапа
const closeButtonAdd = popupElementAdd.querySelector('.popup__close-button');
// кнопка открытия 1 попапа
const navButton = document.querySelector('.profile__edit-button');
// кнопка открытия 2 попапа
const addButton = document.querySelector('.profile__add-button');

// секция с карточками
const cards = document.querySelector('.cards');
// получаем элемент теиплейт
const template = document.querySelector('#card');

let formElement = document.querySelector('.popup__info');
let nameInput = formElement.querySelector('.popup__input_string_name');
let jobInput = formElement.querySelector('.popup__input_string_job');

let formName = document.querySelector('.profile__name');
let formJob = document.querySelector('.profile__job');

function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value
    formName.textContent = nameInput.value;
    formJob.textContent = jobInput.value;
    closePopup(popupElementEdit);
}

formElement.addEventListener('submit', formSubmitHandler);

function openformElement() {
  nameInput.value = formName.textContent;
  jobInput.value = formJob.textContent;
  }
navButton.addEventListener('click', openformElement);

// функция для открытия попапа
function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
  openformElement();
}

// функция для закрытия попапа
function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
}

// слушатель для кнопки редактирования
navButton.addEventListener("click", () => openPopup(popupElementEdit));

// слушатель для кнопки добавления
addButton.addEventListener("click", () => openPopup(popupElementAdd));

// слушатель для кнопки закрытия попапа 1 X
closeButtonEdit.addEventListener('click', () => closePopup(popupElementEdit));

// слушатель для кнопки закрытия попапа 2 X
closeButtonAdd.addEventListener("click", () => closePopup(popupElementAdd));

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

const result = initialCards.forEach(item => {
  return createTaskDomNode(item.name, item.link);
});

function createTaskDomNode(name, link) {
	const taskTemplate = template.content.querySelector('.card').cloneNode(true);
  taskTemplate.querySelector('.card__title').textContent = name;
  taskTemplate.querySelector('.card__image').src = link;
  taskTemplate.querySelector('.card__image').alt = name;
  cards.append(taskTemplate);
}
