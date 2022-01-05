import Popup from './Popup.js';

export default class PopupWithConfirm extends Popup {
    constructor(popupSelector){
        super(popupSelector);
        this._confirmButton = this._popup.querySelector('.popup__submit-button');
    }

    _submit(event){
        event.preventDefault();
    }

    handleConfirmButton(action){
        this._pressConfirmButton = action;
        this._confirmButton.addEventListener('click', this._pressConfirmButton);
    }

    setEventListeners(){
        super.setEventListeners();
        this._popup.addEventListener('submit', this._submit);
        this._confirmButton.addEventListener('click', this.close)
    }
}