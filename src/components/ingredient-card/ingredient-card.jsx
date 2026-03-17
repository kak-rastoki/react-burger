import { CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';

import styles from './ingredient-card.module.css';

export const IngredientCard = ({ ingredient, onClick }) => {
  return (
    <li className={styles.card} onClick={() => onClick(ingredient)}>
      <img className={styles.image} alt={ingredient.name} src={ingredient.image}></img>
      <span className={styles.price}>
        <p>{ingredient.price}</p>
        <CurrencyIcon type="primary" />
      </span>
      <p className={styles.name}>{ingredient.name}</p>
    </li>
  );
};
