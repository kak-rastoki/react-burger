import { CurrencyIcon, Counter } from '@krgaa/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';

import styles from './ingredient-card.module.css';

export const IngredientCard = ({ ingredient, onClick, count = 0 }) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: 'ingredient',
    item: ingredient,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <li
      ref={dragRef}
      className={styles.card}
      onClick={() => onClick(ingredient)}
      style={{ opacity: isDragging ? 0.6 : 1 }}
    >
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
