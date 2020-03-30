// Класс для валидации полей формы
export class FormValidator {
	/*  Конструктор принимает элемент попапа, внутри которого находится эта форма. */
	constructor(popup) {
		this.popup = popup;
	}

	// Метод чтобы валидировать поля. Метод показывает ошибку, если инпуты не проходят валидацию. Если проходят — скрывает ошибку.
	checkInputValidity(input, errorMsg) {
		if (input.value.length === 0) errorMsg.textContent = 'Это обязательное поле';
		else if (input.getAttribute('type') === 'url' && !input.validity.valid) errorMsg.textContent = 'Здесь должна быть ссылка';
		else if (!input.validity.valid) errorMsg.textContent = 'Должно быть от 2 до 30 символов';
		else errorMsg.textContent = '';
	}

	// Метод, чтобы делать кнопку сабмита активной и неактивной
	setSubmitButtonState(form, button) {
		if (form.checkValidity()) {
			button.removeAttribute('disabled');
			button.classList.add('popup__button_change-color');
		} else {
			button.setAttribute('disabled', '');
			button.classList.remove('popup__button_change-color');
		}
	}

	// Метод, чтобы добавлять обработчики
	setEventListeners() {
		const form = this.popup.querySelector('.popup__form');
		const button = form.querySelector('.popup__button');
		
		function checkValidity(event) {
			FormValidator.prototype.checkInputValidity(event.target, event.target.closest('div').querySelector(`.popup__input-error`));
			FormValidator.prototype.setSubmitButtonState(form, button);
		}
		form.addEventListener('input', checkValidity);
		this.setSubmitButtonState(form, button);
	}
}