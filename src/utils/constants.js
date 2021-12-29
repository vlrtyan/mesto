export const initialCards = [
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

export const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    inputErrorClass: 'popup__input_invalid',
    inputErrorBorderClass: 'popup__input_type_error',
    submitButtonSelector: '.popup__submit-button',
    submitButtonInvalidClass: 'popup__submit-button_invalid',
  }

//попап редактирования профиля
export const editButton = document.querySelector('.profile__edit-button');
export const nameField = document.querySelector('.name-popup__input_type_name');
export const nameProfile = document.querySelector('.profile__name');
export const descriptionField = document.querySelector('.name-popup__input_type_description');
export const descriptionProfile = document.querySelector('.profile__description');

//попап добавления карточек
export const addButton = document.querySelector('.profile__add-button');
export const placeNameField = document.querySelector('.new-item__input_type_name');
export const imageField = document.querySelector('.new-item__input_type_link');
export const cardsListSection = '.elements';
export const cardTemplateSelector = '#templateCard';