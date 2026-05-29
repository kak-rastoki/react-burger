import { type ReactElement } from 'react';
import { Preloader } from '@krgaa/react-developer-burger-ui-components';

import { useGetFeedQuery } from '@/services/api/ordersApi';
import { OrderCard } from '@/components/order-card/order-card';
import type { TOrder } from '@/utils/baseTypes';

import styles from './feed.module.css';

export const Feed = (): ReactElement => {
  const { data, isLoading } = useGetFeedQuery();

  if (isLoading || !data) {
    return (
      <div className={styles.loadingContainer}>
        <Preloader />
      </div>
    );
  }

  const doneOrders: TOrder[] = data.orders.filter((order: TOrder): boolean => order.status === 'done');
  const pendingOrders: TOrder[] = data.orders.filter((order: TOrder): boolean => order.status === 'pending');

  const chunkArray = (arr: TOrder[], size: number): TOrder[][] => {
    const chunks: TOrder[][] = [];
    for (let i = 0; i < arr.length && chunks.length < 2; i += size) {
      chunks.push(arr.slice(i, i + size));
    }
    return chunks;
  };

  const doneChunks: TOrder[][] = chunkArray(doneOrders, 10);
  const pendingChunks: TOrder[][] = chunkArray(pendingOrders, 10);

  return (
    <main className={`${styles.container} p-10`}>
      <h1 className="text text_type_main-large mb-5">Лента заказов</h1>
      <div className={styles.content}>
        <section className={styles.ordersList}>
          {data.orders.map((order: TOrder): ReactElement => (
            <div className="mb-4" key={order._id}>
              <OrderCard order={order} />
            </div>
          ))}
        </section>

        <section className={styles.stats}>
          <div className={styles.board}>
            <div className={styles.statusColumn}>
              <span className="text text_type_main-medium mb-6">Готовы:</span>
              <div className={styles.columnsContainer}>
                {doneChunks.length === 0 ? (
                  <span className="text text_type_main-default text_color_inactive">Нет готовых</span>
                ) : (
                  doneChunks.map((chunk: TOrder[], cIndex: number): ReactElement => (
                    <ul className={styles.list} key={cIndex}>
                      {chunk.map((order: TOrder): ReactElement => (
                        <li
                          key={order._id}
                          className="text text_type_digits-default mb-2"
                          style={{ color: '#00ecc7', listStyle: 'none' }}
                        >
                          {order.number}
                        </li>
                      ))}
                    </ul>
                  ))
                )}
              </div>
            </div>

            <div className={styles.statusColumn}>
              <span className="text text_type_main-medium mb-6">В работе:</span>
              <div className={styles.columnsContainer}>
                {pendingChunks.length === 0 ? (
                  <span className="text text_type_main-default text_color_inactive">Нет в работе</span>
                ) : (
                  pendingChunks.map((chunk: TOrder[], cIndex: number): ReactElement => (
                    <ul className={styles.list} key={cIndex}>
                      {chunk.map((order: TOrder): ReactElement => (
                        <li
                          key={order._id}
                          className="text text_type_digits-default mb-2"
                          style={{ listStyle: 'none' }}
                        >
                          {order.number}
                        </li>
                      ))}
                    </ul>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="mt-15">
            <p className="text text_type_main-medium">Выполнено за все время:</p>
            <p className="text text_type_digits-large">{data.total.toLocaleString()}</p>
          </div>

          <div className="mt-15">
            <p className="text text_type_main-medium">Выполнено за сегодня:</p>
            <p className="text text_type_digits-large">{data.totalToday.toLocaleString()}</p>
          </div>
        </section>
      </div>
    </main>
  );
};
