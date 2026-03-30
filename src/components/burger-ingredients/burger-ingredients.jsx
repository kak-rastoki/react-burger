import { Tab, Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { selectIngredientCount } from '@/services/constructor/constructorSlice';

import { IngredientCard } from '../ingredient-card/ingredient-card';

import styles from './burger-ingredients.module.css';

export const BurgerIngredients = ({
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
  const ingredientContainerRef = useRef(null);
  // const constructorItems = useSelector(selectConstructorItems) ?? { bun: null, filling: [] };
  const ingredientCount = useSelector(selectIngredientCount);

  const getCount = (item) => ingredientCount[item._id] || 0;

  // ТЕКУЩИЙ ТАВ ПРИ СКРОЛЕ
  useEffect(() => {
    if (isLoading) return;
    const container = ingredientContainerRef.current;
    console.log(container);

    if (!container) return;

    const handleScroll = () => {
      // как в голову пришло так реализовал (
      const ingredientContainerRect = container?.getBoundingClientRect();

      const bunTitleRect = bunRef.current?.getBoundingClientRect();
      const sauceTitleRect = sauceRef.current?.getBoundingClientRect();
      const mainTitleRect = mainRef.current?.getBoundingClientRect();

      const distanceBun = bunTitleRect.top - ingredientContainerRect.top;
      const distanceSauce = sauceTitleRect.top - ingredientContainerRect.top;
      const distanceMain = mainTitleRect.top - ingredientContainerRect.top;

      const distances = [
        { name: 'bun', dist: distanceBun },
        { name: 'sauce', dist: distanceSauce },
        { name: 'main', dist: distanceMain },
      ];

      let activeTab = 'bun';
      let minDist = Infinity;

      for (const { name, dist } of distances) {
        if (dist >= 0 && dist < minDist) {
          minDist = dist;
          activeTab = name;
        }
      }
      if (minDist === Infinity) {
        activeTab = distances.reduce((prev, curr) =>
          curr.dist > prev.dist ? curr : prev
        ).name;
      }
      setCurrentTab(activeTab);
    };

    container.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => container.removeEventListener('scroll', handleScroll);
  }, [isLoading, ingredients]);

  // фильтрация ингредиентов через фильтр
  const buns = useMemo(
    () => ingredients.filter((ingredient) => ingredient.type === 'bun'),
    [ingredients]
  );
  const sauces = useMemo(
    () => ingredients.filter((ingredient) => ingredient.type === 'sauce'),
    [ingredients]
  );
  const mains = useMemo(
    () => ingredients.filter((item) => item.type === 'main'),
    [ingredients]
  );

  // const getCount = useCallback((item) => {
  //   if (item.type === 'bun') {
  //     return constructorItems.bun && constructorItems.bun._id === item._id ? 2 : 0;
  //   } else {
  //     return constructorItems.filling.filter((fill) => fill._id === item._id).length;
  //   }
  // });
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

      <div
        ref={ingredientContainerRef}
        className={`${styles.ingredients} custom-scroll`}
      >
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
