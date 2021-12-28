import '../pages/index.css';
import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';
import {initialCards, config, editButton, nameField, nameProfile, descriptionField, descriptionProfile, addButton, placeNameField, imageField, cardsListSection, cardTemplateSelector} from '../utils/constants.js';

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

const userInfo = new UserInfo({ userNameSelector: nameProfile, profileDescriptionSelector: descriptionProfile });


function editProfile(newUserInfo){
  userInfo.setUserInfo(newUserInfo);
  // nameProfile.textContent = nameField.value;
  // descriptionProfile.textContent = descriptionField.value;
  namePopup.close();
}

const newItemPopup = new PopupWithForm('.new-item', addCard);


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
    const userData = userInfo.getUserInfo();
    console.log(userData);
    nameField.value = userData.name;
    descriptionField.value = userData.description;
    namePopup.open();
})

addButton.addEventListener('click', () => {
    formNewItemValidator.disableSubmitButtonAndClearInputs();
    placeNameField.value = '';
    imageField.value = '';
    newItemPopup.open();
})