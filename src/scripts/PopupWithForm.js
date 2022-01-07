import Popup from './Popup.js';
export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitForm){
        super(popupSelector)
        this._submitForm = submitForm;
        this._form = this._popup.querySelector('.popup__form');
        this._inputsList = Array.from(this._form.querySelectorAll('.popup__input'));
        this._submit = this._submit.bind(this);
        this._sumbitButton = this._form.querySelector('.popup__submit-button');
    }

    _getInputValues(){
        this._formInputValues = {};
        this._inputsList.forEach((input) => {
            this._formInputValues[input.name] = input.value;
        });
        return this._formInputValues;
    }

    _submit(event){
        event.preventDefault();
        this._submitForm(this._getInputValues());
    }

    renderLoading(isLoading){
        if (isLoading){
            this._sumbitButton.textContent = 'Сохранение...'
        } else {
            this._sumbitButton.textContent = 'Сохранить'
        }
    }

    setEventListeners(){
        super.setEventListeners();
        this._popup.addEventListener('submit', this._submit);
    }

    close(){
        super.close();
        this._form.reset();
    }
}