export class Api {
  constructor(options) {
    this.link = options.baseUrl;
    this.headers = options.headers;
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _request(url, options) {
    return fetch(url, options).then(this._getResponseData);
  }

  getUserInfo() {
    return this._request(`${this.link}/users/me`, {
      method: "GET",
      headers: this.headers,
    });
  }

  getAllPictures() {
    return this._request(`${this.link}/cards`, {
      method: "GET",
      headers: this.headers,
    });
  }

  sendUserInfo(name, prof) {
    return this._request(`${this.link}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        about: prof,
      }),
    });
  }

  sendPicture(name, link) {
    return this._request(`${this.link}/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    });
  }

  sendAvatarPicture(link) {
    return this._request(`${this.link}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar: link,
      }),
    });
  }

  deleteCard(cardId) {
    return this._request(`${this.link}/cards/${cardId}`, {
      method: "DELETE",
      headers: this.headers,
    });
  }

  changeLikeCardStatus(cardId, likeStatus) {
    return this._request(`${this.link}/cards/${cardId}/likes`, {
      method: `${likeStatus ? "DELETE" : "PUT"}`,
      headers: this.headers,
    });
  }
}

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-49",
  headers: {
    authorization: "6de437f0-1a5d-4f78-bdcc-42fde5db78f6",
    "Content-Type": "application/json",
  },
});

export default api;
