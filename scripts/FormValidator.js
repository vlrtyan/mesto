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

    _handleSubmitButton(event){ 
        event.preventDefault(); 
    }

    _submitButtonState(){
        this._button.disabled = !this._form.checkValidity(); 
        this._button.classList.toggle(this._config.submitButtonInvalidClass, !this._form.checkValidity()); 
    }

    _setFormListener(){ 
        this._form.addEventListener('submit', () => this._handleSubmitButton()); 
        this._form.addEventListener('input', () => this._submitButtonState()); 

        this._inputsList.forEach((input) => { 
        input.addEventListener('input', () => { 
            this._handleFieldValidation(input); 
        }); 
        }); 
        this._submitButtonState(); 
    } 

    checkSubmitButtonAndClearInputs(){
        this._inputsList.forEach((input) => {this._hideError(input)});
        this._submitButtonState();
        }

    enableValidation(){
        this._setFormListener();
    }
}

export default FormValidator