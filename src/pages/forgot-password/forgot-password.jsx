import { Input, Button } from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './forgot-password.module.css';

export const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Запрос на восстановление для:', email);

    //  здесь будет запрос к API короче, отвечаю.
  };

  return (
    <main className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className="text text_type_main-medium">Восстановление пароля</h1>

        <Input
          type="email"
          placeholder="Укажите e-mail"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          name="email"
          error={false}
          size="default"
          extraClass="mt-6"
        />

        <Button htmlType="submit" type="primary" size="large" extraClass="mt-6 mb-20">
          Восстановить
        </Button>
      </form>

      <div className={styles.links}>
        <p className="text text_type_main-default text_color_inactive">
          Вспомнили пароль?{' '}
          <Link to="/login" className={styles.link}>
            Войти
          </Link>
        </p>
      </div>
    </main>
  );
};
