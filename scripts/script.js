// Находим форму в DOM

//const popup = document.querySelector ('.popup');
const popupProfile = document.querySelector('.popup_profile');
const popupPlace = document.querySelector('.popup_place');
const formElement = popupProfile.querySelector('.popup__form_profile_name');// Воспользуйтесь методом querySelector()
const formPlace = popupPlace.querySelector('.popup__form_place_image');
// Находим поля формы в DOM
const nameInput = formElement.querySelector('.popup__name-field_input_name');// Воспользуйтесь инструментом .querySelector()
const jobInput = formElement.querySelector('.popup__name-field_input_description');// Воспользуйтесь инструментом .querySelector()
const profileName = document.querySelector('.profile__title'); // Имя профиля
const profileDescription = document.querySelector('.profile__description') // Описание профиля
const addButton = document.querySelector ('.profile__add-button');
const editButton = document.querySelector ('.profile__edit');
const closePopupButtons = document.querySelectorAll ('.popup__close-icon');
const closePopupButtonsArr = Array.from(closePopupButtons);
//let placeTitle = formPlace.querySelector('.popup__name-field_input_place-title-name');
//let placeImageSrc = formPlace.querySelector('.popup__name-field_input_place-image-src');
//let closeButtonPopupImage = document.querySelector('.popup__close-icon_popup_image');
let picture = document.querySelector('.popup__image_popup_src');
let caption = document.querySelector('.popup__capture_popup_text');

const initialCards = [
    {
      name: 'Архыз',
      link: './images/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: './images/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: './images/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: './images/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: './images/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: './images/baikal.jpg'
    }
];

const placeContainer = document.querySelector('.elements');
const placeContainerTemplate = placeContainer.querySelector('.template');
const newPopup = document.querySelector('.popup_image');


function addTaskListeners(task){
    const deleteButton = task.querySelector('.elements__trash');
    deleteButton.addEventListener('click', deletePlaceElement);
    const likeButton = task.querySelector('.elements__like');
    likeButton.addEventListener('click', likeButtonActive);
    const showPopupImage = task.querySelector('.elements__image');
    showPopupImage.addEventListener('click', openPopupImage);
} 

function openPopup(popup) {
    popup.classList.add('popup_opened'); //добавляем к popup класс popup_opened
    popup.classList.remove('popup_closed');
    //console.log('Открыли попап ' + popup.classList);
}

function closePopup(popup) {
    popup.classList.remove('popup_opened'); //удаляем у popup класс popup_opened
    popup.classList.add('popup_closed');
    //console.log('Закрыли попап ' + popup.classList); 
}

function openPopupImage (evt) {
    ////newPopup.classList.add('popup_opened');
    ////newPopup.classList.remove('popup_closed');
    openPopup(newPopup);
    ////closeButtonPopupImage.addEventListener('click', function(){
        ////newPopup.classList.remove('popup_opened');
        ////newPopup.classList.add('popup_closed');
    ////});
    //console.log(picture);
    picture.src = evt.target.src;
    picture.alt = evt.target.alt;
    //console.log(caption);
    caption.textContent = evt.target.parentElement.querySelector('.elements__title').textContent;
    //console.log(caption);
}

/*closeButtonPopupImage.addEventListener('click', function(){
    //console.log('closed');
    closePopup(newPopup);
});
*/

function createPlaceHtmlElementFromTemplate (item) {
    const newItem = placeContainerTemplate.content.cloneNode(true);
    const placeTitle = newItem.querySelector('.elements__title');
    const placeImageSrc = newItem.querySelector('.elements__image');
    placeTitle.textContent = item.name;
    placeImageSrc.src = item.link;
    placeImageSrc.alt = item.name;
    return newItem;    
}

function renderPlaceList () {
    //const renderPlace = initialCards.map(createPlaceHtmlElement).join('');
    const renderPlaces = initialCards.map(function(item){
        const newTask = createPlaceHtmlElementFromTemplate(item);
        addTaskListeners(newTask);
        return newTask;
    });
    //placeContainer.insertAdjacentHTML('afterbegin', renderPlace);
    placeContainer.prepend(...renderPlaces);
}

renderPlaceList ();

