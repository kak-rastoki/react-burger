import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import axios from 'axios';
import { useEffect, useState } from 'react';

import { AppHeader } from '@components/app-header/app-header';
import { BurgerConstructor } from '@components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';

import API_URL from '../../utils/constants.js';
import { IngredientDetail } from '../ingredient-detail/ingredient-detail.jsx';
import { Modal } from '../modal/modal.jsx';

import styles from './app.module.css';

export const App = () => {
  const [ingredients, setIngredients] = useState([]);
  const [responseIngredientsError, setResponseIngredientsError] = useState(null);
  const [loadingIngredientsError, setLoadingIngredientsError] = useState(true);
  const [selectedIngredient, setSelectedIngredient] = useState(null);

  const handleIngredientClick = (ingredient) => {
    setSelectedIngredient(ingredient);
  };

  const closeIngredientModal = () => {
    setSelectedIngredient(null);
  };

  useEffect(() => {
    // Загрузка ингридиентов с API
    axios
      .get(`${API_URL}/ingredients`)
      .then((response) => {
        if (response.data.success) {
          setIngredients(response.data.data);
        } else {
          setResponseIngredientsError('Не удалось загрузить ингредиенты');
        }
        setLoadingIngredientsError(false);
      })
      .catch((err) => {
        setLoadingIngredientsError(err.message);
        setLoadingIngredientsError(false);
      });
  }, []);

  if (loadingIngredientsError) {
    return <Preloader />;
  }

  if (responseIngredientsError) {
    return (
      <div className="text text_type_main-medium">
        Ошибка: {responseIngredientsError}
      </div>
    );
  }

  return (
    <div className={styles.app}>
      <AppHeader />

      <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
        Соберите бургер
      </h1>
      <main className={`${styles.main} pl-5 pr-5 `}>
        <BurgerIngredients
          ingredients={ingredients}
          onIngredietnsClick={handleIngredientClick}
        />
        <BurgerConstructor ingredients={ingredients} />
      </main>
      {selectedIngredient && (
        <Modal title="Детали ингредиента" onClose={closeIngredientModal}>
          <IngredientDetail ingredient={selectedIngredient} />
        </Modal>
      )}
    </div>
  );
};
