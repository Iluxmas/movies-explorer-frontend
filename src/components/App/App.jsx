import React, { useState, useEffect } from 'react';
import { Redirect, Route, Switch, useHistory, useParams } from 'react-router-dom';

import Main from '../Main/Main';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Movies from '../Movies/Movies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import NotFound from '../NotFound/NotFound';
import MainApiService from '../../utils/MainApi';
import searchMovies from '../../utils/searchMovies';
import MoviesApiService from '../../utils/MoviesApi';
import SavedMovies from '../SavedMovies/SavedMovies';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import { STATUSCODES } from '../../utils/statusCodes';
import { POPUP_MESSAGES } from '../../utils/constants';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import './App.css';

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLogged, setIsLogged] = useState(false);

  const [savedMovies, setSavedMovies] = useState(null);
  const [searchResult, setSearchResult] = useState(null);

  const [cardsLayout, setCardsLayout] = useState({ base: null, add: null });

  const [isShowMoreHidden, setIsShowMoreHidden] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  const history = useHistory();
  const token = localStorage.getItem('jwt');
  const path = useParams();

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      MainApiService.validate(jwt)
        .then((data) => {
          if (data) {
            setCurrentUser(data);
            setIsLogged(true);
            history.push(path);
            return data;
          } else return;
        })
        .catch((err) => {
          setPopupMessage(POPUP_MESSAGES.VALIDATION);
          setIsPopupOpen(true);
        });
    }
  }, []);

  useEffect(() => {
    if (isLogged) {
      const token = localStorage.getItem('jwt');
      MainApiService.getMyMovies(token)
        .then((data) => {
          setSavedMovies(data);
          localStorage.setItem('myMovies', JSON.stringify(data));
        })
        .catch(() => {
          setPopupMessage(POPUP_MESSAGES.ERROR_DEFAULT);
          setIsPopupOpen(true);
        });
    }
  }, [isLogged]);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 720 && cardsLayout.base !== 5) setCardsLayout((prev) => ({ ...prev, base: 5, add: 5 }));
      else if (window.innerWidth < 1024 && cardsLayout.base !== 8)
        setCardsLayout((prev) => ({ ...prev, base: 8, add: 2 }));
      else if (window.innerWidth >= 1024 && cardsLayout.base !== 12)
        setCardsLayout((prev) => ({ ...prev, base: 12, add: 3 }));
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isLogged) {
      const searchRes = JSON.parse(localStorage.getItem('searchResult'));

      if (searchRes) {
        setSearchResult(searchRes);
      }
    }
  }, [isLogged]);

  useEffect(() => {
    const search = localStorage.getItem('search');
    const isShort = localStorage.getItem('isShort') === 'true';

    if (search) handleSearch(search, isShort);
  }, [cardsLayout]);

  function handleRegister(name, email, password) {
    setIsLoading(true);
    MainApiService.register(name, email, password)
      .then((data) => {
        setCurrentUser(data);
        handleLogin(email, password);
        setPopupMessage(POPUP_MESSAGES.REG_SUCC);
      })
      .catch((err) => {
        console.log();
        if (err.includes(STATUSCODES.CONFLICT)) {
          setPopupMessage(POPUP_MESSAGES.CONFLICT);
        } else if (err.includes(STATUSCODES.BAD_REQUEST)) {
          setPopupMessage(POPUP_MESSAGES.BAD_REQUEST);
        } else {
          setPopupMessage(POPUP_MESSAGES.ERROR_DEFAULT);
        }
      })
      .finally(() => {
        setIsPopupOpen(true);
        setIsLoading(false);
      });
  }

  function handleLogin(email, password) {
    setIsLoading(true);
    MainApiService.authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          setCurrentUser(data);
          setIsLogged(true);
          history.push('/movies');
        }
      })
      .catch((err) => {
        if (err.includes(STATUSCODES.AUTH_ERROR)) {
          setPopupMessage(POPUP_MESSAGES.AUTH_ERR);
        } else {
          setPopupMessage(POPUP_MESSAGES.ERROR_DEFAULT);
        }
        setIsPopupOpen(true);
      })
      .finally(() => setIsLoading(false));
  }

  function handleLogout() {
    localStorage.clear();
    setIsLogged(false);
    setCurrentUser(null);
    history.push('/');
  }

  function handleOnMount() {
    if (!localStorage.myMovies) {
      const token = localStorage.getItem('jwt');

      if (token) {
        MainApiService.getMyMovies(token)
          .then((data) => localStorage.setItem('myMovies', JSON.stringify(data)))
          .catch(() => {
            setPopupMessage(POPUP_MESSAGES.ERROR_DEFAULT);
            setIsPopupOpen(true);
          });
      }
    }
  }

  function handleDislike(movie) {
    MainApiService.deleteMovieLike(movie._id, token)
      .then(() => {
        const updatedMyMovies = savedMovies.filter((item) => item._id !== movie._id);

        setSavedMovies(updatedMyMovies);
        localStorage.setItem('myMovies', JSON.stringify(updatedMyMovies));
      })
      .catch((err) => {
        if (err.includes(STATUSCODES.NOT_FOUND)) {
          setPopupMessage(POPUP_MESSAGES.NOT_FOUND);
        } else {
          setPopupMessage(POPUP_MESSAGES.ERROR_DEFAULT);
        }
        setIsPopupOpen(true);
      });
  }

  function handleLike(movie) {
    const savedMovie = savedMovies.find((item) => item.movieId === movie.id);

    if (savedMovie) {
      handleDislike(savedMovie);
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
        .catch(() => {
          if (err.includes(STATUSCODES.BAD_REQUEST)) {
            setPopupMessage(POPUP_MESSAGES.BAD_REQUEST);
          } else {
            setPopupMessage(POPUP_MESSAGES.ERROR_DEFAULT);
          }
          setIsPopupOpen(true);
        });
    }
  }

  function handleUpdateUser(newData) {
    setIsLoading(true);
    MainApiService.patchProfileData(newData, token)
      .then((data) => {
        setCurrentUser(data);
        setPopupMessage(POPUP_MESSAGES.PROFILE_UDPATE);
        // closeAllPopups();
      })
      .catch((err) => {
        setPopupMessage(POPUP_MESSAGES.ERROR_DEFAULT);
      })
      .finally(() => {
        setIsPopupOpen(true);
        setIsLoading(false);
      });
  }

  function updateShowMoreVisibility(searchData) {
    const searchResFull = JSON.parse(localStorage.getItem('searchResult'));
    if (searchData.length >= searchResFull.length) {
      setIsShowMoreHidden(true);
    } else {
      setIsShowMoreHidden(false);
    }
  }

  function handleSearch(phrase, isShort) {
    setSearchResult(null);
    setIsLoading(true);
    localStorage.setItem('search', phrase);
    localStorage.setItem('isShort', isShort);

    if (!localStorage.allMovies) {
      MoviesApiService.getAllMovies()
        .then((data) => {
          localStorage.setItem('allMovies', JSON.stringify(data));

          const searchResFull = searchMovies(data, phrase, isShort);
          localStorage.setItem('searchResult', JSON.stringify(searchResFull));

          const searchResDisplay = searchResFull.slice(0, cardsLayout.base);
          updateShowMoreVisibility(searchResDisplay);
          setSearchResult(searchResDisplay);
        })
        .catch(() => {
          setPopupMessage(POPUP_MESSAGES.ERROR_DEFAULT);
          setIsPopupOpen(true);
        })
        .finally(() => setIsLoading(false));
    } else {
      const collection = JSON.parse(localStorage.getItem('allMovies'));
      const searchResFull = searchMovies(collection, phrase, isShort);

      localStorage.setItem('searchResult', JSON.stringify(searchResFull));
      const searchResDisplay = searchResFull.slice(0, cardsLayout.base);

      updateShowMoreVisibility(searchResDisplay);
      setSearchResult(searchResDisplay);
      setIsLoading(false);
    }
  }

  function handleLoadMore() {
    const searchResFull = JSON.parse(localStorage.getItem('searchResult'));
    let newCardsAmount = searchResult.length;

    if (searchResFull.length > searchResult.length) {
      newCardsAmount += cardsLayout.add;
      setSearchResult(searchResFull.slice(0, newCardsAmount));
    }

    if (newCardsAmount >= searchResFull.length) {
      setIsShowMoreHidden(true);
    } else {
      setIsShowMoreHidden(false);
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Switch>
          <Route path='/sign-in'>
            {isLogged ? <Redirect to='/' /> : <Login onLogin={handleLogin} isLoading={isLoading} />}
          </Route>
          <Route path='/sign-up'>
            {isLogged ? <Redirect to='/' /> : <Register onSignup={handleRegister} isLoading={isLoading} />}
          </Route>
          <ProtectedRoute path='/movies' isLogged={isLogged}>
            <Header isLogged={isLogged} />
            <Movies
              onMount={handleOnMount}
              savedMovies={savedMovies}
              onLike={handleLike}
              onSearch={handleSearch}
              onLoadMore={handleLoadMore}
              searchResult={searchResult}
              isLoading={isLoading}
              isHidden={isShowMoreHidden}
            />
            <Footer />
          </ProtectedRoute>
          <ProtectedRoute path='/saved-movies' isLogged={isLogged}>
            <Header isLogged={isLogged} />
            <SavedMovies savedMovies={savedMovies} onDislike={handleDislike} />
            <Footer />
          </ProtectedRoute>
          <ProtectedRoute path='/profile' isLogged={isLogged}>
            <Header isLogged={isLogged} />
            <Profile onSubmit={handleUpdateUser} onLogout={handleLogout} isLoading={isLoading} />
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
        <InfoTooltip
          isOpen={isPopupOpen}
          isSuccess={true}
          message={popupMessage}
          onClose={() => setIsPopupOpen(false)}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}
