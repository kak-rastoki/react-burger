import { Button } from '@krgaa/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';

import type { ReactElement } from 'react';

import styles from './not-found.module.css';

export const NotFound = (): ReactElement => {
  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <h1 className={`${styles.title} text text_type_digits-large`}>404</h1>
        <h2 className="text text_type_main-large mt-4">Упс! Страница не найдена</h2>
        <p className="text text_type_main-medium text_color_inactive mt-8">
          Если эта страница когда-то и существовала, то ее точно засосало в черную дыру,
          друг
        </p>
        <div className={styles.illustration}>
          <span className={styles.burger}>🍔</span>
          <span className={styles.star}>✦</span>
          <span className={styles.star}>✨</span>
        </div>
        <Link to="/" className={styles.link}>
          <Button htmlType="button" type="primary" size="large" extraClass="mt-10">
            Вернуться на главную
          </Button>
        </Link>
      </div>
    </main>
  );
};
