const popupElement = document.querySelector('.popup');

const closeButton = popupElement.querySelector('.popup__close-button');
const popupOpened = document.querySelector('popup_opened');
const navButton = document.querySelector('.profile__edit-button');

function openPopup() {
  popupElement.classList.remove('popup_opened');
}

function closePopup() {
  popupElement.classList.add('popup_opened');
}

navButton.addEventListener('click', openPopup)

closeButton.addEventListener('click', closePopup)

document.addEventListener('keyup', (event) => {
  if (event.keyCode === 27) {
      closePopup();
  }
});

// Находим форму в DOM
let formElement = document.querySelector('.popup__info');
// Находим поля формы в DOM
let nameInput = formElement.querySelector('.popup__name');
let jobInput = formElement.querySelector('.popup__job');

let formName = document.querySelector('.profile__name');
let formJob = document.querySelector('.profile__job');

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value
    formName.textContent = nameInput.value;
    formJob.textContent = jobInput.value;

    // Выберите элементы, куда должны быть вставлены значения полей

    // Вставьте новые значения с помощью textContent
    closePopup();
}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);

function openformElement() {
  nameInput.value = formName.textContent;
  jobInput.value = formJob.textContent;
  }
navButton.addEventListener('click', openformElement);

// console.log(formName.textContent);
// console.log(nameInput.value);