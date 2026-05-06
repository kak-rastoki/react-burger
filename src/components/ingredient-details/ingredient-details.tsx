import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useParams } from 'react-router-dom';

import { useGetIngredientsQuery } from '@/services/api/ingredientsApi';

import type { TIngredient } from '@/utils/baseTypes';

import styles from './ingredient-detail.module.css';

type TIngredientParams = {
  id: string;
};

export const IngredientDetail = (): React.ReactElement | null => {
  const { id } = useParams<TIngredientParams>();
  const { data, isLoading } = useGetIngredientsQuery();
  const ingredients: TIngredient[] = data?.data || [];
  const ingredient = ingredients.find((item: TIngredient): boolean => item._id === id);

  if (isLoading) {
    return <Preloader />;
  }

  if (!ingredient) {
    return <p className="text text_type_main-medium mt-10">Ингредиент не найден</p>;
  }

  return (
    <div className={styles.details}>
      <img className={styles.image} src={ingredient.image_large} alt={ingredient.name} />
      <p className="text text_type_main-medium mt-4">{ingredient.name}</p>

      <div className={styles.nutrition}>
        <div className={styles.nutritionItem}>
          <p className="text text_type_main-default text_color_inactive">Калории,ккал</p>
          <p className="text text_type_digits-default">{ingredient.calories}</p>
        </div>

        <div className={styles.nutritionItem}>
          <p className="text text_type_main-default text_color_inactive">Белки, г</p>
          <p className="text text_type_digits-default">{ingredient.proteins}</p>
        </div>

        <div className={styles.nutritionItem}>
          <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
          <p className="text text_type_digits-default">{ingredient.fat}</p>
        </div>

        <div className={styles.nutritionItem}>
          <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
          <p className="text text_type_digits-default">{ingredient.carbohydrates}</p>
        </div>
      </div>
    </div>
  );
};
