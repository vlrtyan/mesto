class FormValidator{
    constructor(form, config){
        this._config = config;
        this._form = form;
        this._input = this._form.querySelector(this._config.inputSelector);
        this._inputsList = Array.from(this._form.querySelectorAll(this._config.inputSelector));
        this._button = this._form.querySelector(this._config.submitButtonSelector);
    }

    _showError(input){ 
        const errorText = this._form.querySelector(`#${input.id}-error`);
        input.classList.add(this._config.inputErrorClass); 
        errorText.textContent = input.validationMessage; 
        input.classList.add(this._config.inputErrorBorderClass);
        } 
    
    _hideError(input){ 
        const errorText = this._form.querySelector(`#${input.id}-error`);
        input.classList.remove(this._config.inputErrorClass); 
        errorText.textContent = ''; 
        input.classList.remove(this._config.inputErrorBorderClass); 
        }

    _handleFieldValidation(input){ 
        //console.log(this._input.validity);
        if (!input.validity.valid){ 
            this._showError(input); 
        } else { 
            this._hideError(input);
        } 
    }

    _hasNoInputs(){
        return this._inputsList.some(input => input.value.length === 0);
    }

    _submitButtonState(){
        this._button.disabled = !this._form.checkValidity(); 
        this._button.classList.toggle(this._config.submitButtonInvalidClass, (!this._form.checkValidity() || this._hasNoInputs())); 
    }

    _disableButton(){
        this._button.disabled;
        this._button.classList.add(this._config.submitButtonInvalidClass);
    }

    _setFormListener(){ 
        this._form.addEventListener('input', () => this._submitButtonState()); 

        this._inputsList.forEach((input) => { 
        input.addEventListener('input', () => { 
            this._handleFieldValidation(input); 
        }); 
        }); 
        this._submitButtonState(); 
    } 

    disableSubmitButtonAndClearInputs(){
        this._inputsList.forEach((input) => {this._hideError(input)});
        this._disableButton();
        }

    enableValidation(){
        this._setFormListener();
    }
}

export default FormValidator