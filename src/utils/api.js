class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    // Método para obtener la información del usuario
    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "GET",
            headers: this._headers
        })
            .then(res => this._checkResponse(res))
    }

    // Método para actualizar la información del usuario
    updateUserInfo(data) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
            .then(res => this._checkResponse(res))
    }

    // Método para obtener las tarjetas iniciales
    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            method: "GET",
            headers: this._headers
        })
            .then(res => this._checkResponse(res))
    }

    // Método para agregar una nueva tarjeta
    addCard(data) {
        return fetch(`${this._baseUrl}/cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
            .then(res => this._checkResponse(res))
    }

    // Método para eliminar una tarjeta
    deleteCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: "DELETE",
            headers: this._headers
        })
            .then(res => this._checkResponse(res))
    }

    // Método para actualizar el avatar del usuario
    updateAvatar(avatarUrl) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                avatar: avatarUrl
            })
        })
            .then(res => this._checkResponse(res))
    }


    // Método para añadir like

    addLike(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: this._headers
        })
            .then(this._checkResponse)
    }

    // Método para eliminar like

    removeLike(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(this._checkResponse)
    }

    changeLikeCardStatus(cardId, like) {
        if (like) {
          return this.addLike(cardId);
        } else {
          return this.removeLike(cardId);
        }
      }

    // Método para verificar si la respuesta de la API es correcta
    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
    }
}

const api = new Api({
    baseUrl: "https://around-api.es.tripleten-services.com/v1",
    headers: {
      authorization: "bd8dd71c-87eb-41f7-8ccc-1cf34e0e8abd",
      "Content-Type": "application/json"
    }
  });
  

  export default api;