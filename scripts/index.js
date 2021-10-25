const popup = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit-button');
const popupCloseButton = document.querySelector('.popup__close-button');
const form = document.querySelector('.popup__form');
const nameField = document.querySelector('.popup__input_type_name');
const nameProfile = document.querySelector('.profile__name');
const descriptionField = document.querySelector('.popup__input_type_description');
const descriptionProfile = document.querySelector('.profile__description');

function openPopup(){
    nameField.value = nameProfile.textContent;
    descriptionField.value = descriptionProfile.textContent;
    popup.classList.add('popup_opened');
}

function closePopup(){
    popup.classList.remove('popup_opened')
}

function sumbitForm(event){
    event.preventDefault();
    nameProfile.textContent = nameField.value;
    descriptionProfile.textContent = descriptionField.value;
    closePopup();

}

editButton.addEventListener('click', openPopup)

popupCloseButton.addEventListener('click', closePopup)

form.addEventListener('submit', sumbitForm)


const newItem = document.querySelector('.new-item');
const addButton = document.querySelector('.profile__add-button')
const newItemFormCloseButton = document.querySelector('.new-item__close-button');
const newItemForm = document.querySelector('.new-item__form');
const placeNameField = document.querySelector('.new-item__input_type_name');
const placeNameCard = document.querySelector('.element__title');
const imageField = document.querySelector('.new-item__input_type_link');
const imageCard = document.querySelector('.element__image');

function openNewItem(){
    placeNameField.value = placeNameCard.textContent;
    imageField.value = imageCard.textContent;
    newItem.classList.add('new-item_opened');
}

function closeNewItem(){
    newItem.classList.remove('new-item_opened')
}

function sumbitNewItemForm(event){
    event.preventDefault();
    placeNameCard.textContent = placeNameField.value;
    imageCard.textContent = imageField.value;
    closePopup();

}

addButton.addEventListener('click', openNewItem)

newItemFormCloseButton.addEventListener('click', closeNewItem)

newItemForm.addEventListener('submit', sumbitNewItemForm)

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


const templateCard = document.querySelector('.template').content;
