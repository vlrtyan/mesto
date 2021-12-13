import { openPopup } from '/scripts/index.js'

class Card {
    constructor(name, link, template){
        this._name = name;
        this._link = link;
        this._view = templateCard.content.querySelector('.element').cloneNode(true);
        this._delete = this._delete.bind(this);
        this._like = this._like.bind(this);
        this._openImagePopup = this._openImagePopup.bind(this);
        this._imagePopup = document.querySelector('.image-popup');
        this._bigImage = document.querySelector('.image-popup__image');
    }

    _delete(){
        this._view.remove();
    }
    _like(){
        this._view.querySelector('.element__like-button').classList.toggle('element__like-button_clicked');
    }
    
    _openImagePopup(event){
        this._bigImage.setAttribute('src', event.target.getAttribute('src'));
        this._bigImage.setAttribute('alt', event.target.closest('.element').textContent);
        this._imagePopup.querySelector('.image-popup__title').textContent = event.target.closest('.element').textContent;
        openPopup(this._imagePopup);
    }
    
    generateCard(){
        this._view.querySelector('.element__title').innerText = this._name;
        this._view.querySelector('.element__image').setAttribute('src', this._link);
        this._view.querySelector('.element__image').setAttribute('alt', this._name);
        this._view.querySelector('.element__like-button').addEventListener('click', this._like);
        this._view.querySelector('.element__delete-button').addEventListener('click', this._delete);
        this._view.querySelector('.element__image').addEventListener('click', this._openImagePopup);
        return this._view;
    }
}

export default Card;