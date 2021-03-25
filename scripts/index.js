const popupProfile = document.querySelector('.popup_profile');
const popupPlace = document.querySelector('.popup_place');
const formProfile = popupProfile.querySelector('.popup__form_profile_name');// Воспользуйтесь методом querySelector()
const formPlace = popupPlace.querySelector('.popup__form_place_image');
const nameInput = formProfile.querySelector('.popup__name-field_input_name');// Воспользуйтесь инструментом .querySelector()
const jobInput = formProfile.querySelector('.popup__name-field_input_description');// Воспользуйтесь инструментом .querySelector()
const profileName = document.querySelector('.profile__title'); // Имя профиля
const profileDescription = document.querySelector('.profile__description') // Описание профиля
const addButton = document.querySelector ('.profile__add-button');
const editButton = document.querySelector ('.profile__edit');
const closePopupButtons = document.querySelectorAll ('.popup__close-icon');
const closePopupButtonsArr = Array.from(closePopupButtons);
const picture = document.querySelector('.popup__image_popup_src');
const caption = document.querySelector('.popup__capture_popup_text');
const escKeyCode = 27;
const inputPlaceTitle = formPlace.querySelector('.popup__name-field_input_place-title-name');
const inputPlaceImageSrc = formPlace.querySelector('.popup__name-field_input_place-image-src');

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
const validationParameters = {
    formSelector: '.popup__form',
    inputSelector: '.popup__name-field',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_invalid',
    inputErrorClass: 'popup__name-field_type_error',
    errorClass: 'popup__form-error_type_visible'
};

const closeByOverlayClick =(evt) => {
    const activePopup = document.querySelector('.popup_opened');
    if (evt.target.classList.contains('popup_opened')) {
        closePopup(activePopup);
        activePopup.removeEventListener('click', closeByOverlayClick);
    } 
    };

function addCloseByOverlayClickListener () { 
    const activePopup = document.querySelector('.popup_opened');
    activePopup.addEventListener('click', closeByOverlayClick);
    //return activePopup;
}

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
    openPopup(newPopup);
    //console.log(picture);
    picture.src = evt.target.src;
    picture.alt = evt.target.alt;
    //console.log(caption);
    caption.textContent = evt.target.parentElement.querySelector('.elements__title').textContent;
    //console.log(caption);
    addCloseByEscListener();
    addCloseByOverlayClickListener();
    enablevalidation(validationParameters);
}

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
    const renderPlaces = initialCards.map(function(item){
        const newTask = createPlaceHtmlElementFromTemplate(item);
        addTaskListeners(newTask);
        return newTask;
    });
    placeContainer.prepend(...renderPlaces);
}

renderPlaceList ();

function addPlaceSubmit (evt) {
    evt.preventDefault();
    //const inputPlaceTitle = formPlace.querySelector('.popup__name-field_input_place-title-name');
    const placeTitle = inputPlaceTitle.value;
    //const inputPlaceImageSrc = formPlace.querySelector('.popup__name-field_input_place-image-src');
    const placeImageSrc = inputPlaceImageSrc.value;
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
    closePopup(popupPlace);
}

// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
function handleProfileSubmit (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closePopup(popupProfile);  
    //console.log("нажали сохранить");
}

function editPopup (evt) {
   // const activePopup = document.querySelector('.popup_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
    openPopup(popupProfile);
    enablevalidation(validationParameters);
}

function deletePlaceElement (evt) {
    evt.target.closest('.elements__element').remove();
    //console.log("Нажали удалить");
}

function likeButtonActive (evt) {
    evt.target.classList.toggle('elements__like_active');
    //console.log('нажали сердечко');
}

function closePopupByEsc (evt) {
    //console.log("Навесили обработчики на ESC закрытия ");
    if (evt.keyCode === escKeyCode) {
       const activePopup = document.querySelector('.popup_opened');
        closePopup(activePopup);
        //console.log ("Нажали на Esc");
        //console.log('popup ' + activePopup.classList);
    };
    document.removeEventListener ('keydown', closePopupByEsc);
}

function addCloseByEscListener() {
    document.addEventListener ('keydown', closePopupByEsc);
}

formProfile.addEventListener ('submit', handleProfileSubmit);
formPlace.addEventListener ('submit', addPlaceSubmit);

addButton.addEventListener ('click', function(){
    openPopup(popupPlace);
    enablevalidation(validationParameters);  
    //enablevalidation();
    addCloseByEscListener();
    addCloseByOverlayClickListener();
    //console.log ("Нажали на добавить нового");
});

editButton.addEventListener ('click', function(){ 
    editPopup();
    //enablevalidation(validationParameters); 
    //console.log(enablevalidation);
    addCloseByEscListener();
    addCloseByOverlayClickListener();
    //console.log("Навесили обработчики на ESC закрытия ");
    //console.log ("Нажали на редактирование");
}); 

closePopupButtonsArr.forEach(function(item){ 
    const popup = item.closest('.popup');
    item.addEventListener ('click', () => closePopup(popup));
    //console.log("Навесили обработчики на кнопку закрытия " + popup.classList);
});