// Находим форму в DOM
let formElement = document.querySelector ('.popup');// Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
let form = formElement.querySelector('.popup__container')
let nameInput = formElement.querySelector('.popup__name-field');// Воспользуйтесь инструментом .querySelector()
let jobInput = formElement.querySelector('.popup__description-field');// Воспользуйтесь инструментом .querySelector()
let profileName = document.querySelector('.profile__title'); // Имя профиля
let profileDescription = document.querySelector('.profile__description') // Описание профиля

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

   
                                                // Получите значение полей jobInput и nameInput из свойства value
    if (nameInput.value !== "" || jobInput.value !== "") {
        console.log('Форма отправлена');
    };
    
    if (nameInput.value !== ""){
        console.log('fullname: ' + nameInput.value);
        profileName.textContent = nameInput.value;
    };

    if (jobInput.value !== ""){
        console.log('description: ' + jobInput.value);
        profileDescription.textContent = jobInput.value;
    };
    // Выберите элементы, куда должны быть вставлены значения полей

    // Вставьте новые значения с помощью textContent
    formElement.classList.toggle('popup_opened')
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener ('submit', formSubmitHandler);

//let addButton = document.querySelector ('.profile__add-button');
let editButton = document.querySelector ('.profile__edit');
let submitButton = document.querySelector ('.popup__submit-button');
let closePopup = document.querySelector ('.popup__close-icon');

/*addButton.addEventListener ('click', function(){
    formElement.classList.toggle('popup_opened');
    console.log ("Нажали на добавить нового");
});
*/

editButton.addEventListener ('click', function(){
    formElement.classList.toggle('popup_opened');
    console.log ("Нажали на редактирование");
}); 

//submitButton.addEventListener ('click', formSubmitHandler);

closePopup.addEventListener ('click', function() {
    formElement.classList.toggle('popup_opened');
    console.log ("Нажали на крестик");
});
