import { CurrencyIcon, Counter } from '@krgaa/react-developer-burger-ui-components';

import styles from './ingredient-card.module.css';

export const IngredientCard = ({ ingredient, onClick, count = 0 }) => {
  return (
    <li className={styles.card} onClick={() => onClick(ingredient)}>
      {count > 0 && <Counter count={count} size="default" />}
      <img className={styles.image} alt={ingredient.name} src={ingredient.image}></img>
      <span className={styles.price}>
        <p>{ingredient.price}</p>
        <CurrencyIcon type="primary" />
      </span>
      <p className={styles.name}>{ingredient.name}</p>
    </li>
  );
};
