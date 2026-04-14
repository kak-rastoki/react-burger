// вывел повторяющийся код в отдельный файл работы с токенами
import Cookies from 'js-cookie';

export function setTokens(accessToken, refreshToken) {
  Cookies.set('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
}

export function dropTokens() {
  Cookies.remove('accessToken');
  localStorage.removeItem('refreshToken');
}

export function isTokenExists() {
  return !!Cookies.get('accessToken');
}
