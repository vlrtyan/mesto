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

function like(event){
    event.target.classList.toggle('element__like-button_clicked');
}

function createCard(item){
    const element = templateCard.querySelector('.element').cloneNode(true);
    element.querySelector('.element__title').innerText = item.name;
    element.querySelector('.element__image').setAttribute('src', item.link);
    element.querySelector('.element__like-button').addEventListener('click', like);
    return element;
}

function addCard(item){
    const element = createCard(item);
    elements.prepend(element);
}

initialCards.forEach (addCard);

const newItem = document.querySelector('.new-item');
const addButton = document.querySelector('.profile__add-button')
const newItemFormCloseButton = document.querySelector('.new-item__close-button');
const newItemForm = document.querySelector('.new-item__form');
const placeNameField = document.querySelector('.new-item__input_type_name');
const placeNameCard = document.querySelector('.element__title');
const imageField = document.querySelector('.new-item__input_type_link');
const imageCard = document.querySelector('.element__image');

function openNewItem(){
    placeNameField.value = '';
    imageField.value = '';
    newItem.classList.add('new-item_opened');
}

function closeNewItem(){
    newItem.classList.remove('new-item_opened')
}

function sumbitNewItemForm(event){
    event.preventDefault();
    const name = placeNameField.value;
    const link = imageField.value;
    const item = {
        name: name,
        link: link
    }
    addCard(item);
    closeNewItem();
}

addButton.addEventListener('click', openNewItem);

newItemFormCloseButton.addEventListener('click', closeNewItem);

newItemForm.addEventListener('submit', sumbitNewItemForm);
