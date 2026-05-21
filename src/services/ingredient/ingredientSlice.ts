import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { TIngredient } from '@/utils/baseTypes';

import type { RootState } from '../store';

type TIngredientState = {
  currentIngredient: TIngredient | null;
};

const initialState: TIngredientState = {
  currentIngredient: null,
};

export const ingredientSlice = createSlice({
  name: 'ingredientDetails',
  initialState,
  reducers: {
    setIngredientDetails: (
      state: TIngredientState,
      action: PayloadAction<TIngredient>
    ): void => {
      state.currentIngredient = action.payload;
    },
    clearIngredientDetails: (state: TIngredientState): void => {
      state.currentIngredient = null;
    },
  },
});

export const { setIngredientDetails, clearIngredientDetails } = ingredientSlice.actions;
export default ingredientSlice.reducer;

export const selectCurrentIngredient = (state: RootState): TIngredient | null =>
  state.ingredientDetails.currentIngredient;
