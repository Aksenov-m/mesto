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
