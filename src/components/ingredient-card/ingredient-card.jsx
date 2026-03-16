import { CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';

import style from './ingredient-card.module.css';

export const IngredientCard = ({ key, ingredient }) => {
  return (
    <li key={key} className="${style.card} ">
      <img className={style.image} alt={ingredient.name} src={ingredient.image}></img>
      <span className={style.price}>
        <p>{ingredient.price}</p>
        <CurrencyIcon type="primary" />
      </span>
      <p className={style.name}>{ingredient.name}</p>
    </li>
  );
};
