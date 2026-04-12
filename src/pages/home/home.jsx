import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { useCreateOrderMutation } from '@/services/api/ingredientsApi';
// Экшены для работы с начинками и булками
import {
  selectBun,
  selectFilling,
  clearConstructor,
} from '@/services/constructor/constructorSlice.js';
// Экшены для выбранного ингредиента
import { BurgerConstructor } from '@components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';

import styles from '../home.module.css';

export const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [createOrder, { isLoading: isOrderLoading }] = useCreateOrderMutation();

  // const selectedIngredient = useSelector(selectCurrentIngredient);

  const bun = useSelector(selectBun);
  const filling = useSelector(selectFilling);

  // Модалка ингредиента
  const handleIngredientClick = (ingredient) => {
    // dispatch(setIngredientDetails(ingredient));
    navigate(`/ingredients/${ingredient._id}`, {
      state: { background: location },
    });
  };

  // const closeIngredientModal = () => {
  //   dispatch(clearIngredientDetails());
  // };

  // Модалка ордера
  const handleOrderClick = async () => {
    if (!bun) {
      alert('Заказ не может быть сформирован без булки');
      return;
    }
    const orderIds = [bun._id, ...filling.map((item) => item._id), bun._id];
    try {
      const response = await createOrder({ ingredients: orderIds }).unwrap();
      navigate(`/order/${response.order.number}`, {
        state: { background: location },
      });

      dispatch(clearConstructor()); //авто очистка после заказа
    } catch (err) {
      console.error('Ошибка при создании заказа:', err);
      alert('Ошибка при создании заказа: ' + err.message);
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
      {/* {selectedIngredient && (
        <Modal title="Детали ингредиента" onClose={closeIngredientModal}>
          <IngredientDetail ingredient={selectedIngredient} />
        </Modal>
      )}

      {isOrderModalOpen && (
        <Modal onClose={closeOrderModal}>
          <OrderDetails orderNumber={currentOrder} />
        </Modal>
      )} */}
    </div>
  );
};
