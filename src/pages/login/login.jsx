import {
  Input,
  PasswordInput,
  Button,
} from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './login.module.css';

export const Login = () => {
  const [values, setValues] = useState({ email: '', password: '' });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Данные для входа:', values);
  };

  return (
    <main className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className="text text_type_main-medium">Вход</h1>

        <Input
          type="email"
          placeholder="E-mail"
          onChange={handleChange}
          value={values.email}
          name="email"
          error={false}
          errorText="Ошибка"
          size="default"
          extraClass="mt-6"
        />

        <PasswordInput
          onChange={handleChange}
          value={values.password}
          name="password"
          extraClass="mt-6"
        />

        <Button htmlType="submit" type="primary" size="large" extraClass="mt-6 mb-20">
          Войти
        </Button>
      </form>

      <div className={styles.links}>
        <p className="text text_type_main-default text_color_inactive">
          Вы — новый пользователь?{' '}
          <Link to="/register" className={styles.link}>
            Зарегистрироваться
          </Link>
        </p>
        <p className="text text_type_main-default text_color_inactive mt-4">
          Забыли пароль?{' '}
          <Link to="/forgot-password" className={styles.link}>
            Восстановить пароль
          </Link>
        </p>
      </div>
    </main>
  );
};
