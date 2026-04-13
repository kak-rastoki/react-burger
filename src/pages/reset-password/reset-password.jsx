import {
  Input,
  PasswordInput,
  Button,
} from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './reset-password.module.css';

export const ResetPassword = () => {
  const [values, setValues] = useState({ password: '', token: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Сброс пароля с данными:', values);
  };

  return (
    <main className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className="text text_type_main-medium">Восстановление пароля</h1>

        <PasswordInput
          placeholder="Введите новый пароль"
          onChange={handleChange}
          value={values.password}
          name="password"
          extraClass="mt-6"
        />

        <Input
          type="text"
          placeholder="Введите код из письма"
          onChange={handleChange}
          value={values.token}
          name="token"
          error={false}
          size="default"
          extraClass="mt-6"
        />

        <Button htmlType="submit" type="primary" size="large" extraClass="mt-6 mb-20">
          Сохранить
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
