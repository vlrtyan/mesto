import '../pages/index.css';
import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';

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

const cardTemplateSelector = '#templateCard';

const cardsList = new Section({
  items: initialCards,
  renderer: item => {
    const card = new Card(item.name, item.link, cardTemplateSelector, () => {
      const popupWithImage = new PopupWithImage('.image-popup');
      popupWithImage.open(item.name, item.link);
    });
    const cardElement = card.generateCard();
    cardsList.addItem(cardElement);
  },
},
cardsListSection);

cardsList.renderItems(); //отрисовка карточек

function createCard(item){ 
  const card = new Card(item.name, item.link, cardTemplateSelector, () => {
    const popupWithImage = new PopupWithImage('.image-popup');
    popupWithImage.open(item.name, item.link);
  });
  const cardElement = card.generateCard(); 
  cardsList.addItem(cardElement); 
}

const formNameValidator = new FormValidator(document.querySelector('.name-popup__form'), config);
formNameValidator.enableValidation();
const formNewItemValidator = new FormValidator(document.querySelector('.new-item__form'), config);
formNewItemValidator.enableValidation();


const namePopup = new PopupWithForm('.name-popup', editProfile);
const editButton = document.querySelector('.profile__edit-button');
const nameField = document.querySelector('.name-popup__input_type_name');
const nameProfile = document.querySelector('.profile__name');
const descriptionField = document.querySelector('.name-popup__input_type_description');
const descriptionProfile = document.querySelector('.profile__description');

const userInfo = new UserInfo({ userNameSelector: nameField, profileDescriptionSelector: descriptionField });

userInfo.check() //проверка
//console.log(userInfo.getUserInfo())



function editProfile(newUserInfo){
  userInfo.setUserInfo(newUserInfo);
  // nameProfile.textContent = nameField.value;
  // descriptionProfile.textContent = descriptionField.value;
  namePopup.close();
}

const newItemPopup = new PopupWithForm('.new-item', addCard);
const addButton = document.querySelector('.profile__add-button');
const placeNameField = document.querySelector('.new-item__input_type_name');
const imageField = document.querySelector('.new-item__input_type_link');

function addCard(){
  const name = placeNameField.value;
    const link = imageField.value;
    const item = {
        name, link
    }
    createCard(item);
    newItemPopup.close();
}

window.addEventListener('load', () => {
    document.querySelectorAll('.popup').forEach((popup) => popup.classList.add('popup__transition'));
  })


editButton.addEventListener('click', () => {
    formNameValidator.disableSubmitButtonAndClearInputs();
    userInfo.getUserInfo();
    // nameField.value = nameProfile.textContent;
    // descriptionField.value = descriptionProfile.textContent;
    namePopup.open();
})

addButton.addEventListener('click', () => {
    formNewItemValidator.disableSubmitButtonAndClearInputs();
    placeNameField.value = '';
    imageField.value = '';
    newItemPopup.open();
})


