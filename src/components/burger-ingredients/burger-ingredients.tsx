import { Tab, Preloader } from '@krgaa/react-developer-burger-ui-components';
import {
  useState,
  useRef,
  useCallback,
  useMemo,
  useEffect,
  type ReactElement,
} from 'react';

import { useGetIngredientsQuery } from '@/services/api/ingredientsApi';
import { selectIngredientCount } from '@/services/constructor/constructorSlice';
import { useAppSelector } from '@/services/store';

import { IngredientCard } from '../ingredient-card/ingredient-card';

import type { TIngredient } from '@/utils/baseTypes';

import styles from './burger-ingredients.module.css';

type TBurgerIngredientsProps = {
  onIngredietnsClick: (ingredient: TIngredient) => void;
};

export const BurgerIngredients = ({
  onIngredietnsClick,
}: TBurgerIngredientsProps): ReactElement => {
  const { data, isLoading, error } = useGetIngredientsQuery();
  const ingredients: TIngredient[] = data?.data || [];
  const responseError: string | null = (error as { message?: string })?.message || null;

  const [currentTab, setCurrentTab] = useState<string>('bun');

  const bunRef = useRef<HTMLHeadingElement>(null);
  const sauceRef = useRef<HTMLHeadingElement>(null);
  const mainRef = useRef<HTMLHeadingElement>(null);
  const ingredientContainerRef = useRef<HTMLDivElement>(null);

  const ingredientCount = useAppSelector(selectIngredientCount);

  const getCount = (item: TIngredient): number => ingredientCount[item._id] || 0;

  useEffect((): void | (() => void) => {
    if (isLoading) return;
    const container = ingredientContainerRef.current;

    if (!container) return;

    const handleScroll = (): void => {
      const ingredientContainerRect = container.getBoundingClientRect();
      const bunTitleRect = bunRef.current?.getBoundingClientRect();
      const sauceTitleRect = sauceRef.current?.getBoundingClientRect();
      const mainTitleRect = mainRef.current?.getBoundingClientRect();

      if (!bunTitleRect || !sauceTitleRect || !mainTitleRect) return;

      const distanceBun = Math.abs(bunTitleRect.top - ingredientContainerRect.top);
      const distanceSauce = Math.abs(sauceTitleRect.top - ingredientContainerRect.top);
      const distanceMain = Math.abs(mainTitleRect.top - ingredientContainerRect.top);

      const distances = [
        { name: 'bun', dist: distanceBun },
        { name: 'sauce', dist: distanceSauce },
        { name: 'main', dist: distanceMain },
      ];

      const closestTab = distances.reduce((prev, curr) =>
        curr.dist < prev.dist ? curr : prev
      ).name;

      setCurrentTab(closestTab);
    };

    container.addEventListener('scroll', handleScroll);
    handleScroll();

    return (): void => container.removeEventListener('scroll', handleScroll);
  }, [isLoading, ingredients]);

  const buns = useMemo(
    (): TIngredient[] => ingredients.filter((ingredient) => ingredient.type === 'bun'),
    [ingredients]
  );
  const sauces = useMemo(
    (): TIngredient[] => ingredients.filter((ingredient) => ingredient.type === 'sauce'),
    [ingredients]
  );
  const mains = useMemo(
    (): TIngredient[] => ingredients.filter((item) => item.type === 'main'),
    [ingredients]
  );

  const onTabClick = useCallback((tab: string): void => {
    setCurrentTab(tab);

    const refMap: Record<string, React.RefObject<HTMLHeadingElement | null>> = {
      bun: bunRef,
      sauce: sauceRef,
      main: mainRef,
    };

    const targetRef = refMap[tab];
    if (targetRef && targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

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
        <h2 ref={bunRef} className="text text_type_main-medium mt-10 mb-6">
          Булки
        </h2>
        <ul className={styles.list}>
          {buns.map(
            (bun: TIngredient): ReactElement => (
              <IngredientCard
                key={bun._id}
                ingredient={bun}
                onClick={onIngredietnsClick}
                count={getCount(bun)}
              />
            )
          )}
        </ul>

        <h2 ref={sauceRef} className="text text_type_main-medium mt-10 mb-6">
          Соусы
        </h2>
        <ul className={styles.list}>
          {sauces.map(
            (sauce: TIngredient): ReactElement => (
              <IngredientCard
                key={sauce._id}
                ingredient={sauce}
                onClick={onIngredietnsClick}
                count={getCount(sauce)}
              />
            )
          )}
        </ul>

        <h2 ref={mainRef} className="text text_type_main-medium mt-10 mb-6">
          Начинки
        </h2>
        <ul className={styles.list}>
          {mains.map(
            (main: TIngredient): ReactElement => (
              <IngredientCard
                key={main._id}
                ingredient={main}
                onClick={onIngredietnsClick}
                count={getCount(main)}
              />
            )
          )}
        </ul>
      </div>
    </section>
  );
};
