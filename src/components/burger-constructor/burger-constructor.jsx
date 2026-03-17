import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from '@krgaa/react-developer-burger-ui-components';

import styles from './burger-constructor.module.css';

export const BurgerConstructor = ({ ingredients, onOrderButtonClick }) => {
  console.log(ingredients);

  if (!ingredients) {
    return <div className="text text_type_main-medium">Добавьте ингредиенты</div>;
  }

  if (ingredients.length === 0) {
    return (
      <div className="text text_type_main-medium">Идет загрузка ингредиентов...</div>
    );
  }

  // фильтрация ингредиентов через фильтр
  const buns = ingredients.filter((ingredient) => ingredient.type === 'bun');
  const bun = buns[0];

  // тестовый массив из начинок
  const notBuns = ingredients.filter((item) => item.type !== 'bun').slice(6, 12);

  const totalPrice = notBuns.reduce((acc, item) => acc + item.price, 0) + bun.price * 2;

  return (
    <section className={`${styles.burger_constructor} pt-10`}>
      {/* . верхняя булка */}
      <div className={`${styles.bun} `}>
        <ConstructorElement
          type="top"
          isLocked={true}
          price={bun.price}
          text={`${bun.name} (верх)`}
          thumbnail={bun.image}
        />
      </div>

      {/* Начинки */}
      <div className={`${styles.notBuns} custom-scroll`}>
        {notBuns.map((item) => (
          <ConstructorElement
            key={item._id}
            isLocked={false}
            text={item.name}
            price={item.price}
            thumbnail={item.image}
          />
        ))}
      </div>

      {/* нижняя булка */}
      <div className={styles.bun}>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          price={bun.price}
          text={`${bun.name} (низ)`}
          thumbnail={bun.image}
        />
      </div>

      <div className={styles.total}>
        <span className="text text_type_digits-medium">{totalPrice}</span>
        <CurrencyIcon type="primary" />
        <Button
          type="primary"
          size="medium"
          htmlType="button"
          onClick={onOrderButtonClick}
        >
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};
