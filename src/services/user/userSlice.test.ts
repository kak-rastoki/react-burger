// ТЕСТЫ СЛАЙСА ПОЛЬЗОВАТЕЛЯ
import { describe, it, expect } from 'vitest';

import userReducer, { setAuthChecked, setUser } from './userSlice';

import type { TUser } from '@/utils/baseTypes';

describe('userSlice reducer', () => {
  const initialState = {
    user: null,
    isAuthChecked: false,
  };

  const mockUser: TUser = {
    email: 'space-burger@yandex.ru',
    name: 'Космический Космонавт',
  };

  // стейт
  it('должен вернуть стейт, который задается при инициализации, если пусто', (): void => {
    const result = userReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(result).toEqual(initialState);
  });

  // setAuthChecekd
  it('should handle setAuthChecked', (): void => {
    const result = userReducer(initialState, setAuthChecked(true));
    expect(result.isAuthChecked).toBe(true);
  });

  // юзер ставится
  it('should handle setUser', (): void => {
    const result = userReducer(initialState, setUser(mockUser));
    expect(result.user).toEqual(mockUser);
  });

  // экстраредусер - авторизация юзера
  it('Успешное получения польователя с сервера', (): void => {
    const action = {
      type: 'authApi/executeQuery/fulfilled',
      payload: { user: mockUser },
      meta: {
        arg: {
          endpointName: 'getUser',
        },
        reducerPath: 'authApi',
      },
    };
    const result = userReducer(initialState, action);
    expect(result.user).toEqual(mockUser);
    expect(result.isAuthChecked).toBe(true);
  });

  it('Запрос пользователя отклоняется сервером', (): void => {
    const action = {
      type: 'authApi/executeQuery/rejected',
      meta: {
        arg: {
          endpointName: 'getUser',
        },
        reducerPath: 'authApi',
      },
    };
    const dirtyState = {
      user: mockUser,
      isAuthChecked: false,
    };

    const result = userReducer(dirtyState, action);
    expect(result.user).toBeNull();
    expect(result.isAuthChecked).toBe(true);
  });

  it('Успешный логин - > пользователь записывается в хранилище, а проверка авторизации завершаетс', (): void => {
    const action = {
      type: 'authApi/executeMutation/fulfilled',
      payload: { user: mockUser },
      meta: {
        arg: {
          endpointName: 'login',
        },
        reducerPath: 'authApi',
      },
    };

    const result = userReducer(initialState, action);
    expect(result.user).toEqual(mockUser);
    expect(result.isAuthChecked).toBe(true);
  });

  it('Успешный выход пользователя - > юзер отчищается до нуля', (): void => {
    const action = {
      type: 'authApi/executeMutation/fulfilled',
      meta: {
        arg: {
          endpointName: 'logout',
        },
        reducerPath: 'authApi',
      },
    };

    const loggedInState = {
      user: mockUser,
      isAuthChecked: true,
    };

    const result = userReducer(loggedInState, action);

    expect(result.user).toBeNull();
  });
});
