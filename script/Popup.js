// Класс для всплывающего окна
class Popup {
    constructor(popup) {
        this.popup = popup;
    }
    open() {
        this.popup.classList.add('popup_is-opened');
        if (this.popup.classList.contains('popup-edit')) {
            this.popup.querySelector('.error-name').textContent = '';
            this.popup.querySelector('.error-job').textContent = '';
        }

        if (this.popup.classList.contains('popup-add')) {
            this.popup.querySelector('.error-name').textContent = '';
            this.popup.querySelector('.error-link').textContent = '';
        }
    }
    close() {
        this.popup.classList.remove('popup_is-opened');
    }
    openImage(event) {
        const image = document.createElement('img');
        const imageSrc = event.target.style.backgroundImage.slice(5, -2); //убираем url и ковычки из ссылки
        image.setAttribute('src', imageSrc);
        image.classList.add('popup-image');
        const wrapper = document.querySelector('.popup-bigpic__content');
        wrapper.append(image);
    };
    closeImage() {
        this.popup.classList.remove('popup_is-opened');
        const image = document.querySelector('.popup-image');
        image.remove();
    }
}