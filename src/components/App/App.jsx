import React, { useState, useEffect } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';

import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Movies from '../Movies/Movies';
import MainApiService from '../../utils/MainApi';
import MoviesApiService from '../../utils/MoviesApi';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import SavedMovies from '../SavedMovies/SavedMovies';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './App.css';

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLogged, setIsLogged] = useState(false);

  const [savedMovies, setSavedMovies] = useState(null);
  const [searchResult, setSearhResult] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const token = localStorage.getItem('jwt');

  useEffect(() => {
    tokenCheck();
  }, []);

  useEffect(() => {
    if (isLogged) {
      const token = localStorage.getItem('jwt');
      MainApiService.getMyMovies(token)
        .then((data) => {
          setSavedMovies(data);
          localStorage.setItem('myMovies', JSON.stringify(data));
        })
        .catch();
    }
  }, [isLogged]);

  useEffect(() => {
    if (isLogged) {
      const searchRes = JSON.parse(localStorage.getItem('searchResult'));

      if (searchRes) {
        setSearhResult(searchRes);
      }
    }
  }, [isLogged]);

  function tokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      MainApiService.validate(jwt)
        .then((data) => {
          if (data) {
            setCurrentUser(data);
            setIsLogged(true);
            history.push('/');
            return data;
          } else return;
        })
        .catch((err) => console.log('Error: ', err));
    }
  }

  function handleLogin(email, password) {
    MainApiService.authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          setCurrentUser(data);
          setIsLogged(true);
          history.push('/movies');
        }
      })
      .catch((err) => console.log('Error: ', err));
  }

  function handleLogout() {
    localStorage.clear();
    setIsLogged(false);
    setCurrentUser(null);
    history.push('/');
  }

  function handleDislike(movie) {
    MainApiService.deleteMovieLike(movie._id, token)
      .then(() => {
        const updatedMyMovies = savedMovies.filter((item) => item._id !== movie._id);

        setSavedMovies(updatedMyMovies);
        localStorage.setItem('myMovies', JSON.stringify(updatedMyMovies));
      })
      .catch();
  }

  function handleLike(movie) {
    if (savedMovies.some((item) => item._id === movie._id)) {
      handleDislike(movie);
    } else {
      // const myMovies = JSON.parse(localStorage.getItem('myMovies'));

      const { country, director, duration, year, description, image, trailerLink, nameRU, nameEN, id } = movie;
      const newMovie = {
        country,
        director,
        duration,
        year,
        description,
        image: `https://api.nomoreparties.co/${image.url}`,
        trailerLink,
        nameRU,
        nameEN,
        thumbnail: `https://api.nomoreparties.co/${image.formats.thumbnail.url}`,
        movieId: id,
      };
      MainApiService.postMovieLike(newMovie, token)
        .then((data) => {
          const updatedMyMovies = [...savedMovies, data];
          setSavedMovies(updatedMyMovies);
          localStorage.setItem('myMovies', JSON.stringify(updatedMyMovies));
        })
        .catch();
    }
  }

  function handleRegister(name, email, password) {
    MainApiService.register(name, email, password)
      .then((data) => {
        setCurrentUser(data);
        setIsLogged(true);
        history.push('/movies');
        // setIsRegisterSuccess(true);
      })
      .catch((err) => {
        // setIsRegisterSuccess(false);
        console.log('Error: ', err);
      })
      .finally(() => {
        // setIsInfoTooltipOpen(true);
      });
  }

  function handleUpdateUser(newData) {
    MainApiService.patchProfileData(newData, token)
      .then((data) => {
        setCurrentUser(data);
        // closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleSearch(phrase, isShort) {
    setSearhResult(null);
    setIsLoading(true);

    if (!localStorage.allMovies) {
      MoviesApiService.getAllMovies()
        .then((data) => {
          localStorage.setItem('allMovies', JSON.stringify(data));
          // setAllmovies(data);

          const searchRes = searchMovies(data, phrase, isShort);
          localStorage.setItem('searchResult', JSON.stringify(searchRes));
          setSearhResult(searchRes);
        })
        .catch()
        .finally(() => setIsLoading(false));
    } else {
      const collection = JSON.parse(localStorage.getItem('allMovies'));
      const searchRes = searchMovies(collection, phrase, isShort);

      localStorage.setItem('searchResult', JSON.stringify(searchRes));
      setIsLoading(false);
      setSearhResult(searchRes);
    }
  }

  function searchMovies(collection, phrase, isShort) {
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

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Switch>
          <Route path='/sign-in'>
            <Login onLogin={handleLogin} />
          </Route>
          <Route path='/sign-up'>
            <Register onSignup={handleRegister} />
          </Route>
          <ProtectedRoute path='/movies' isLogged={isLogged}>
            <Header isLogged={isLogged} />
            <Movies savedMovies={savedMovies} onLike={handleLike} onSearch={handleSearch} searchResult={searchResult} />
            <Footer />
          </ProtectedRoute>
          <ProtectedRoute path='/saved-movies' isLogged={isLogged}>
            <Header isLogged={isLogged} />
            <SavedMovies
              savedMovies={savedMovies}
              onDislike={handleDislike}
              onSearch={handleSearch}
              searchResult={searchResult}
            />
            <Footer />
          </ProtectedRoute>
          <ProtectedRoute path='/profile' isLogged={isLogged}>
            <Header isLogged={isLogged} />
            <Profile onSubmit={handleUpdateUser} onLogout={handleLogout} />
          </ProtectedRoute>
          <Route exact path='/'>
            <Header isLogged={isLogged} />
            <Main />
            <Footer />
          </Route>
          <Route path='*'>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </CurrentUserContext.Provider>
  );
}
