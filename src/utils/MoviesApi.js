const apiURL = 'https://api.nomoreparties.co/beatfilm-movies/';

const errorMessages = {
  getAllMovies: "Error while requesting initial movies data",
};

class MoviesApi {
  constructor(url, messages) {
    this._URL = url;
    this._errorMessages = messages;
  }

  getAllMovies() {
    return fetch(this._URL, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`${this._errorMessages.getAllMovies} \nStatus: ${res.status}`);
    });
  }
}

const MoviesApiService = new MoviesApi(apiURL, errorMessages);

export default MoviesApiService;