import { CheckMarkIcon } from '@krgaa/react-developer-burger-ui-components';

import styles from './order-details.module.css';

export const OrderDetails = ({ order }) => {
  return (
    <div className={styles.order}>
      <p className={`${styles.glow} text text_type_digits-large`}>{order.id}</p>
      <p className="text text_type_main-medium">идентификатор заказа</p>

      <div className={styles.icon}>
        <CheckMarkIcon type="primary" />
      </div>

      <p className="text text_type_main-default mt-15">Ваш заказ начали готовить</p>

      <p className="text text_type_main-default text_color_inactive mt-2">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};
