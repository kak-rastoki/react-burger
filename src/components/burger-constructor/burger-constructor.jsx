import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from '@krgaa/react-developer-burger-ui-components';
import { nanoid } from '@reduxjs/toolkit';
import { useDrop } from 'react-dnd';
import { useSelector, useDispatch } from 'react-redux';

import {
  selectConstructorItems,
  selectTotalPrice,
  selectBun,
  selectFilling,
  addBun,
  addFilling,
} from '@/services/constructor/constructorSlice';

import { ConstructorItem } from '../constructor-item/constructor-item';

import styles from './burger-constructor.module.css';

export const BurgerConstructor = ({ onOrderButtonClick, isOrderLoading }) => {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const constructorItems = useSelector(selectConstructorItems);
  const totalPrice = useSelector(selectTotalPrice);
  const bun = useSelector(selectBun);
  const filling = useSelector(selectFilling);

  const [{ isHover }, dropTargetRef] = useDrop({
    accept: 'ingredient',
    drop(item) {
      if (item.type === 'bun') {
        dispatch(addBun(item));
      } else {
        dispatch(addFilling({ ...item, uniqueId: nanoid() }));
      }
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  if (!constructorItems) {
    return <div className="text text_type_main-medium">Добавьте ингредиенты</div>;
  }

  if (constructorItems === 0) {
    // поменять потом
    return (
      <div className="text text_type_main-medium">Идет загрузка ингредиентов...</div>
    );
  }

  return (
    <section
      ref={dropTargetRef}
      style={{ outline: isHover ? '2px dashed #8e4cff' : 'transparent' }}
      className={`${styles.burger_constructor} pt-10`}
    >
      <div className={`${styles.bun} `}>
        {bun ? (
          <ConstructorElement
            type="top"
            isLocked={true}
            price={bun.price}
            text={`${bun.name} (верх)`}
            thumbnail={bun.image}
          />
        ) : (
          <div
            className="text text_type_main-default"
            style={{
              padding: '20px',
              border: '1px dashed grey',
              borderRadius: '8px',
              textAlign: 'center',
            }}
          >
            Пожалуйста, перенесите сюда булку
          </div>
        )}
      </div>

      <div className={`${styles.notBuns} custom-scroll`}>
        {filling.length > 0 ? (
          filling.map((item, index) => (
            <ConstructorItem key={item.uniqueId} item={item} index={index} />
          ))
        ) : (
          <div
            className="text text_type_main-default"
            style={{ padding: '40px', textAlign: 'center', color: '#8585ad' }}
          >
            Здесь расположите начинки и соусы
          </div>
        )}
      </div>

      <div className={styles.bun}>
        {bun ? (
          <ConstructorElement
            type="bottom"
            isLocked={true}
            price={bun.price}
            text={`${bun.name} (низ)`}
            thumbnail={bun.image}
          />
        ) : (
          <div
            className="text text_type_main-default"
            style={{
              padding: '20px',
              border: '1px dashed grey',
              borderRadius: '8px',
              textAlign: 'center',
            }}
          >
            Пожалуйста, перенесите сюда булку
          </div>
        )}
      </div>

      <div className={styles.total}>
        <span className="text text_type_digits-medium">{totalPrice}</span>
        <CurrencyIcon type="primary" />
        <Button
          type="primary"
          size="medium"
          htmlType="button"
          onClick={onOrderButtonClick}
          disabled={isOrderLoading || !bun}
        >
          {isOrderLoading ? 'Оформляем...' : 'Оформить заказ'}
        </Button>
      </div>
    </section>
  );
};
