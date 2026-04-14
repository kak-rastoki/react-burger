import {
  Input,
  PasswordInput,
  Button,
} from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useLoginMutation } from '@/services/api/authApi';

import styles from './login.module.css';

export const Login = () => {
  const [values, setValues] = useState({ email: '', password: '' });
  const [login, { isLoading, error }] = useLoginMutation();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(values).unwrap();
      navigate('/', { replace: true });
    } catch (err) {
      console.error('Ошибка входа:', err);
    }
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
          {isLoading ? 'Проверка данных...' : 'Войти'}
        </Button>
        {error && (
          <p style={{ color: 'red', marginTop: '10px' }}>
            {error.data?.message || 'Ошибка входа'}
          </p>
        )}
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
