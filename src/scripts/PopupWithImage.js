import Popup from './Popup.js';
export default class PopupWithImage extends Popup {
    constructor(popupSelector){
        super(popupSelector);
        this._bigImage = this._popup.querySelector('.image-popup__image');
    }

    open(title, src){
        this._bigImage.setAttribute('src', src);
        this._bigImage.setAttribute('alt', title);
        this._popup.querySelector('.image-popup__title').textContent = title;
        super.open();
    }
}

