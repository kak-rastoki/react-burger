import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Экшены для работы с начинками и булками
import {
  selectBun,
  selectFilling,
  clearConstructor,
} from '@/services/constructor/constructorSlice.js';
// Экшены для выбранного ингредиента
import {
  setIngredientDetails,
  clearIngredientDetails,
  selectCurrentIngredient,
} from '@/services/ingredient/ingredientSlice';
import { AppHeader } from '@components/app-header/app-header';
import { BurgerConstructor } from '@components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';

import { useCreateOrderMutation } from '../../services/api/ingredientsApi';
import { IngredientDetail } from '../ingredient-details/ingredient-details.jsx';
import { Modal } from '../modal/modal.jsx';
import { OrderDetails } from '../order-details/order-details.jsx';

import styles from './app.module.css';

export const App = () => {
  const dispatch = useDispatch();

  const [createOrder, { isLoading: isOrderLoading }] = useCreateOrderMutation();

  const selectedIngredient = useSelector(selectCurrentIngredient);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);

  const bun = useSelector(selectBun);
  const filling = useSelector(selectFilling);

  // Модалка ингредиента
  const handleIngredientClick = (ingredient) => {
    dispatch(setIngredientDetails(ingredient));
  };

  const closeIngredientModal = () => {
    dispatch(clearIngredientDetails());
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
      dispatch(clearConstructor()); //авто очистка после заказа
    } catch (err) {
      console.error('Ошибка при создании заказа:', err);
      alert('Ошибка при создании заказа: ' + err.message);
    }
  };

  const closeOrderModal = () => {
    setIsOrderModalOpen(false);
    setCurrentOrder(null);
  };

  return (
    <div className={styles.app}>
      <AppHeader />

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
