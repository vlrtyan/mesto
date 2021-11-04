const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    inputErrorClass: 'popup__input_invalid',
    inputErrorBorderClass: 'popup__input_type_error',
    submitButtonSelector: '.popup__submit-button',
    submitButtonInvalidClass: 'popup__submit-button_invalid'
}

function enableValidation(validationConfig){
    const forms = Array.from(document.querySelectorAll(validationConfig.formSelector));
    forms.forEach((form) => setFormListener(form, validationConfig));
}

function setFormListener(form, config){
    form.addEventListener('submit', handleSubmitButton);
    form.addEventListener('input', () => submitButtonState(form, config));

    const inputs = Array.from(form.querySelectorAll(config.inputSelector));
    inputs.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            handleFieldValidation(inputElement, form, config);
        });
    });
    submitButtonState(form, config);
}

function handleFieldValidation(input, form, config){
    //console.log(input.validity);

    if (!input.validity.valid){
        showError(input, form, config);
    } else {
        hideError(input, form, config);
    }
}

function showError(input, form, config){
    const errorText = form.querySelector(`#${input.id}-error`);
    input.classList.add(config.inputErrorClass);
    errorText.textContent = input.validationMessage;
    input.classList.add(config.inputErrorBorderClass);
}

function hideError(input, form, config){
    const errorText = form.querySelector(`#${input.id}-error`);
    input.classList.remove(config.inputErrorClass);
    errorText.textContent = '';
    input.classList.remove(config.inputErrorBorderClass);
}

function handleSubmitButton(event){
    event.preventDefault();
}

function submitButtonState(form, config){
    const button = form.querySelector(config.submitButtonSelector);
    button.disabled = !form.checkValidity();
    button.classList.toggle(config.submitButtonInvalidClass, !form.checkValidity());
}

enableValidation(config);