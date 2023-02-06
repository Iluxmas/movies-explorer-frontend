import { MOVIE_API_URL } from './constants';

const errorMessages = {
  getAllMovies: "Error while requesting initial movies data",
};
class MoviesApi {
  constructor(url, messages) {
    this._URL = url;
    this._errorMessages = messages;
  }

  getAllMovies() {
    return fetch(`${this._URL}beatfilm-movies/`, {
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

const MoviesApiService = new MoviesApi(MOVIE_API_URL, errorMessages);

export default MoviesApiService;