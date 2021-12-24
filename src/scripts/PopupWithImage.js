import Popup from './Popup.js';
export default class PopupWithImage extends Popup {
    constructor(popupSelector){
        super(popupSelector);
        this._bigImage = this._popup.querySelector('.image-popup__image');
    }

    open(event){
        this.setEventListeners();
        this._bigImage.setAttribute('src', event.target.getAttribute('src'));
        this._bigImage.setAttribute('alt', event.target.closest('.element').textContent);
        this._popup.querySelector('.image-popup__title').textContent = event.target.closest('.element').textContent;
        this._popup.classList.add('popup_opened');
    }
}

