import { CurrencyIcon, Counter } from '@krgaa/react-developer-burger-ui-components';
import { useDrag, type DragSourceMonitor } from 'react-dnd';

import type { TIngredient } from '@/utils/baseTypes';

import styles from './ingredient-card.module.css';

type TIngredientCardProps = {
  ingredient: TIngredient;
  onClick: (ingredient: TIngredient) => void;
  count?: number;
};

export const IngredientCard = ({
  ingredient,
  onClick,
  count = 0,
}: TIngredientCardProps): React.ReactElement => {
  const [{ isDragging }, dragRef] = useDrag<
    TIngredient,
    unknown,
    { isDragging: boolean }
  >({
    type: 'ingredient',
    item: ingredient,
    collect: (monitor: DragSourceMonitor): { isDragging: boolean } => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <li
      ref={(node: HTMLLIElement | null): void => {
        dragRef(node);
      }}
      className={styles.card}
      onClick={(): void => onClick(ingredient)}
      style={{ opacity: isDragging ? 0.6 : 1 }}
    >
      {count > 0 && <Counter count={count} size="default" />}
      <img className={styles.image} alt={ingredient.name} src={ingredient.image} />
      <span className={styles.price}>
        <p className="text text_type_digits-default">{ingredient.price}</p>
        <CurrencyIcon type="primary" />
      </span>
      <p className={styles.name}>{ingredient.name}</p>
    </li>
  );
};
