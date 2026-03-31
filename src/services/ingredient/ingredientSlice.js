import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentIngredient: null,
};

export const ingredientSlice = createSlice({
  name: 'ingredientDetails',
  initialState,
  reducers: {
    setIngredientDetails: (state, action) => {
      state.currentIngredient = action.payload;
    },
    clearIngredientDetails: (state) => {
      state.currentIngredient = null;
    },
  },
});

export const { setIngredientDetails, clearIngredientDetails } = ingredientSlice.actions;
export default ingredientSlice.reducer;
export const selectCurrentIngredient = (state) =>
  state.ingredientDetails.currentIngredient;
