import {
  CurrencyIcon,
  FormattedDate,
} from '@krgaa/react-developer-burger-ui-components';
import { Link, useLocation } from 'react-router-dom';

import { useGetIngredientsQuery } from '@/services/api/ingredientsApi';
import { calculateOrderPrice, getOrderIngredients } from '@/utils/orderHelpers';

import type React from 'react';

import type { TOrder, TIngredient } from '@/utils/baseTypes';

import styles from './order-card.module.css';

type TOrderCardProps = {
  order: TOrder;
  showStatus?: boolean;
};

export const OrderCard: React.FC<TOrderCardProps> = ({ order, showStatus = false }) => {
  const location = useLocation();
  const { data: ingredientsData } = useGetIngredientsQuery();
  const allIngredients = ingredientsData?.data || [];

  const orderIngredients = getOrderIngredients(order.ingredients, allIngredients);
  const totalPrice = calculateOrderPrice(order.ingredients, allIngredients);

  const maxVisibleIngredients = 6;
  const visibleIngredients = orderIngredients.slice(0, maxVisibleIngredients);
  const remainingCount = orderIngredients.length - maxVisibleIngredients;

  const getStatusText = (status: string): string => {
    switch (status) {
      case 'created':
        return 'Создан';
      case 'pending':
        return 'Готовится';
      case 'done':
        return 'Выполнен';
      default:
        return '';
    }
  };

  return (
    <Link
      to={`${location.pathname}/${order._id}`}
      state={{ background: location }}
      className={styles.link}
    >
      <div className={`${styles.card} p-6`}>
        <div className={styles.header}>
          <span className="text text_type_digits-default">#{order.number}</span>
          <span className="text text_type_main-default text_color_inactive">
            <FormattedDate date={new Date(order.createdAt)} />
          </span>
        </div>

        <div className={`${styles.title} mt-6`}>
          <h2 className="text text_type_main-medium">{order.name}</h2>
          {showStatus && (
            <p
              className={`text text_type_main-default mt-2 ${
                order.status === 'done' ? styles.statusDone : ''
              }`}
            >
              {getStatusText(order.status)}
            </p>
          )}
        </div>

        <div className={`${styles.footer} mt-6`}>
          <div className={styles.ingredientsList}>
            {visibleIngredients.map((ingredient: TIngredient, index: number) => {
              const zIndex = maxVisibleIngredients - index;
              const isLastVisible = index === maxVisibleIngredients - 1;
              const hasMore = remainingCount > 0;

              return (
                <div key={index} className={styles.ingredientWrapper} style={{ zIndex }}>
                  <img
                    src={ingredient.image_mobile}
                    alt={ingredient.name}
                    className={styles.image}
                  />
                  {isLastVisible && hasMore && (
                    <div className={styles.overlay}>
                      <span className="text text_type_main-default">
                        +{remainingCount}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className={styles.price}>
            <span className="text text_type_digits-default mr-2">{totalPrice}</span>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </Link>
  );
};
