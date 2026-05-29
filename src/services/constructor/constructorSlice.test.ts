// ТЕСТЫ СЛАЙСА КОНСТРУКТОРА
import { describe, it, expect } from 'vitest';

import constructorReducer, {
  addBun,
  addFilling,
  removeFilling,
  moveFilling,
  clearConstructor,
} from './constructorSlice';

import type { TIngredient } from '@/utils/baseTypes';

describe('burgerConstructor reducer', () => {
  const initialState = {
    bun: null,
    filling: [],
  };

  const mockBun: TIngredient = {
    _id: '1',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://resources.burgers/bun.png',
    image_mobile: 'https://resources.burgers/bun-mobile.png',
    image_large: 'https://resources.burgers/bun-large.png',
  };
  const mockFilling1: TIngredient = {
    _id: '2',
    name: 'Соус с шипами Антарианского плоскоходца',
    type: 'sauce',
    proteins: 101,
    fat: 99,
    carbohydrates: 22,
    calories: 14,
    price: 88,
    image: 'https://resources.burgers/sauce.png',
    image_mobile: 'https://resources.burgers/sauce-mobile.png',
    image_large: 'https://resources.burgers/sauce-large.png',
    uniqueId: 'test-nano-id-123',
  };
  const mockFilling2: TIngredient = {
    _id: '3',
    name: 'Филе сочного Аватар-кока',
    type: 'main',
    proteins: 320,
    fat: 110,
    carbohydrates: 5,
    calories: 220,
    price: 1500,
    image: 'https://resources.burgers/meat.png',
    image_mobile: 'https://resources.burgers/meat-mobile.png',
    image_large: 'https://resources.burgers/meat-large.png',
    uniqueId: 'test-nano-id-456',
  };

  // стейт по умолчанию
  it('должен вернуть стейт по умолчанию при инициализации, если пусто', (): void => {
    const result = constructorReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(result).toEqual(initialState);
  });

  it('должен добавлять булку в стейт при вызове addBun', (): void => {
    const result = constructorReducer(initialState, addBun(mockBun));
    expect(result.bun).toEqual(mockBun);
  });

  it('должен добавлять начинку в массив при вызове addFilling', (): void => {
    const result = constructorReducer(initialState, addFilling(mockFilling1));
    expect(result.filling).toEqual([mockFilling1]);
  });

  it('должен удалять начинку из массива по индексу при вызове removeFilling', (): void => {
    const stateWithFilling = {
      bun: null,
      filling: [mockFilling1],
    };
    const result = constructorReducer(stateWithFilling, removeFilling(0));
    expect(result.filling).toEqual([]);
  });

  it('менять начинку местами при вызове moveFilling', (): void => {
    const stateWithMultipleFillings = {
      bun: null,
      filling: [mockFilling1, mockFilling2],
    };
    const result = constructorReducer(
      stateWithMultipleFillings,
      moveFilling({ fromId: 0, toId: 1 })
    );
    expect(result.filling).toEqual([mockFilling2, mockFilling1]);
  });

  it('должен очищать весь конструктор при вызове clearConstructor', (): void => {
    const dirtyState = {
      bun: mockBun,
      filling: [mockFilling1, mockFilling2],
    };
    const result = constructorReducer(dirtyState, clearConstructor());
    expect(result).toEqual(initialState);
  });
});
