import './index.css';
import Card from '../scripts/Card.js';
import FormValidator from '../scripts/FormValidator.js';
import Section from '../scripts/Section.js';
import PopupWithImage from '../scripts/PopupWithImage.js';
import PopupWithForm from '../scripts/PopupWithForm.js';
import UserInfo from '../scripts/UserInfo.js';
import {initialCards, config, editButton, nameField, nameProfile, descriptionField, descriptionProfile, addButton, placeNameField, imageField, cardsListSection, cardTemplateSelector} from '../utils/constants.js';
import Api from '../scripts/Api.js';
import UserID from '../scripts/UserID';
import { data } from 'autoprefixer';


const userID = new UserID();
console.log(userID);

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-32',
  token: 'f7e9f27f-efd9-4384-a381-5bfd59f30ca5'
})

api.getUserData()
.then(res => {
  console.log(res)
})
.catch(err => {
  console.log(err)
})

api.getInitialCards()
.then(res => {
  console.log(res)
})
.catch(err => {
  console.log(err)
})


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
  //API
  api.editUserData({
    ...data,
    name: userInfo.getUserInfo().name,
    about: userInfo.getUserInfo().description
  })
  .then(res => {
    console.log(res)
  })
  .catch(err => console.log(`Ошибка при редактировании профиля: ${err}`));
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