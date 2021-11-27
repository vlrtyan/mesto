import Card from '/scripts/Card.js';
import FormValidator from '/scripts/FormValidator.js';

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

initialCards.forEach((item) => {
  const card = new Card(item.name, item.link);
  const cardElement = card.generateCard();
  elements.prepend(cardElement);
})


function createCard(item){
  const card = new Card(item, template);
  return card;
}






function addCard(item){
    const element = createCard(item);
    
}


const popupArray = Array.from(document.querySelectorAll('.popup'));
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
const placeNameCard = document.querySelector('.element__title');
const imageField = document.querySelector('.new-item__input_type_link');
const imageCard = document.querySelector('.element__image');

const imagePopup = document.querySelector('.image-popup');
const bigImage = document.querySelector('.image-popup__image');

window.addEventListener('load', () => {
    document.querySelectorAll('.popup').forEach((popup) => popup.classList.add('popup__transition'));
  })

function popupClickHandler(event) {
  if (event.target.classList.contains('popup')) {
    closePopup(event.target.closest('.popup'));
  };
}

function escHandler(event) {
  const openedPopup = document.querySelector('.popup_opened');
  if (event.key === 'Escape') {
    //console.log('closed');
    closePopup(openedPopup);
  };
}

function openPopup(popup){
    document.addEventListener('keydown', escHandler);
    popup.addEventListener('mouseup', popupClickHandler);
    popup.classList.add('popup_opened');
}

function closePopup(popup){ 
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', escHandler);
    popup.removeEventListener('mouseup', popupClickHandler);
}

function openImagePopup(event){
    bigImage.setAttribute('src', event.target.getAttribute('src'));
    bigImage.setAttribute('alt', event.target.closest('.element').textContent);
    document.querySelector('.image-popup__title').textContent = event.target.closest('.element').textContent;
    openPopup(imagePopup);
}

editButton.addEventListener('click', () => {
    nameField.value = nameProfile.textContent;
    descriptionField.value = descriptionProfile.textContent;
    openPopup(namePopup);
})

addButton.addEventListener('click', () => {
    placeNameField.value = '';
    imageField.value = '';
    openPopup(newItemPopup);
})

const closeButton = document.querySelectorAll('.popup__close-button');
for (let i = 0; i < closeButton.length; i++) {
   closeButton[i].addEventListener('click', function() {
      const popup = closeButton[i].closest('.popup');
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
    addCard(item);
    closePopup(newItemPopup);
}
newItemForm.addEventListener('submit', sumbitNewItemForm); 