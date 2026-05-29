export type TIngredient = {
  _id: string;
  name: string;
  type: 'bun' | 'sauce' | 'main';
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  uniqueId?: string;
};

export type TUser = {
  email: string;
  name: string;
};

export type TOrder = {
  _id: string;
  ingredients: string[];
  status: 'created' | 'pending' | 'done';
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
};

export type TWSResponse = {
  success: boolean;
  orders: TOrder[];
  total: number;
  totalToday: number;
};
