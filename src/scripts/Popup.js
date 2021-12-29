export default class Popup {
    constructor(popupSelector){
        this._popup = document.querySelector(popupSelector);
        this._closeButton = this._popup.querySelector('.popup__close-button');
        this.close = this.close.bind(this);
        this._handleEscClose = this._handleEscClose.bind(this);
        this._handleOutsideClick = this._handleOutsideClick.bind(this);
    }
    
    _handleEscClose(event){
        if (event.key === 'Escape') {
            this.close();
        };
    }

    _handleOutsideClick(event){
        if (event.target.classList.contains('popup')) {
            this.close();
          };
    }

    open(){
        this._popup.classList.add('popup_opened');
        this.setEventListeners();
    }

    close(){
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
        this._popup.removeEventListener('mouseup', this._handleOutsideClick);
        this._closeButton.removeEventListener('click', this.close)
    }

    setEventListeners(){
        this._popup.addEventListener('mouseup', this._handleOutsideClick);
        document.addEventListener('keydown', this._handleEscClose);
        this._closeButton.addEventListener('click', this.close)
    }
}