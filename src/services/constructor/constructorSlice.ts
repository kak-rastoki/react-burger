import { createSlice, createSelector } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';

import type { TIngredient } from '@/utils/baseTypes';

import type { RootState } from '../store';

type TConstructorState = {
  bun: TIngredient | null;
  filling: TIngredient[];
};

const initialState: TConstructorState = {
  bun: null,
  filling: [],
};

export const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addBun: (state: TConstructorState, action: PayloadAction<TIngredient>): void => {
      state.bun = action.payload;
    },
    addFilling: (state: TConstructorState, action: PayloadAction<TIngredient>): void => {
      state.filling.push(action.payload);
    },
    removeFilling: (state: TConstructorState, action: PayloadAction<number>): void => {
      state.filling.splice(action.payload, 1);
    },
    moveFilling: (
      state: TConstructorState,
      action: PayloadAction<{ fromId: number; toId: number }>
    ): void => {
      const { fromId, toId } = action.payload;
      const moved: TIngredient = state.filling.splice(fromId, 1)[0];
      state.filling.splice(toId, 0, moved);
    },
    clearConstructor: (state: TConstructorState): void => {
      state.bun = null;
      state.filling = [];
    },
  },
});

export const { addBun, addFilling, removeFilling, moveFilling, clearConstructor } =
  constructorSlice.actions;

export default constructorSlice.reducer;

export const selectBun = (state: RootState): TIngredient | null =>
  state.burgerConstructor.bun;
export const selectFilling = (state: RootState): TIngredient[] =>
  state.burgerConstructor.filling;
export const selectConstructorItems = (state: RootState): TConstructorState =>
  state.burgerConstructor;

export const selectTotalPrice = createSelector(
  [selectBun, selectFilling],
  (bun: TIngredient | null, filling: TIngredient[]): number => {
    if (!bun) return 0;
    const fillingTotal: number = filling.reduce(
      (sum: number, item: TIngredient) => sum + item.price,
      0
    );
    return bun.price * 2 + fillingTotal;
  }
);

export const selectIngredientCount = createSelector(
  [selectConstructorItems],
  (constructor: TConstructorState): Record<string, number> => {
    if (!constructor) return {};
    const counts: Record<string, number> = {};
    if (constructor.bun) {
      counts[constructor.bun._id] = 2;
    }
    constructor.filling.forEach((item: TIngredient) => {
      counts[item._id] = (counts[item._id] || 0) + 1;
    });
    return counts;
  }
);
