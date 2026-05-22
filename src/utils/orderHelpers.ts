import type { TIngredient } from './baseTypes';

export const calculateOrderPrice = (
  orderIngredientIds: string[],
  allIngredients: TIngredient[]
): number => {
  if (!orderIngredientIds || !allIngredients.length) return 0;

  return orderIngredientIds.reduce((sum, id) => {
    const ingredient = allIngredients.find((item) => item._id === id);
    return ingredient ? sum + ingredient.price : sum;
  }, 0);
};
export const getOrderIngredients = (
  orderIngredientIds: string[],
  allIngredients: TIngredient[]
): TIngredient[] => {
  if (!orderIngredientIds || !allIngredients.length) return [];

  const foundIngredients = orderIngredientIds
    .map((id) => allIngredients.find((item) => item._id === id))
    .filter((item): item is TIngredient => !!item);

  const buns = foundIngredients.filter((item) => item.type === 'bun');
  const otherIngredients = foundIngredients.filter((item) => item.type !== 'bun');

  const uniqueBuns = buns.length > 0 ? [buns[0]] : [];

  return [...uniqueBuns, ...otherIngredients];
};
