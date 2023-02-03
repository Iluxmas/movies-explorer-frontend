import { SHORT_LENGTH } from './constants';

export default function searchMovies(collection, phrase, isShort) {
  const result = [];
  collection.forEach((movie) => {
    if (isShort) {
      if (
        (movie.nameRU.toLowerCase().indexOf(phrase.toLowerCase()) > -1 ||
          movie.nameEN.toLowerCase().indexOf(phrase.toLowerCase()) > -1) &&
        movie.duration <= SHORT_LENGTH
      ) {
        result.push(movie);
      }
    } else {
      if (
        movie.nameRU.toLowerCase().indexOf(phrase.toLowerCase()) > -1 ||
        movie.nameEN.toLowerCase().indexOf(phrase.toLowerCase()) > -1
      ) {
        result.push(movie);
      }
    }
  });
  return result;
}