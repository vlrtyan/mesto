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
const templateCard = document.querySelector('#templateCard').content;

function createCard(item){
    const element = templateCard.querySelector('.element').cloneNode(true);
    element.querySelector('.element__title').innerText = item.name;
    element.querySelector('.element__image').setAttribute('src', item.link);
    element.querySelector('.element__image').setAttribute('alt', item.name);
    element.querySelector('.element__like-button').addEventListener('click', like);
    element.querySelector('.element__delete-button').addEventListener('click', deleteCard);
    element.querySelector('.element__image').addEventListener('click', openImagePopup);

    return element;
}

function deleteCard(event){
    event.target.closest('.element').remove();
}

function like(event){
    event.target.classList.toggle('element__like-button_clicked');
}

function addCard(item){
    const element = createCard(item);
    elements.prepend(element);
}

initialCards.forEach (addCard);

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

document.addEventListener('keydown', escHandler);

function openPopup(popup){
    popup.classList.add('popup_opened');
}

function closePopup(popup){ 
    popup.classList.remove('popup_opened');
}
popupArray.forEach((popup) => {
  popup.addEventListener('mouseup', popupClickHandler);
});

function popupClickHandler(event){
  if (event.target.classList.contains('popup')){
    closePopup(event.target.closest('.popup'));
  };
}

function escHandler(event){
  if (event.key === 'Escape'){
    popupArray.forEach((popup) => {
      if (popup.classList.contains('popup_opened')){
      closePopup(popup)};
  });
}}

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