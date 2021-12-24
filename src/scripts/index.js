import '../pages/index.css';
import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import Popup from './Popup.js';

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  inputErrorClass: 'popup__input_invalid',
  inputErrorBorderClass: 'popup__input_type_error',
  submitButtonSelector: '.popup__submit-button',
  submitButtonInvalidClass: 'popup__submit-button_invalid',
  cardTemplateSelector: '#templateCard',
  
}

const cardsListSection = '.elements'

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
const cardTemplateSelector = '#templateCard';

const cardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item.name, item.link, cardTemplateSelector);
    const cardElement = card.generateCard();
    cardsList.addItem(cardElement);
  },
},
cardsListSection);

// function createCard(item){ 
//   const card = new Card(item.name, item.link, cardTemplateSelector); 
//   const cardElement = card.generateCard(); 
//   return cardElement; 
// } 

const formNameValidator = new FormValidator(document.querySelector('.name-popup__form'), config);
formNameValidator.enableValidation();
const formNewItemValidator = new FormValidator(document.querySelector('.new-item__form'), config);
formNewItemValidator.enableValidation();



//const namePopup = document.querySelector('.name-popup');
const namePopup = new Popup('.name-popup');
const editButton = document.querySelector('.profile__edit-button');
const nameForm = document.querySelector('.name-popup__form');
const nameField = document.querySelector('.name-popup__input_type_name');
const nameProfile = document.querySelector('.profile__name');
const descriptionField = document.querySelector('.name-popup__input_type_description');
const descriptionProfile = document.querySelector('.profile__description');

//const newItemPopup = document.querySelector('.new-item');
const newItemPopup = new Popup('.new-item');
const addButton = document.querySelector('.profile__add-button');
const newItemForm = document.querySelector('.new-item__form');
const placeNameField = document.querySelector('.new-item__input_type_name');
const imageField = document.querySelector('.new-item__input_type_link');

// const imagePopup = document.querySelector('.image-popup');
// const bigImage = document.querySelector('.image-popup__image');

window.addEventListener('load', () => {
    document.querySelectorAll('.popup').forEach((popup) => popup.classList.add('popup__transition'));
  })


editButton.addEventListener('click', () => {
    formNameValidator.disableSubmitButtonAndClearInputs();
    nameField.value = nameProfile.textContent;
    descriptionField.value = descriptionProfile.textContent;
    namePopup.open();
})

addButton.addEventListener('click', () => {
    formNewItemValidator.disableSubmitButtonAndClearInputs();
    placeNameField.value = '';
    imageField.value = '';
    newItemPopup.open();
})

function sumbitNameForm(event){
    event.preventDefault();
    nameProfile.textContent = nameField.value;
    descriptionProfile.textContent = descriptionField.value;
    namePopup.close();
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
    newItemPopup.close();
}
newItemForm.addEventListener('submit', sumbitNewItemForm); 