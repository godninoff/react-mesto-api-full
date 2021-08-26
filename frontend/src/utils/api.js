class Api {
    constructor({address, headers}) {
        this._address = address;
        this._headers = headers;
    }

    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`); 
        }
        return res.json();
      }

getUserInfo() {
    return fetch(`${this._address}/users/me`, {
        method: 'GET',
        headers: this._headers
    })
    .then(res => this._getResponseData(res))
}

getInitialCards() {
    return fetch(`${this._address}/cards`, {
        method: 'GET',
        headers: this._headers
    })
    .then(res => this._getResponseData(res))
}

setUserInfo(name, about) {
    return fetch(`${this._address}/users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
            name: name,
            about: about
        })
    })
    .then(res => this._getResponseData(res))
}

createCard(name, link) {
    return fetch(`${this._address}/cards`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
            name: name,
            link: link
        })
    })
    .then(res => this._getResponseData(res))
}

removeCard(id) {
    return fetch(`${this._address}/cards/${id}`, {
        method: 'DELETE',
        headers: this._headers,
    })
    .then(res => this._getResponseData(res))
}

changeLikeCardStatus(id, isLiked) {
    return fetch(`${this._address}/cards/likes/${id}`, {
        method: isLiked ? 'PUT' : 'DELETE',
        headers: this._headers,
    })
    .then(res => this._getResponseData(res))
}

setUserAvatar(avatarData) {
    return fetch(`${this._address}/users/me/avatar`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
            avatar: avatarData.avatar
        })
    })
    .then(res => this._getResponseData(res))
}
};

const api = new Api ({
    address: 'https://mesto.nomoreparties.co/v1/cohort-24',
    headers: {
    authorization: '680bd78d-11d7-4092-977f-23afe781bd9e',
    'Content-Type': 'application/json'
    },
  });
  

export default api;
