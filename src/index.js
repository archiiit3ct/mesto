import "./style.css";
import {Api} from './script/Api.js';
import {CardList} from './script/CardList.js';
import {Card} from './script/Card.js';
import {FormValidator} from './script/FormValidator.js';
import {Popup} from './script/Popup.js';
import {UserInfo} from './script/UserInfo.js';

(function () {

/* Переменные */
const form = document.forms.new; // Форма добавления новой карточки
const formEdit = document.forms.edit; // Форма редактирования профиля
const popup = document.querySelector('.popup');
const placesList = document.querySelector('.places-list');

const card = new Card();
const cardList = new CardList(placesList, card, form);
const formValidatorAdd = new FormValidator(document.querySelector('.popup'));
const formValidatorEdit = new FormValidator(document.querySelector('.popup-edit'));
const popupAddCard = new Popup(document.querySelector('.popup'));
const popupEditProfile = new Popup(document.querySelector('.popup-edit'));
const userInfo = new UserInfo(formEdit, document.querySelector('.user-info__name'), document.querySelector('.user-info__job'));
const popUpImage = new Popup(document.querySelector('.popup-bigpic'));

const baseUrl = process.env.NODE_ENV === 'development' ? 'http://praktikum.tk/cohort8/' : 'https://praktikum.tk/cohort8/';
const token = '226384b6-e4f9-420c-aeac-b659b74a1b4c'; // Токен

// Удаления карточки
document.querySelector('.places-list').addEventListener("click", function(event) {
    if (event.target.closest('.place-card__delete-icon')) {
        const res = window.confirm('Вы действительно хотите удалить эту карточку?')
        if(!res) return;
        api.deleteCard(event.target.id)
            .then((data) => {
                console.log(data);
                alert(data.message);
                card.remove(event);
            })
            .catch((err) => {
                console.error(err);
                alert('Не удалось удалить пост');
            })
    }
});


// Вызов функции Like
document.querySelector('.places-list').addEventListener("click", card.like);


//Функция добавления карточки из формы ввода
document.forms.new.addEventListener('submit', function (event) {
    event.preventDefault();
    api.addCard(form.elements.name.value, form.elements.link.value).then((data) => {
        cardList.addCard(data.name, data.link, data.likes.length, data._id, "button__active");
        popup.classList.remove('popup_is-opened');
    }).catch(err => console.error('Error: ', err));
    event.target.reset()
});

// Открываем и закрываем попап добавления карточки
document.querySelector('.user-info__button').addEventListener('click', () => {
    popupAddCard.open();
    formValidatorAdd.setEventListeners();
});
document.querySelector('.popup__close').addEventListener('click', () => {
    popupAddCard.close();
    form.reset();
});

// Открываем и закрываем попап изменения данных
document.querySelector('.popup-edit__info-button').addEventListener('click', () => {
    popupEditProfile.open();
    userInfo.setUserInfo();
    formValidatorEdit.setEventListeners();

});

// Закрываем форму редактирования данных
document.querySelector('.popup-edit__close').addEventListener('click', popupEditProfile.close.bind(popupEditProfile));

// Слушатель для изменения данных профиля
document.querySelector('.popup-edit__form').addEventListener('submit', (event) => {
    event.preventDefault();
    const jobValue = event.target.querySelector('#jobInput').value;
    const nameValue = event.target.querySelector('#nameInput').value;
    api.editProfile(nameValue, jobValue).then((data) => {
        userInfo.updateUserInfo(data.name, data.about);
        popupEditProfile.close(popupEditProfile);
    }).catch(err => console.error('Error: ', err));
});

// Увеличиваем картинку по клику на карточку
document.querySelector('.places-list').addEventListener("click", (event) => {
    if (event.target.classList.contains('place-card__image')) {
        popUpImage.open();
        popUpImage.openImage(event);
    }
});

// Закрываем увеличенную  картинку по клику на крестик
document.querySelector('.popup__close_big-pic').addEventListener("click", () => {
    popUpImage.closeImage();
}
);

const userName = document.querySelector('.user-info__name');
const userAbout = document.querySelector('.user-info__job');
const userAvatar = document.querySelector('.user-info__photo');

const api = new Api(baseUrl, token); // Объявляем класс Api

// Загрузка информации о пользователе с сервера
api.userData().then((data) => {
    userName.textContent = data.name;
    userAbout.textContent = data.about;
    userAvatar.style.backgroundImage = `url('${data.avatar}')`;
}).catch(err => console.error(err));

// Загрузка первоначальных карточек с сервера
api.getInitCards().then((data) => {
    cardList.render(data);
}).catch(err => console.error('Error: ', err));

})();