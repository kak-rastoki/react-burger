import {
  Input,
  PasswordInput,
  Button,
} from '@krgaa/react-developer-burger-ui-components';
import { useState, type ChangeEvent, type FormEvent, type ReactElement } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import { useLoginMutation } from '@/services/api/authApi';

import styles from './login.module.css';

type TLocationState = {
  from?: { pathname: string };
};

export const Login = (): ReactElement => {
  const [values, setValues] = useState({ email: '', password: '' });
  const [login, { isLoading, error }] = useLoginMutation();
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      await login(values).unwrap();

      const state = location.state as TLocationState;
      const from = state?.from?.pathname || '/';

      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
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
          extraClass="mt-6"
        />
        <PasswordInput
          onChange={handleChange}
          value={values.password}
          name="password"
          extraClass="mt-6"
        />
        <Button
          htmlType="submit"
          type="primary"
          size="large"
          extraClass="mt-6 mb-20"
          disabled={isLoading}
        >
          {isLoading ? 'Проверка данных...' : 'Войти'}
        </Button>
        {error && 'data' in error && (
          <p
            style={{ color: 'red', marginTop: '10px' }}
            className="text text_type_main-default"
          >
            {(error.data as { message: string })?.message || 'Ошибка входа'}
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
