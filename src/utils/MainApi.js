// const apiURL = 'kino.nomoredomains.club/api';
const apiURL = 'http://localhost:3000/api';


const errorMessages = {
  profileLoad: "Данные не грузятся... Сервер спит... А бэкендеры уже нет",
  inititalCards: "Данные не грузятся... Сервер спит... А бэкендеры уже нет",
  deleteCard:
    "Возникла проблема с удалением карточки, обновите страницу и повторите запрос",
  postCard: "Возникла проблема с добавлением фотографии",
  avatarUpdate:
    "Возникла проблема с обновлением картинки профиля, обновите страницу и повторите запрос",
  profileUpdate: "Не получилось обновить данные профиля...",
  toggleLike: "Возникла проблема с проставкой лайка",
  register: "Ошибка регистрации",
  authorize: "Ошибка авторизации",
  validate: "Токен не передан или передан не в том формате",
};

class MainApi {
  constructor(url, messages) {
    this._URLBase = url;
    this._errorMessages = messages;
  }

  _checkResponse(request, errText) {
    return request.then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`${errText} \nStatus: ${res.status}`);
    });
  }

  getMyMovies(token) {
    const newProm = fetch(`${this._URLBase}/movies`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return this._checkResponse(newProm, this._errorMessages.getSavedMovies);
  }
  patchProfileData(data, token) {
    const newProm = fetch(`${this._URLBase}/users/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return this._checkResponse(newProm, this._errorMessages.patchProfileData);
  }

  postMovieLike(data, token) {
    const newProm = fetch(`${this._URLBase}/movies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...data }),
    });

    return this._checkResponse(newProm, this._errorMessages.postMovieLike);
  }

  deleteMovieLike(movieId, token) {
    const newProm = fetch(`${this._URLBase}/movies/${movieId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });

    return this._checkResponse(newProm, this._errorMessages.deleteMovieLike);

  }

  register(name, email, password) {
    const newProm = fetch(`${this._URLBase}/signup`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password }),
    });

    return this._checkResponse(newProm, this._errorMessages.register);
  }

  authorize(email, password) {
    const newProm = fetch(`${this._URLBase}/signin`, {
      method: "POST",
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ password, email }),
    });

    return this._checkResponse(newProm, this._errorMessages.authorize);
  }

  validate(token) {
    const newProm = fetch(`${this._URLBase}/users/me`, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return this._checkResponse(newProm, this._errorMessages.validate);
  }
}

const MainApiService = new MainApi(apiURL, errorMessages);

export default MainApiService;