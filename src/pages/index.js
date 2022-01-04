import './index.css';
import Card from '../scripts/Card.js';
import FormValidator from '../scripts/FormValidator.js';
import Section from '../scripts/Section.js';
import PopupWithImage from '../scripts/PopupWithImage.js';
import PopupWithForm from '../scripts/PopupWithForm.js';
import UserInfo from '../scripts/UserInfo.js';
import {config, editButton, nameField, nameProfile, descriptionField, descriptionProfile, addButton, placeNameField, imageField, cardsListSection, cardTemplateSelector} from '../utils/constants.js';
import Api from '../scripts/Api.js';

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-32',
  token: 'f7e9f27f-efd9-4384-a381-5bfd59f30ca5'
})

//отрисовка краточек с сервера
function renderInitialCards(){
Promise.all([api.getUserData(), api.getInitialCards()])
.then(([userData, initialCards]) => {
  console.log(userData, initialCards);
  const user = userData;
  const cardsList = new Section({
    items: initialCards,
    renderer: item => {
      cardsList.addItem(createCard(item));
    },
  }, cardsListSection);
  cardsList.renderItems();
})
.catch(err => {
  console.log(err)
})
}

renderInitialCards();

const popupWithImage = new PopupWithImage('.image-popup');

function createCard(item){ 
  const card = new Card(item.name, item.link, cardTemplateSelector, () => {
    popupWithImage.open(item.name, item.link);
  });
  const cardElement = card.generateCard(); 
  return cardElement;
}

const formNameValidator = new FormValidator(document.querySelector('.name-popup__form'), config);
formNameValidator.enableValidation();
const formNewItemValidator = new FormValidator(document.querySelector('.new-item__form'), config);
formNewItemValidator.enableValidation();


const namePopup = new PopupWithForm('.name-popup', editProfile);
const newItemPopup = new PopupWithForm('.new-item', addCard);

const userInfo = new UserInfo({ userNameSelector: nameProfile, profileDescriptionSelector: descriptionProfile });

//редактирование профиля
function editProfile(newUserInfo){
  userInfo.setUserInfo(newUserInfo);
  namePopup.close();
//отправка данных на сервер
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