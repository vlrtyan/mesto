import './index.css';
import Card from '../scripts/Card.js';
import FormValidator from '../scripts/FormValidator.js';
import Section from '../scripts/Section.js';
import PopupWithImage from '../scripts/PopupWithImage.js';
import PopupWithForm from '../scripts/PopupWithForm.js';
import UserInfo from '../scripts/UserInfo.js';
import {initialCards, config, editButton, nameField, nameProfile, descriptionField, descriptionProfile, addButton, placeNameField, imageField, cardsListSection, cardTemplateSelector} from '../utils/constants.js';

const cardsList = new Section({
  items: initialCards,
  renderer: item => {
    createCard(item);
  },
},
cardsListSection);

cardsList.renderItems(); //отрисовка карточек

const popupWithImage = new PopupWithImage('.image-popup');

function createCard(item){ 
  const card = new Card(item.name, item.link, cardTemplateSelector, () => {
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
const newItemPopup = new PopupWithForm('.new-item', addCard);

const userInfo = new UserInfo({ userNameSelector: nameProfile, profileDescriptionSelector: descriptionProfile });

function editProfile(newUserInfo){
  userInfo.setUserInfo(newUserInfo);
  namePopup.close();
}

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
    formNameValidator.resetForm();
    const userData = userInfo.getUserInfo();
    nameField.value = userData.name;
    descriptionField.value = userData.description;
    namePopup.open();
})

addButton.addEventListener('click', () => {
    formNewItemValidator.resetForm();
    placeNameField.value = '';
    imageField.value = '';
    newItemPopup.open();
})