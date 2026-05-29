import {
  CurrencyIcon,
  FormattedDate,
} from '@krgaa/react-developer-burger-ui-components';
import { useParams } from 'react-router-dom';

import { useGetIngredientsQuery } from '@/services/api/ingredientsApi';
import {
  useGetFeedQuery,
  useGetProfileOrdersQuery,
  useGetOrderByIdQuery,
} from '@/services/api/ordersApi';
import { calculateOrderPrice } from '@/utils/orderHelpers';

import type { ReactElement } from 'react';

import type { TIngredient, TOrder } from '@/utils/baseTypes';

import styles from './order-info.module.css';

export const OrderInfo = (): ReactElement | null => {
  const { id } = useParams<{ id: string }>();

  const { data: feedData } = useGetFeedQuery();
  const { data: profileData } = useGetProfileOrdersQuery();
  const { data: ingredientsData } = useGetIngredientsQuery();

  const allIngredients: TIngredient[] = ingredientsData?.data || [];

  const orderFromFeed: TOrder | undefined = feedData?.orders.find(
    (o: TOrder): boolean => o._id === id
  );
  const orderFromProfile: TOrder | undefined = profileData?.orders.find(
    (o: TOrder): boolean => o._id === id
  );
  const cachedOrder: TOrder | undefined = orderFromFeed || orderFromProfile;

  const { data: fallbackData, isLoading: isFallbackLoading } = useGetOrderByIdQuery(
    id!,
    {
      skip: !!cachedOrder || !id,
    }
  );

  const order: TOrder | undefined =
    cachedOrder || (fallbackData && fallbackData.orders && fallbackData.orders[0]);

  if (isFallbackLoading || !order) {
    return (
      <div className={styles.container}>
        <p className="text text_type_main-medium text_color_inactive">
          Загрузка деталей заказа...
        </p>
      </div>
    );
  }

  const totalPrice: number = calculateOrderPrice(order.ingredients, allIngredients);

  const ingredientCounts: Record<string, number> = order.ingredients.reduce<
    Record<string, number>
  >((acc: Record<string, number>, ingId: string): Record<string, number> => {
    acc[ingId] = (acc[ingId] || 0) + 1;
    return acc;
  }, {});

  const uniqueIngredients: TIngredient[] = Object.keys(ingredientCounts)
    .map((ingId: string): TIngredient | undefined =>
      allIngredients.find((item: TIngredient): boolean => item._id === ingId)
    )
    .filter((item): item is TIngredient => !!item);

  const getStatusInfo = (status: string): { text: string; className: string } => {
    switch (status) {
      case 'done':
        return { text: 'Выполнен', className: styles.statusDone };
      case 'pending':
        return { text: 'Готовится', className: styles.statusPending };
      case 'created':
        return { text: 'Создан', className: styles.statusCreated };
      default:
        return { text: '', className: '' };
    }
  };

  const statusInfo: { text: string; className: string } = getStatusInfo(order.status);

  return (
    <div className={styles.container}>
      <span className={`${styles.number} text text_type_digits-default mb-10`}>
        #{order.number}
      </span>
      <h2 className="text text_type_main-medium mb-3">{order.name}</h2>
      <span
        className={`${styles.status} ${statusInfo.className} text text_type_main-default mb-15`}
      >
        {statusInfo.text}
      </span>

      <span className="text text_type_main-medium mb-6">Состав:</span>
      <div className={`${styles.composition} mb-10`}>
        <ul className={styles.list}>
          {uniqueIngredients.map((ingredient: TIngredient): ReactElement => {
            const count: number =
              ingredient.type === 'bun' ? 2 : ingredientCounts[ingredient._id];
            return (
              <li key={ingredient._id} className={styles.item}>
                <div className={styles.ingredientInfo}>
                  <div className={styles.avatarWrapper}>
                    <img
                      className={styles.avatar}
                      src={ingredient.image_mobile}
                      alt={ingredient.name}
                    />
                  </div>
                  <span className={`${styles.name} text text_type_main-default ml-4`}>
                    {ingredient.name}
                  </span>
                </div>
                <div className={styles.priceBlock}>
                  <span className="text text_type_digits-default mr-2">
                    {count} x {ingredient.price}
                  </span>
                  <CurrencyIcon type="primary" />
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div className={styles.footer}>
        <span className="text text_type_main-default text_color_inactive">
          <FormattedDate date={new Date(order.createdAt)} />
        </span>
        <div className={styles.price}>
          <span className="text text_type_digits-default mr-2">{totalPrice}</span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};
