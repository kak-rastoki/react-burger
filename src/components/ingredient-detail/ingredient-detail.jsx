import styles from './ingredient-detail.module.css';

export const IngredientDetail = ({ ingredient }) => {
  if (!ingredient) return null;

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
