import { Tab } from '@krgaa/react-developer-burger-ui-components';
import { useState, useRef } from 'react';

import { IngredientCard } from '../ingredient-card/ingredient-card';

import styles from './burger-ingredients.module.css';

export const BurgerIngredients = ({ ingredients, onIngredietnsClick }) => {
  const [currentTab, setCurrentTab] = useState('bun');
  // рефики с заголовками разделов
  const bunRef = useRef(null);
  const sauceRef = useRef(null);
  const mainRef = useRef(null);

  // фильтрация ингредиентов через фильтр
  const buns = ingredients.filter((ingredient) => ingredient.type === 'bun');
  const sauces = ingredients.filter((ingredient) => ingredient.type === 'sauce');
  const mains = ingredients.filter((item) => item.type === 'main');

  // нажатие на таб : вызывает прокрутку к тек. рефу
  const onTabClick = (tab) => {
    setCurrentTab(tab);

    const refMap = {
      bun: bunRef,
      sauce: sauceRef,
      main: mainRef,
    };

    refMap[tab].current?.scrollIntoView({ behavior: 'smooth' });
  };

  console.log(ingredients);
  return (
    <section className={styles.burger_ingredients}>
      <nav>
        <ul className={styles.menu}>
          <Tab value="bun" active={currentTab === 'bun'} onClick={onTabClick}>
            Булки
          </Tab>
          <Tab value="sauce" active={currentTab === 'sauce'} onClick={onTabClick}>
            Соусы
          </Tab>
          <Tab value="main" active={currentTab === 'main'} onClick={onTabClick}>
            Начинки
          </Tab>
        </ul>
      </nav>

      <div className={`${styles.ingredients} custom-scroll`}>
        <h2 ref={bunRef}>Булки</h2>
        <ul className={styles.list}>
          {buns.map((bun) => (
            <IngredientCard
              key={bun._id}
              ingredient={bun}
              onClick={onIngredietnsClick}
            />
          ))}
        </ul>

        <h2 ref={sauceRef}>Соусы</h2>
        <ul className={styles.list}>
          {sauces.map((sauce) => (
            <IngredientCard
              key={sauce._id}
              ingredient={sauce}
              onClick={onIngredietnsClick}
            />
          ))}
        </ul>

        <h2 ref={mainRef}>Начинки</h2>
        <ul className={styles.list}>
          {mains.map((main) => (
            <IngredientCard
              key={main._id}
              ingredient={main}
              onClick={onIngredietnsClick}
            />
          ))}
        </ul>
      </div>
    </section>
  );
};
