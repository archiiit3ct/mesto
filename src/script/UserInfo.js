// Класс для работы с данными пользователя
export class UserInfo {
    constructor(form, username, job) {
        this.form = form;
        this.username = username;
        this.job = job;
    }
    // Метод, чтобы обновлять данные внутри экземпляра класса
    setUserInfo() {
        this.form.username.value = this.username.textContent;
        this.form.job.value = this.job.textContent;
    }

    // Метод, чтобы отображать эти данные на странице
    updateUserInfo() {
        this.username.textContent = this.form.username.value;
        this.job.textContent = this.form.job.value;
    }
}