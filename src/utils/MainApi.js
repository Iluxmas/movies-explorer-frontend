// const apiURL = 'kino.nomoredomains.club/api';
const apiURL = 'http://localhost:3000/api';


const errorMessages = {
  getSavedMovies: "Проблема с загрузкой сохраненных фильмов",
  profileUpdate: "Не получилось обновить данные профиля...",
  likeMovie: "Возникла проблема с добавлением в сохраненные",
  dislikeMovie: "Возникла проблема с удалением из сохраненных",
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
    return this._checkResponse(newProm, this._errorMessages.profileUpdate);
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

    return this._checkResponse(newProm, this._errorMessages.likeMovie);
  }

  deleteMovieLike(movieId, token) {
    const newProm = fetch(`${this._URLBase}/movies/${movieId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });

    return this._checkResponse(newProm, this._errorMessages.dislikeMovie);

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