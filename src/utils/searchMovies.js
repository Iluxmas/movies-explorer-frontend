export default function searchMovies(collection, phrase, isShort) {
  const result = [];
  collection.forEach((movie) => {
    if (isShort) {
      if (
        (movie.nameRU.toLowerCase().indexOf(phrase.toLowerCase()) > -1 ||
          movie.nameEN.toLowerCase().indexOf(phrase.toLowerCase()) > -1) &&
        movie.duration <= 40
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