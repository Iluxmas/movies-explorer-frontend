export const PATTERNS = {
  NAME: '^[a-zA-Zа-яА-Я- ]+$',
  EMAIL: '^\\w+@\\w+\\.(?:ru|net|org|com|by|ua|kz|org|de)$'
}

export const POPUP_MESSAGES = {
  ERROR_DEFAULT: 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.',
  REG_SUCC: 'Вы были успешно зарегистрированы!',
  PROFILE_UDPATE: 'Данные профиля успешно обновлены!',
  BAD_REQUEST: 'Во время запроса произошла ошибка. Были получены некорректные данные',
  NOT_FOUND: 'Во время запроса произошла ошибка. Фильм не найден в списке сохраненных.',
  CONFLICT: 'Пользователь с указанной почтой уже зарегистрирован',
  AUTH_ERR: 'Произошла ошибка при авторизации пользователя. Проверьте почту или пароль.',
  VALIDATION: 'Произошла ошибка при аутентификации пользователя.'
};

export const SHORT_LENGTH = 40;

export const LAYOUT = {
  MOBILE: { base: 5, add: 5 },
  TABLET: { base: 8, add: 2 },
  DESKTOP: { base: 12, add: 3 },
}

export const RES_BOUNDARY = {
  MOBILE: 720,
  TABLET: 1024
}

export const MOVIE_API_URL = 'https://api.nomoreparties.co/';

export const MAIN_API_URL = 'https://kino.nomoredomains.club/api';