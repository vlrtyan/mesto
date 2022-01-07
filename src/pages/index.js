import './index.css';
import Card from '../scripts/Card.js';
import FormValidator from '../scripts/FormValidator.js';
import Section from '../scripts/Section.js';
import PopupWithImage from '../scripts/PopupWithImage.js';
import PopupWithForm from '../scripts/PopupWithForm.js';
import PopupWithConfirm from '../scripts/PopupWithConfirm.js';
import UserInfo from '../scripts/UserInfo.js';
import { config, editButton, nameField, nameProfile, descriptionField, descriptionProfile, addButton, placeNameField, imageField, cardsListSection, cardTemplateSelector, changeAvatarButton, avatarLinkField, avatar } from '../utils/constants.js';
import Api from '../scripts/Api.js';


let userID;
const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-32',
  token: 'f7e9f27f-efd9-4384-a381-5bfd59f30ca5'
})

const userInfo = new UserInfo({ userNameSelector: nameProfile, profileDescriptionSelector: descriptionProfile, avatarSelector: avatar });

//загрузить данные профиля с сервера
api.getUserData()
.then(res => userInfo.updateUserInfo(res))
.catch(err => console.log(`Ошибка при обновалении данных профиля: ${err}`))

//отрисовка карточек с сервера
function renderInitialCards() {
  Promise.all([api.getUserData(), api.getInitialCards()])
    .then(([userData, initialCards]) => {
      console.log(userData, initialCards);
      userID = userData._id;
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

//создание попапов
const popupWithImage = new PopupWithImage('.image-popup');
const confirmPopup = new PopupWithConfirm('.confirm');

//создание карточки
function createCard(item) {
  const card = new Card(item, cardTemplateSelector, {
    handleCardClick: () => {
      popupWithImage.open(item.name, item.link);
    },
    handleCardDelete: () => {
      confirmPopup.open();
      confirmPopup.handleConfirmButton(() => {
        api.deleteCard(item)
          .then(item => {
            console.log(item);
            card.delete();
          })
          .catch(err => console.log(`Ошибка при удалении карточки: ${err}`));
      });
    },
    handleCardLike: () => {
      if (item.likes.some(like => like._id === userID)) {
        api.removeLike(item)
          .then(res => {
            item = res;
            console.log('Unlike');
            card.updateNumberOfLikes(res);
          })
          .catch(err => console.log(`Ошибка при удалении лайка: ${err}`))
      } else {
        api.putLike(item)
          .then(res => {
            item = res;
            console.log('Like');
            card.updateNumberOfLikes(res);
          })
          .catch(err => console.log(`Ошибка при постановке лайка: ${err}`))
      }
    }
  }, userID);
  const cardElement = card.generateCard();
  return cardElement;
}


//валидация форм
const formNameValidator = new FormValidator(document.querySelector('.name-popup__form'), config);
formNameValidator.enableValidation();
const formNewItemValidator = new FormValidator(document.querySelector('.new-item__form'), config);
formNewItemValidator.enableValidation();
const formChangeAvatarValidator = new FormValidator(document.querySelector('.avatar__form'), config);

//создание попапов
const namePopup = new PopupWithForm('.name-popup', editProfile);
const newItemPopup = new PopupWithForm('.new-item', addCard);
const changeAvatarPopup = new PopupWithForm('.avatar', changeAvatar);





//редактирование профиля
function editProfile(newUserInfo) {
  userInfo.setUserInfo(newUserInfo);
  namePopup.close();

  api.editUserData({
    name: userInfo.getUserInfo().name,
    about: userInfo.getUserInfo().description
  })
    .then(res => {
      console.log(res)
    })
    .catch(err => console.log(`Ошибка при редактировании профиля: ${err}`));
}

//изменение аватара
function changeAvatar() {
  api.changeAvatar({
    avatar: avatarLinkField.value
  })
    .then((res) => {
      userInfo.updateUserInfo(res);
    })
}

//добавление новой карточки
function addCard() {
  const name = placeNameField.value;
  const link = imageField.value;
  const item = {
    name, link
  }
  Promise.all([api.getUserData(), api.addNewItem(item)])
    .then(([userData, newItem]) => {
      console.log(newItem);
      const user = userData;
      const cardsList = new Section({
        items: newItem,
        renderer: (item) => {
          cardsList.addItem(createCard(item));
        },
      }, cardsListSection);
      cardsList.renderItems();
      newItemPopup.close();
    })
    .catch(err => console.log(`Ошибка при добавлении новой карточки: ${err}`))
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

changeAvatarButton.addEventListener('click', () => {
  formChangeAvatarValidator.resetForm();
  avatarLinkField.value = '';
  changeAvatarPopup.open();
})