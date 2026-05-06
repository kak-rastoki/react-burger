import { useLocation, useNavigate, type Location } from 'react-router-dom';

import { useCreateOrderMutation } from '@/services/api/ingredientsApi';
import {
  selectBun,
  selectFilling,
  clearConstructor,
} from '@/services/constructor/constructorSlice';
import { useAppDispatch, useAppSelector } from '@/services/store';
import { selectUser } from '@/services/user/userSlice';
import { BurgerConstructor } from '@components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';

import type { ReactElement } from 'react';

import type { TIngredient } from '@/utils/baseTypes';

import styles from './home.module.css';

export const Home = (): ReactElement => {
  const location: Location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const [createOrder, { isLoading: isOrderLoading }] = useCreateOrderMutation();

  const bun = useAppSelector(selectBun);
  const filling = useAppSelector(selectFilling);

  const handleIngredientClick = (ingredient: TIngredient): void => {
    navigate(`/ingredients/${ingredient._id}`, {
      state: { background: location },
    });
  };

  const handleOrderClick = async (): Promise<void> => {
    if (!user) {
      navigate('/login', { state: { from: location } });
      return;
    }

    if (!bun) {
      alert('Заказ не может быть сформирован без булки');
      return;
    }

    const orderIds: string[] = [
      bun._id,
      ...filling.map((item: TIngredient): string => item._id),
      bun._id,
    ];

    try {
      const response = await createOrder({ ingredients: orderIds }).unwrap();
      navigate(`/order/${response.order.number}`, {
        state: { background: location },
      });

      dispatch(clearConstructor());
    } catch (err) {
      console.error('Ошибка при создании заказа:', err);
    }
  };

  return (
    <div className={styles.app}>
      <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
        Соберите бургер
      </h1>
      <main className={`${styles.main} pl-5 pr-5 `}>
        <BurgerIngredients onIngredietnsClick={handleIngredientClick} />
        <BurgerConstructor
          isOrderLoading={isOrderLoading}
          onOrderButtonClick={handleOrderClick}
        />
      </main>
    </div>
  );
};
