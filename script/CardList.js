// Класс для хранения и отрисовки карточек
class CardList {
    /* Метод constructor этого класса должен принимать два аргумента:
        DOM-элемент — контейнер, куда нужно складывать карточки
        Массив карточек, которые будут на странице при загрузке */
    constructor(container, card, addForm) {
        this.container = container;
        this.card = card;
        this.addForm = addForm;
    }

    // Для добавления карточки в список, принимает на вход экземпляр карточки
    addCard(name, link, like, id, state) {
        const createNewCardFromUser = this.card.createCard(link, name, like, id, state);
        this.container.insertAdjacentHTML('afterbegin', createNewCardFromUser);
    };

    // Для отрисовки карточек при загрузке страницы
    render(data) {
        for(let i = data.length - 1; i >= 0; i--) {
            if (data[i].owner.name === document.querySelector('.user-info__name').textContent) {
                const template = this.card.createCard(data[i].link, data[i].name, data[i].likes.length, data[i]._id, "button__active");
                this.container.insertAdjacentHTML('beforeend', template);
            } else {
                const template = this.card.createCard(data[i].link, data[i].name, data[i].likes.length, data[i]._id, "");
                this.container.insertAdjacentHTML('beforeend', template);
            }
        }
    }
}