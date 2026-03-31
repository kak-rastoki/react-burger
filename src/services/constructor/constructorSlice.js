import { createSlice, createSelector } from '@reduxjs/toolkit';

const initialState = {
  bun: null,
  filling: [],
};

export const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addBun: (state, action) => {
      state.bun = action.payload;
    },
    addFilling: (state, action) => {
      state.filling.push(action.payload);
    },
    removeFilling: (state, action) => {
      state.filling.splice(action.payload, 1);
    },
    moveFilling: (state, action) => {
      const { fromId, toId } = action.payload;
      const moved = state.filling.splice(fromId, 1)[0];
      state.filling.splice(toId, 0, moved);
    },
    clearConstructor: (state) => {
      state.bun = null;
      state.filling = [];
    },
  },
});

export const { addBun, addFilling, removeFilling, moveFilling, clearConstructor } =
  constructorSlice.actions;

export default constructorSlice.reducer;

// селекторы
export const selectBun = (state) => state.burgerConstructor.bun;
export const selectFilling = (state) => state.burgerConstructor.filling;
export const selectConstructorItems = (state) => state.burgerConstructor;

// расчет финальной суммы заказа
export const selectTotalPrice = createSelector(
  [selectBun, selectFilling],
  (bun, filling) => {
    if (!bun) return 0;
    const fillingTotal = filling.reduce((sum, item) => sum + item.price, 0);
    return bun.price * 2 + fillingTotal;
  }
);

// селектор для счетчиков того, что лежит в конструкторе
export const selectIngredientCount = createSelector(
  [selectConstructorItems],
  (constructor) => {
    if (!constructor) return {};
    const counts = {};
    if (constructor.bun) {
      counts[constructor.bun._id] = 2;
    }
    constructor.filling.forEach((item) => {
      counts[item._id] = (counts[item._id] || 0) + 1;
    });
    return counts;
  }
);
