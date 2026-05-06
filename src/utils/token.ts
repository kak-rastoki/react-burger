// вывел повторяющийся код в отдельный файл работы с токенами
import Cookies from 'js-cookie';

export function setTokens(accessToken: string, refreshToken: string): void {
  Cookies.set('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
}

export function dropTokens(): void {
  Cookies.remove('accessToken');
  localStorage.removeItem('refreshToken');
}

export function isTokenExists(): boolean {
  return !!Cookies.get('accessToken');
}
