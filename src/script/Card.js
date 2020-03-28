// Класс для создание карточки
export class Card {
    /* Принимает в себя название карточки и ссылку, так же добавляет удаление карточки и лайк */
    constructor(link, name) {
        this.link = link;
        this.name = name;
    }

    like(event) {
        if (event.target.classList.contains('place-card__like-icon')) {
            event.target.classList.toggle('place-card__like-icon_liked');
        }
    };

    remove(event) {
        document.querySelector('.places-list').removeChild(event.target.closest('.place-card'));
	};

    createCard(link, name, like, id, state) {
        const template =
            `<div class="place-card">
                <div class="place-card__image" style="background: url(${link})">
                    <button name="delete" class="place-card__delete-icon ${state}" id="${id}"></button>
                </div>
                <div class="place-card__description">
                    <h3 class="place-card__name">${name}</h3>
                    <div class="place-card__like">
                        <button class="place-card__like-icon"></button>
                        <p class="place-card__like-counter">${like}</p>
                    </div>
                </div>
            </div>`;
        return template;
    }
}