import { useEffect, useState } from 'react';

import { AppHeader } from '@components/app-header/app-header';
import { BurgerConstructor } from '@components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';

import { useGetIngredientsQuery } from '../../services/api/ingredientsApi';
import { IngredientDetail } from '../ingredient-details/ingredient-details.jsx';
import { Modal } from '../modal/modal.jsx';
import { OrderDetails } from '../order-details/order-details.jsx';

import styles from './app.module.css';

export const App = () => {
  const {
    data: ingredientsData,
    isLoading,
    error: ingredientsError,
  } = useGetIngredientsQuery();
  // const [createOrder, { isLoading: isOrderLoading }] = useCreateOrderMutation();
  const ingredients = ingredientsData?.data || [];
  const responseIngredientsError = ingredientsError?.message || null;

  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  // const [orderNumber, setOrderNumber] = useState(null);

  const [constructorItems, setConstructorItems] = useState({
    bun: null,
    filling: [],
  });

  // Модалка ингредиента
  const handleIngredientClick = (ingredient) => {
    setSelectedIngredient(ingredient);
  };

  const closeIngredientModal = () => {
    setSelectedIngredient(null);
  };

  // Модалка ордера
  const handleOrderClick = () => {
    setIsOrderModalOpen(true);
  };

  const closeOrderModal = () => {
    setIsOrderModalOpen(false);
  };

  const testOrder = {
    // имитирую объект ордера ,чтобы тренировать пропсы
    id: '034536',
    isCompleted: false,
  };

  useEffect(() => {
    if (ingredients.length > 0) {
      const bun = ingredients.find((item) => item.type === 'bun'); // поиск первй булки
      const filling = ingredients.filter((item) => item.type !== 'bun').slice(6, 12);
      setConstructorItems({
        bun: bun || null,
        filling: filling,
      });
    }
  }, [ingredients]);

  return (
    <div className={styles.app}>
      <AppHeader />

      <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
        Соберите бургер
      </h1>
      <main className={`${styles.main} pl-5 pr-5 `}>
        <BurgerIngredients
          constructorItems={constructorItems}
          isLoading={isLoading}
          ingredients={ingredients}
          onIngredietnsClick={handleIngredientClick}
          responseError={responseIngredientsError}
        />
        <BurgerConstructor
          ingredients={ingredients}
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
          <OrderDetails order={testOrder} />
        </Modal>
      )}
    </div>
  );
};
