import {
  Input,
  PasswordInput,
  Button,
} from '@krgaa/react-developer-burger-ui-components';
import { useState, type ChangeEvent, type FormEvent, type ReactElement } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useRegisterMutation } from '@/services/api/authApi';

import styles from './register.module.css';

export const Register = (): ReactElement => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const [register, { isLoading, error }] = useRegisterMutation();

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      await register(values).unwrap();
      navigate('/', { replace: true });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className="text text_type_main-medium">Регистрация</h1>

        <Input
          type="text"
          placeholder="Имя"
          onChange={handleChange}
          value={values.name}
          name="name"
          size="default"
          extraClass="mt-6"
        />
        <Input
          type="email"
          placeholder="E-mail"
          onChange={handleChange}
          value={values.email}
          name="email"
          size="default"
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
          {isLoading ? 'Создаем аккаунт...' : 'Зарегистрироваться'}
        </Button>

        {error && 'data' in error && (
          <p style={{ color: 'red' }} className="text text_type_main-default">
            {(error.data as { message: string })?.message}
          </p>
        )}
      </form>

      <div className={styles.links}>
        <p className="text text_type_main-default text_color_inactive">
          Уже зарегистрированы?{' '}
          <Link to="/login" className={styles.link}>
            Войти
          </Link>
        </p>
      </div>
    </main>
  );
};
