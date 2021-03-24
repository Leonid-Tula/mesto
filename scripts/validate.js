const showInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add('popup__name-field_type_error');
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add('popup__form-error_type_visible');
    //console.log('showInputError');
};
const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    //console.log('errorElement ' + formElement.querySelector());
    inputElement.classList.remove('popup__name-field_type_error');
    errorElement.classList.remove('popup__form-error_type_visible');
    errorElement.textContent = "";
    //console.log('hideInputError');
};

const hasInvalidInput = (inputList) => {
    const invalidInput = inputList.some(inputElement => 
        !inputElement.validity.valid);
        //console.log('invalidInput ' + invalidInput);
    return invalidInput;
};

const toggleButtonSubmit = (inputList, submitButton) => {
    if (hasInvalidInput(inputList)) {
        submitButton.classList.add('popup__submit-button_invalid');
        submitButton.setAttribute('disabled', true);
        //console.log('invalid submitButton');
    } else {
        submitButton.classList.remove('popup__submit-button_invalid');
        submitButton.removeAttribute('disabled');
        //console.log('valid submitButton');
    };
};


const checkInputElement = function (formElement, inputElement) {
    if (inputElement.validity.valid){
        
        //выкл ошибку и кр цвет
        //console.log(inputElement.validity.valid + '//выкл ошибку и кр цвет');
        hideInputError(formElement, inputElement);
    } else {
        //вкл ошибку и кр цвет
        //console.log(inputElement.validity.valid + '//вкл ошибку и кр цвет');
        showInputError(formElement, inputElement);
    };
};

const setInputListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__name-field'));
    const submitButton = formElement.querySelector('.popup__submit-button');
    //console.log ('inputList ' + inputList);
    inputList.forEach(
        inputElement => {
            inputElement.addEventListener('input', function () {
                //console.log('inputElement ' + inputElement.value);
                // Проверка валидности поля
                checkInputElement(formElement, inputElement);
                // Вкл/ выкл кнопки submit
                toggleButtonSubmit(inputList, submitButton);
                //console.log('input listeners');
            });
            toggleButtonSubmit(inputList, submitButton);
        }
    );
};

const enablevalidation = () =>{
    const formList = Array.from(document.querySelectorAll('.popup__form'));
    //console.log('formList ' + formList.length);
    formList.forEach(
        formElement => {
            formElement.addEventListener('submit', function (evt) {
                evt.preventDefault();
                //console.log('formElement addlistener');
            });
            setInputListeners (formElement);
            //console.log('formElement' + formElement);
        }
    );
};

enablevalidation();