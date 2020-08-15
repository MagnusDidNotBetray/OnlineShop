function toggleChecked(){
    const checkbox = document.querySelector('.sign__checkbox');
    let focus = false;
    checkbox.dataset.checked = 'false';
    checkbox.addEventListener('click', ({target}) => {
        checkbox.dataset.checked === 'true' ? checkbox.dataset.checked = 'false' : checkbox.dataset.checked = 'true';
    });
    checkbox.addEventListener('focus', ({target}) => {
        focus = true;
    });
    checkbox.addEventListener('blur', ({target}) => {
        focus = false;
    });
    checkbox.addEventListener('keypress', ({code}) => {
        if(focus && code.toLowerCase() === 'space'){
            checkbox.dataset.checked === 'true' ? checkbox.dataset.checked = 'false' : checkbox.dataset.checked = 'true';
        }
    });
}

function visibilityPassword(){
    const visibilityButtons = [...document.querySelectorAll('.input-wrapper__visibility-button')];
    visibilityButtons.forEach(elem => {
        let input = elem.parentElement.querySelector('.sign-input');
        elem.addEventListener('click', () => {
            if (input.type === 'password'){
                input.type = 'text';
                elem.classList.add('input-wrapper__visibility-button--active');
            }
            else{
                input.type = 'password';
                elem.classList.remove('input-wrapper__visibility-button--active');
            }
        });
    });
}

class RegisterPasswordInputsValidator{
    constructor(createInput, confirmInput){
        this.createInput = createInput;
        this.confirmInput = confirmInput;
        this.createInputErrorMessage = createInput.parentElement.querySelector('.input-wrapper__error-message');
        this.confirmInputErrorMessage = confirmInput.parentElement.querySelector('.input-wrapper__error-message');
    }
    isValidPassword(password){
        if (/\d/.test(password) && /[a-z]/.test(password) && /[A-Z]/.test(password) && password.length >= 8){
                return true;
        }
        else return false;
    }
    validationCreateInput(){
        if (!this.isValidPassword(this.createInput.value)){
            this.createInput.classList.add('sign-input--error');
            this.createInputErrorMessage.classList.add('input-wrapper__error-message--active');
        }
        else{
            this.createInput.classList.remove('sign-input--error');
            this.createInputErrorMessage.classList.remove('input-wrapper__error-message--active');
        }
    }
    validationConfirmInput(){
        if (this.createInput.value !== this.confirmInput.value){
            this.confirmInput.classList.add('sign-input--error');
            this.confirmInputErrorMessage.classList.add('input-wrapper__error-message--active');
        }
        else{
            this.confirmInput.classList.remove('sign-input--error');
            this.confirmInputErrorMessage.classList.remove('input-wrapper__error-message--active');
        }
    }
    init(){
        this.createInput.addEventListener('input', () => {
            this.validationCreateInput();
            if (this.confirmInput.value){
                this.validationConfirmInput();
            }
        });
        this.confirmInput.addEventListener('input', () => this.validationConfirmInput());
    }
}

class InputTypeEmailValidator{
    constructor(input){
        this.inputTypeEmail = input;
        this.errorMessage = input.parentElement.querySelector('.input-wrapper__error-message');
    }
    isValidEmail(email){
        const emailRegexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return emailRegexp.test(String(email).toLowerCase());
    }
    validationInputTypeEmail(){
        if(!this.isValidEmail(this.inputTypeEmail.value)){
            this.inputTypeEmail.classList.add('sign-input--error');
            this.errorMessage.classList.add('input-wrapper__error-message--active');
        }
        else{
            this.inputTypeEmail.classList.remove('sign-input--error');
            this.errorMessage.classList.remove('input-wrapper__error-message--active');
        }
    }
    init(){
        this.inputTypeEmail.addEventListener('input', () => this.validationInputTypeEmail());
    }
}

function loginFormValidation(){
    const form = document.forms['login-form'];
    const inputEmail = form.elements['email-login'];
    const emailErrorMessage = inputEmail.parentElement.querySelector('.input-wrapper__error-message');
    const inputPassword = form.elements['password-login'];
    const passwordErrorMessage = inputPassword.parentElement.querySelector('.input-wrapper__error-message');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (inputEmail.value.trim() !== '' && inputPassword.value.trim()){
            emailErrorMessage.classList.remove('input-wrapper__error-message--active');
            passwordErrorMessage.classList.remove('input-wrapper__error-message--active');
            //submit...
        }
        else{
            if (inputEmail.value.trim() === ''){
                emailErrorMessage.classList.add('input-wrapper__error-message--active');
            }
            if (inputPassword.value.trim() === ''){
                passwordErrorMessage.classList.add('input-wrapper__error-message--active');
            }
        }
    });
}

function registerFormValidation(){
    const registerForm = document.forms['register-form'];
    const registerEmail = new InputTypeEmailValidator(registerForm.elements['register-email']);
    registerEmail.init();
    const registerPasswords = new RegisterPasswordInputsValidator(registerForm.elements['create-password'], registerForm.elements['confirm-password']);
    registerPasswords.init();
    registerForm.addEventListener('submit', e => {
        e.preventDefault();
        if (registerEmail.isValidEmail(registerEmail.inputTypeEmail.value) &&
            registerPasswords.isValidPassword(registerPasswords.createInput.value) &&
            registerPasswords.createInput.value === registerPasswords.confirmInput.value){
                //submit...
        }
        else{
            if (!registerEmail.isValidEmail(registerEmail.inputTypeEmail.value)){
                registerEmail.validationInputTypeEmail();
            }
            if (!registerPasswords.isValidPassword(registerPasswords.createInput.value)){
                registerPasswords.validationCreateInput();
            }
            if (registerPasswords.createInput.value !== registerPasswords.confirmInput.value){
                registerPasswords.validationConfirmInput();
            }
        }
    });
}

function autoFocus(){
    const scrollToElem = elem => {
        window.scrollBy(0, elem.getBoundingClientRect().y / 2);
        elem.focus();
    }
    if (localStorage.sign === 'up'){
        scrollToElem(document.forms['register-form'].elements[0]);
    }
    else if (localStorage.sign === 'in'){
        scrollToElem(document.forms['login-form'].elements[0]);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    toggleChecked();
    visibilityPassword();
    loginFormValidation();
    registerFormValidation();
    autoFocus();
});