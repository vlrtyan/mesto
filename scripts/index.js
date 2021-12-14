import Card from '/scripts/Card.js';
import FormValidator from '/scripts/FormValidator.js';

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  inputErrorClass: 'popup__input_invalid',
  inputErrorBorderClass: 'popup__input_type_error',
  submitButtonSelector: '.popup__submit-button',
  submitButtonInvalidClass: 'popup__submit-button_invalid'
}

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

const elements = document.querySelector('.elements');
const template = document.querySelector('.template');

function createCard(item){
  const card = new Card(item.name, item.link, '.template');
  const cardElement = card.generateCard();
  return cardElement;
}

initialCards.forEach((item) => {
  elements.prepend(createCard(item));
})

const formNameValidator = new FormValidator(document.querySelector('.name-popup__form'), config);
formNameValidator.enableValidation();
const formNewItemValidator = new FormValidator(document.querySelector('.new-item__form'), config);
formNewItemValidator.enableValidation();


const namePopup = document.querySelector('.name-popup');
const editButton = document.querySelector('.profile__edit-button');
const nameForm = document.querySelector('.name-popup__form');
const nameField = document.querySelector('.name-popup__input_type_name');
const nameProfile = document.querySelector('.profile__name');
const descriptionField = document.querySelector('.name-popup__input_type_description');
const descriptionProfile = document.querySelector('.profile__description');

const newItemPopup = document.querySelector('.new-item');
const addButton = document.querySelector('.profile__add-button');
const newItemForm = document.querySelector('.new-item__form');
const placeNameField = document.querySelector('.new-item__input_type_name');
const imageField = document.querySelector('.new-item__input_type_link');

// const imagePopup = document.querySelector('.image-popup');
// const bigImage = document.querySelector('.image-popup__image');

window.addEventListener('load', () => {
    document.querySelectorAll('.popup').forEach((popup) => popup.classList.add('popup__transition'));
  })

function addPopupClickHandler(event) {
  if (event.target.classList.contains('popup')) {
    closePopup(event.target.closest('.popup'));
  };
}

function addEscHandler(event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  };
}

function openPopup(popup){
    document.addEventListener('keydown', addEscHandler);
    popup.addEventListener('mouseup', addPopupClickHandler);
    popup.classList.add('popup_opened');
}

export { openPopup }

function closePopup(popup){ 
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', addEscHandler);
    popup.removeEventListener('mouseup', addPopupClickHandler);
}

// function openImagePopup(event){
//     bigImage.setAttribute('src', event.target.getAttribute('src'));
//     bigImage.setAttribute('alt', event.target.closest('.element').textContent);
//     document.querySelector('.image-popup__title').textContent = event.target.closest('.element').textContent;
//     openPopup(imagePopup);
// }

editButton.addEventListener('click', () => {
    formNameValidator.disableSubmitButtonAndClearInputs();
    nameField.value = nameProfile.textContent;
    descriptionField.value = descriptionProfile.textContent;
    openPopup(namePopup);
})

addButton.addEventListener('click', () => {
    formNewItemValidator.disableSubmitButtonAndClearInputs();
    placeNameField.value = '';
    imageField.value = '';
    openPopup(newItemPopup);
})

const closeButtons = document.querySelectorAll('.popup__close-button');
for (let i = 0; i < closeButtons.length; i++) {
   closeButtons[i].addEventListener('click', function() {
      const popup = closeButtons[i].closest('.popup');
      closePopup(popup);
   });
}

function sumbitNameForm(event){
    event.preventDefault();
    nameProfile.textContent = nameField.value;
    descriptionProfile.textContent = descriptionField.value;
    closePopup(namePopup);
}
nameForm.addEventListener('submit', sumbitNameForm)

function sumbitNewItemForm(event){
    event.preventDefault();
    const name = placeNameField.value;
    const link = imageField.value;
    const item = {
        name, link
    }
    elements.prepend(createCard(item));
    closePopup(newItemPopup);
}
newItemForm.addEventListener('submit', sumbitNewItemForm); 