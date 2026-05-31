// ТЕСТЫ СЛАЙСА ДЕТАЛЕЙ ИНГРЕДИЕНТА
import { describe, it, expect } from 'vitest';

import ingredientReducer, {
  setIngredientDetails,
  clearIngredientDetails,
  initialState,
} from './ingredientSlice';

import type { TIngredient } from '@/utils/baseTypes';

describe('ingredientSlice reducer', () => {
  const mockIngredient: TIngredient = {
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

  it('должен вернуть стейт по умолчанию при инициализации, если пришел пустой экшен', (): void => {
    const result = ingredientReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(result).toEqual(initialState);
  });

  it('должен сохранять детали ингредиента в стейт при вызове setIngredientDetails', (): void => {
    const result = ingredientReducer(initialState, setIngredientDetails(mockIngredient));
    expect(result.currentIngredient).toEqual(mockIngredient);
  });

  it('должен очищать детали ингредиента (сбрасывать в null) при вызове clearIngredientDetails', (): void => {
    const dirtyState = {
      currentIngredient: mockIngredient,
    };
    const result = ingredientReducer(dirtyState, clearIngredientDetails());
    expect(result.currentIngredient).toBeNull();
  });
});
