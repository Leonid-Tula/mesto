// Находим форму в DOM

let popup = document.querySelector ('.popup');
let formElement = popup.querySelector('.popup__form');// Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
let nameInput = formElement.querySelector('.popup__name-field_input_name');// Воспользуйтесь инструментом .querySelector()
let jobInput = formElement.querySelector('.popup__name-field_input_description');// Воспользуйтесь инструментом .querySelector()
let profileName = document.querySelector('.profile__title'); // Имя профиля
let profileDescription = document.querySelector('.profile__description') // Описание профиля
//let addButton = document.querySelector ('.profile__add-button');
let editButton = document.querySelector ('.profile__edit');
let closePopup = document.querySelector ('.popup__close-icon');

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

   
                                                // Получите значение полей jobInput и nameInput из свойства value
    
     
    // Выберите элементы, куда должны быть вставлены значения полей
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    // Вставьте новые значения с помощью textContent
    popup.classList.toggle('popup_opened')
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener ('submit', formSubmitHandler);

function openPopup (evt) {
    evt.preventDefault();
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
    popup.classList.add('popup_opened')
}
/*addButton.addEventListener ('click', function(){
    formElement.classList.toggle('popup_opened');
    console.log ("Нажали на добавить нового");
});
*/

editButton.addEventListener ('click', openPopup)
    //{formElement.classList.toggle('popup_opened');
    // console.log ("Нажали на редактирование");}
; 

function closePopupFunction (evt) {
    evt.preventDefault();
    popup.classList.remove('popup_opened')
}

closePopup.addEventListener ('click', closePopupFunction) 
    //{formElement.classList.toggle('popup_opened');
    //console.log ("Нажали на крестик");}
;
