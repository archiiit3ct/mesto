class Api {
    constructor(baseUrl, token) {
        this.baseUrl = baseUrl;
        this.token = token;
    }

    async userData() {
        try {
            const res = await fetch(`${this.baseUrl}users/me`, {
                method: 'GET',
                headers: {
                    authorization: this.token
                }
            });
                if (!res.ok) return;
                const data = await res.json();
                return data;
            } catch (error) {
                throw new Error(`Ошибка при запросе к серверу`);
            }
    }

    async getInitCards() {
        try {
            const res = await fetch(`${this.baseUrl}cards`, {
                method: 'GET',
                headers: {
                    authorization: this.token
                }
            });
            if (!res.ok) return;
            const data = await res.json();
            return data;
        } catch (error) {
            throw new Error(`Ошибка при запросе к серверу`);
        }
    }

    async editProfile(editName, editAbout) {
        try {
            const res = await fetch(`${this.baseUrl}users/me`, {
                method: 'PATCH',
                headers: {
                    authorization: this.token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: editName,
                    about: editAbout
                })
            });
            if (!res.ok) return;
            const data = await res.json();
            return data;
        } catch (error) {
            throw new Error(`Ошибка при запросе к серверу`);
        }
    }

    async addCard(newName, newLink) {
        try {
            const res = await fetch(`${this.baseUrl}cards`, {
                method: 'POST',
                headers: {
                    authorization: this.token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: newName,
                    link: newLink
                })
            });
            if (!res.ok) return;
            const data = await res.json();
            return data;
        } catch (error) {
            throw new Error(`Ошибка при запросе к серверу`);
        }
    }

    async deleteCard(id) {
        try {
            const res = await fetch(`${this.baseUrl}cards/${id}`, {
                method: 'DELETE',
                headers: {
                    authorization: this.token
                }
            });
            if (!res.ok) return Promise.reject();
            const data = await res.json();
            return data;
        } catch {
            throw new Error(`Ошибка при запросе к серверу`);
        }
    }
}
