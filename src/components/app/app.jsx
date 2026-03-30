import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  addBun,
  addFilling,
  selectBun,
  selectFilling,
} from '@/services/constructor/constructorSlice.js';
import { AppHeader } from '@components/app-header/app-header';
import { BurgerConstructor } from '@components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';

import {
  useGetIngredientsQuery,
  useCreateOrderMutation,
} from '../../services/api/ingredientsApi';
import { IngredientDetail } from '../ingredient-details/ingredient-details.jsx';
import { Modal } from '../modal/modal.jsx';
import { OrderDetails } from '../order-details/order-details.jsx';

import styles from './app.module.css';

export const App = () => {
  const dispatch = useDispatch();
  const {
    data: ingredientsData,
    isLoading,
    error: ingredientsError,
  } = useGetIngredientsQuery();

  const [createOrder, { isLoading: isOrderLoading }] = useCreateOrderMutation();
  const ingredients = ingredientsData?.data || [];
  const responseIngredientsError = ingredientsError?.message || null;

  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false); // заменить на createOrder
  const [currentOrder, setCurrentOrder] = useState(null);

  const bun = useSelector(selectBun);
  const filling = useSelector(selectFilling);

  // const buns = ingredients.filter((ingredient) => ingredient.type === 'bun');
  // const [constructorItems, setConstructorItems] = useState({
  //   bun: buns[0],
  //   filling: ingredients.filter((item) => item.type !== 'bun').slice(6, 12),
  // });

  // Модалка ингредиента
  const handleIngredientClick = (ingredient) => {
    setSelectedIngredient(ingredient);
  };

  const closeIngredientModal = () => {
    setSelectedIngredient(null);
  };

  // Модалка ордера
  const handleOrderClick = async () => {
    if (!bun) {
      alert('Заказ не может быть сформирован без булки');
      return;
    }
    const orderIds = [bun._id, ...filling.map((item) => item._id), bun._id];
    try {
      const response = await createOrder({ ingredients: orderIds }).unwrap();
      setCurrentOrder(response.order.number);
      setIsOrderModalOpen(true);
    } catch (err) {
      console.error('Ошибка при создании заказа:', err);
      alert('Ошибка при создании заказа: ' + err.message);
    }
  };

  const closeOrderModal = () => {
    setIsOrderModalOpen(false);
    setCurrentOrder(null);
  };

  useEffect(() => {
    if (ingredients.length > 0) {
      const bunItem = ingredients.find((item) => item.type === 'bun');
      if (bunItem && !bun) {
        dispatch(addBun(bunItem));
      }
      const fillingItems = ingredients.filter((item) => item.type !== 'bun').slice(0, 6);
      fillingItems.forEach((item) => {
        dispatch(addFilling(item));
      });
    }
  }, [ingredients, dispatch, bun]);

  return (
    <div className={styles.app}>
      <AppHeader />

      <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
        Соберите бургер
      </h1>
      <main className={`${styles.main} pl-5 pr-5 `}>
        <BurgerIngredients
          isLoading={isLoading}
          ingredients={ingredients}
          onIngredietnsClick={handleIngredientClick}
          responseError={responseIngredientsError}
        />
        <BurgerConstructor
          isOrderLoading={isOrderLoading}
          onOrderButtonClick={handleOrderClick}
        />
      </main>
      {selectedIngredient && (
        <Modal title="Детали ингредиента" onClose={closeIngredientModal}>
          <IngredientDetail ingredient={selectedIngredient} />
        </Modal>
      )}

      {isOrderModalOpen && (
        <Modal onClose={closeOrderModal}>
          <OrderDetails orderNumber={currentOrder} />
        </Modal>
      )}
    </div>
  );
};
