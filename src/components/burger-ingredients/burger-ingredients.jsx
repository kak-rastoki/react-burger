import { Tab, Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useState, useRef, useCallback, useMemo } from 'react';

import { IngredientCard } from '../ingredient-card/ingredient-card';

import styles from './burger-ingredients.module.css';

export const BurgerIngredients = ({
  constructorItems,
  isLoading,
  ingredients,
  onIngredietnsClick,
  responseError,
}) => {
  const [currentTab, setCurrentTab] = useState('bun');
  // рефики с заголовками разделов
  const bunRef = useRef(null);
  const sauceRef = useRef(null);
  const mainRef = useRef(null);

  // фильтрация ингредиентов через фильтр
  const buns = useMemo(() =>
    ingredients.filter((ingredient) => ingredient.type === 'bun')
  );
  const sauces = useMemo(() =>
    ingredients.filter((ingredient) => ingredient.type === 'sauce')
  );
  const mains = useMemo(() => ingredients.filter((item) => item.type === 'main'));

  const getCount = useCallback((item) => {
    if (item.type === 'bun') {
      return constructorItems.bun && constructorItems.bun._id === item._id ? 2 : 0;
    } else {
      return constructorItems.filling.filter((fill) => fill._id === item._id).length;
    }
  });
  // нажатие на таб : вызывает прокрутку к тек. рефу
  const onTabClick = useCallback((tab) => {
    setCurrentTab(tab);

    const refMap = {
      bun: bunRef,
      sauce: sauceRef,
      main: mainRef,
    };

    refMap[tab].current?.scrollIntoView({ behavior: 'smooth' });
  });

  if (isLoading) {
    return <Preloader />;
  }

  if (responseError) {
    return <div className="text text_type_main-medium">Ошибка: {responseError}</div>;
  }

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
              count={getCount(bun)}
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
              count={getCount(sauce)}
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
              count={getCount(main)}
            />
          ))}
        </ul>
      </div>
    </section>
  );
};
