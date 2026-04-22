import { Button } from '@krgaa/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';

import styles from './feed.module.css';

export const Feed = () => {
  return (
    <div style={{ marginTop: '80px' }} className={styles.center}>
      <h2 className="text text_type_main-large">Лента заказов</h2>
      <p className="text text_type_main-medium text_color_inactive mt-4">
        Этот раздел находится в разработке... 🚀
      </p>
      <Link to="/">
        <Button htmlType="button" type="primary" size="large" extraClass="mt-10">
          Вернуться на главную
        </Button>
      </Link>
    </div>
  );
};
