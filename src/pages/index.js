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
const cardsList = new Section({
  renderer: item => {
    cardsList.appendItem(createCard(item));
  },
}, cardsListSection);

//отрисовка страницы
Promise.all([api.getUserData(), api.getInitialCards()])
  .then(([userData, initialCards]) => {
    console.log(userData, initialCards);
    userID = userData._id;
    userInfo.setUserAvatar(userData);
    userInfo.setUserInfo(userData);
    cardsList.renderItems(initialCards);
  })
  .catch(err => {
    console.log(`Ошибка при отрисовке страницы: ${err}`)
  })

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
            card.like();
            card.updateNumberOfLikes(res);
          })
          .catch(err => console.log(`Ошибка при удалении лайка: ${err}`))
      } else {
        api.putLike(item)
          .then(res => {
            item = res;
            console.log('Like');
            card.like();
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
formChangeAvatarValidator.enableValidation();

//создание попапов
const namePopup = new PopupWithForm('.name-popup', editProfile);
const newItemPopup = new PopupWithForm('.new-item', addCard);
const changeAvatarPopup = new PopupWithForm('.avatar', changeAvatar);

//редактирование профиля
function editProfile() {
  namePopup.renderLoading(true);
  api.editUserData({
    name: nameField.value,
    about: descriptionField.value
  })
    .then((res) => {
      userInfo.setUserInfo(res);
      namePopup.close();
    })
    .catch(err => console.log(`Ошибка при редактировании профиля: ${err}`))
    .finally(() => { namePopup.renderLoading(false) });

}

//изменение аватара
function changeAvatar() {
  changeAvatarPopup.renderLoading(true);
  api.changeAvatar({
    avatar: avatarLinkField.value
  })
    .then((res) => {
      userInfo.updateUserInfo(res);
      changeAvatarPopup.close();
    })
    .catch(err => console.log(`Ошибка при изменении аватара: ${err}`))
    .finally(() => { changeAvatarPopup.renderLoading(false) })
}

//добавление новой карточки
function addCard() {
  const name = placeNameField.value;
  const link = imageField.value;
  const item = {
    name, link
  }
  newItemPopup.renderLoading(true);
  api.addNewItem(item)
    .then(card => {
      cardsList.prependItem(createCard(card));
      newItemPopup.close();
    })
    .catch(err => console.log(`Ошибка при добавлении новой карточки: ${err}`))
    .finally(() => newItemPopup.renderLoading(false));

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