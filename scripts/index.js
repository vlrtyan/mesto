const popup = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit-button');
const popupCloseButton = document.querySelector('.popup__close-button');
const form = document.querySelector('.popup__form');
const nameField = document.querySelector('.popup__input_type_name');
const nameProfile = document.querySelector('.profile__name');
const descriptionField = document.querySelector('.popup__input_type_description');
const descriptionProfile = document.querySelector('.profile__description');

function openPopup(){
    popup.classList.add('popup_opened')
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


