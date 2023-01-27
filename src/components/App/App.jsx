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
  const [movies, setMovies] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLogged, setIsLogged] = useState(true);
  const [user, setUser] = useState(null);

  const history = useHistory();
  const token = localStorage.getItem('jwt');

  useEffect(() => {
    // tokenCheck();
    // setUser();
    MoviesApiService.getAllMovies().then((data) => setMovies(data));
  }, []);

  function tokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      MainApiService.validate(jwt)
        .then((data) => {
          if (data) {
            setUser(data);
            setIsLogged(true);
            history.push('/');
            return data;
          } else return;
        })
        .catch((err) => console.log('Error: ', err));
    }
  }

  function handleLogout() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('email');
    setIsLogged(false);
    setCurrentUser(null);
    setUser('');
    setMovies([]);
    history.push('/');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Switch>
          <Route path='/sign-in'>
            <Login />
          </Route>
          <Route path='/sign-up'>
            <Register />
          </Route>
          <ProtectedRoute path='/movies' isLogged={isLogged}>
            <Header isLogged={isLogged} />
            <Movies />
            <Footer />
          </ProtectedRoute>
          <ProtectedRoute path='/saved-movies' isLogged={isLogged}>
            <Header isLogged={isLogged} />
            <SavedMovies />
            <Footer />
          </ProtectedRoute>
          <ProtectedRoute path='/profile' isLogged={isLogged}>
            <Header isLogged={isLogged} />
            <Profile userData={user} onSubmit={null} onLogout={handleLogout} />
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