function addPlaceSubmit (evt) {
    evt.preventDefault();
    const inputPlaceTitle = formPlace.querySelector('.popup__name-field_input_place-title-name');
    const placeTitle = inputPlaceTitle.value;
    const inputPlaceImageSrc = formPlace.querySelector('.popup__name-field_input_place-image-src');
    const placeImageSrc = inputPlaceImageSrc.value;
    //const newPlace = createPlaceHtmlElement({name: placeTitle, link: placeImageSrc});
    //placeContainer.insertAdjacentHTML('afterbegin', newPlace);
    const newPlace = createPlaceHtmlElementFromTemplate ({name: placeTitle, link: placeImageSrc});
    
    addTaskListeners(newPlace);
    
    placeContainer.prepend(newPlace);
    /*console.log(inputPlaceTitle);
    console.log(placeTitle);
    console.log(placeImageSrc);
    console.log(newPlace);
    console.log("save");
    */
    inputPlaceTitle.value = '';
    inputPlaceImageSrc.value = '';
    
    //formPlace.classList.remove('popup__form_opened');
    ////popupPlace.classList.remove('popup_opened');
    ////popupPlace.classList.add('popup_closed');
    closePopup(popupPlace);
    //popup.classList.remove('popup_opened');
    //popupProfile.classList.remove('popup_opened'); 
}

// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
function handleProfileSubmit (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

   
    // Получите значение полей jobInput и nameInput из свойства value     
    // Выберите элементы, куда должны быть вставлены значения полей
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    // Вставьте новые значения с помощью textContent
    
    //popup.classList.remove('popup_opened');
    //popup.classList.add('popup_closed');
    ////popupProfile.classList.remove('popup_opened');
    ////popupProfile.classList.add('popup_closed');
    closePopup(popupProfile);
    ////popupPlace.classList.remove('popup_opened');
    ////popupPlace.classList.add('popup_closed');
    
    // Закрытие формы
    //formElement.classList.remove('popup__form_opened');  
    //console.log("нажали сохранить");
}

function editPopup (evt) {
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
    //popup.classList.add('popup_opened');
    //popup.classList.remove('popup_closed');
    ////popupProfile.classList.add('popup_opened');
    ////popupProfile.classList.remove('popup_closed');
    openPopup(popupProfile);
    //formElement.classList.add('popup__form_opened');
    //formElement.classList.remove('popup_closed');
    //formElement.classList.remove('popup__form_closed');
}

////function closePopupFunction (evt) {
    ////evt.preventDefault();

    //popup.classList.remove('popup_opened');
    //popup.classList.add('popup_closed');
    ////popupProfile.classList.remove('popup_opened');
    ////popupProfile.classList.add('popup_closed');
    //document.querySelector('popup-image').classList.remove('popup_opened');
    /*formElement.classList.remove('popup__form_opened');
    formElement.classList.add('popup__form_closed');
    formElement.classList.add('popup_closed');
    */
    /*formPlace.classList.remove('popup__form_opened');
    formPlace.classList.add('popup_closed');
    formPlace.classList.add('popup__form_closed');
    */
    ////popupPlace.classList.remove('popup_opened');
    ////popupPlace.classList.add('popup_closed');
    
    ////closePopup(popupProfile);
    ////closePopup(popupPlace);
////}

function deletePlaceElement (evt) {
    evt.target.closest('.elements__element').remove();
    //console.log("Нажали удалить");
}

function likeButtonActive (evt) {
    evt.target.classList.toggle('elements__like_active');
    //console.log('нажали сердечко');
}

formElement.addEventListener ('submit', handleProfileSubmit);
formPlace.addEventListener ('submit', addPlaceSubmit);



addButton.addEventListener ('click', function(){
    /*popup.classList.add('popup_opened');
    popup.classList.remove('popup_closed');
    formPlace.classList.add('popup__form_opened');
    formPlace.classList.remove('popup_closed');
    formPlace.classList.remove('popup__form_closed')
    */
    ////popupPlace.classList.add('popup_opened');
    ////popupPlace.classList.remove('popup_closed');
    openPopup(popupPlace);
    //console.log ("Нажали на добавить нового");
});


editButton.addEventListener ('click', editPopup)
    //{formElement.classList.toggle('popup_opened');
    // console.log ("Нажали на редактирование");}
; 

closePopupButtonsArr.map(function(item){
    ////item.addEventListener ('click', closePopupFunction);
    const popup = item.closest('.popup');
    item.addEventListener ('click', () => closePopup(popup));
    //console.log("Навесили обработчики на кнопку закрытия " + popup.classList);
    ////return item;
}) 
    //{formElement.classList.toggle('popup_opened');
    //console.log ("Нажали на крестик");}
;