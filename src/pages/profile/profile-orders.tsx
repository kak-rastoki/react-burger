import { type ReactElement } from 'react';
import { Preloader } from '@krgaa/react-developer-burger-ui-components';

import { useGetProfileOrdersQuery } from '@/services/api/ordersApi';
import { OrderCard } from '@/components/order-card/order-card';
import type { TOrder } from '@/utils/baseTypes';

import styles from './profile-orders.module.css';

export const ProfileOrders = (): ReactElement => {
  const { data, isLoading } = useGetProfileOrdersQuery();

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <Preloader />
      </div>
    );
  }

  if (!data || !data.orders || data.orders.length === 0) {
    return (
      <div className={styles.emptyContainer}>
        <p className="text text_type_main-medium text_color_inactive">
          У вас еще нет созданных заказов
        </p>
      </div>
    );
  }

  const sortedOrders: TOrder[] = [...data.orders].reverse();

  return (
    <section className={styles.ordersList}>
      {sortedOrders.map((order: TOrder): ReactElement => (
        <div className="mb-6" key={order._id}>
          <OrderCard order={order} showStatus={true} />
        </div>
      ))}
    </section>
  );
};
