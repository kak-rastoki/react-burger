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
      {/* 1. ВЕРХНЯЯ БУЛКА С ПРОВЕРКОЙ */}
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

      {/* 2. НАЧИНКИ С ПРОВЕРКОЙ */}
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

      {/* 3. НИЖНЯЯ БУЛКА С ПРОВЕРКОЙ */}
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
          disabled={isOrderLoading || !bun} // 👈 Защита: нельзя заказать без булки
        >
          {isOrderLoading ? 'Оформляем...' : 'Оформить заказ'}
        </Button>
      </div>
    </section>
  );
};
