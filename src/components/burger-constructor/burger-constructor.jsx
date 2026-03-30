import {
  ConstructorElement,
  CurrencyIcon,
  Button,
  DragIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';

import {
  selectConstructorItems,
  selectTotalPrice,
  selectBun,
  selectFilling,
} from '@/services/constructor/constructorSlice';

import styles from './burger-constructor.module.css';

export const BurgerConstructor = ({ onOrderButtonClick, isOrderLoading }) => {
  // const [filling,setFilling] = useState(null);
  // const [bun,setBun] =useState(null);
  const constructorItems = useSelector(selectConstructorItems);
  const totalPrice = useSelector(selectTotalPrice);
  const bun = useSelector(selectBun);
  const filling = useSelector(selectFilling);
  console.log(`проверяю бан  - ${bun}`);

  console.log(`Данные конструктора: ${constructorItems}`);

  if (!bun) {
    return <div className="text text_type_main-medium">Добавьте булку</div>;
  }

  if (!constructorItems) {
    return <div className="text text_type_main-medium">Добавьте ингредиенты</div>;
  }

  if (constructorItems === 0) {
    // поменять потом
    return (
      <div className="text text_type_main-medium">Идет загрузка ингредиентов...</div>
    );
  }

  // фильтрация ингредиентов через фильтр
  // const buns = constuctorItems.filter((ingredient) => ingredient.type === 'bun');
  // const bun = buns[0];

  // тестовый массив из начинок
  // const notBuns = ingredients.filter((item) => item.type !== 'bun').slice(6, 12);

  // const totalPrice = filling.reduce((acc, item) => acc + item.price, 0) + bun.price * 2;

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
        {filling.map((item) => (
          <div key={item._id} className="styles.item">
            <DragIcon type="primary" />
            <ConstructorElement
              isLocked={false}
              text={item.name}
              price={item.price}
              thumbnail={item.image}
            />
          </div>
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
          disabled={isOrderLoading}
        >
          {isOrderLoading ? 'Оформляем...' : 'Оформить заказ'}
        </Button>
      </div>
    </section>
  );
};
