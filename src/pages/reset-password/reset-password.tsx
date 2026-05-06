import {
  Input,
  PasswordInput,
  Button,
} from '@krgaa/react-developer-burger-ui-components';
import { useState, type ChangeEvent, type FormEvent, type ReactElement } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';

import { useResetPasswordMutation } from '@/services/api/authApi';

import styles from './reset-password.module.css';

export const ResetPassword = (): ReactElement => {
  const [values, setValues] = useState({ password: '', token: '' });
  const navigate = useNavigate();
  const [resetPassword, { isLoading, error }] = useResetPasswordMutation();

  const wasOnForgotPage: string | null = localStorage.getItem('resetPasswordStep');

  if (!wasOnForgotPage) {
    return <Navigate to="/forgot-password" replace />;
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      await resetPassword(values).unwrap();
      localStorage.removeItem('resetPasswordStep');
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
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
          extraClass="mt-6"
        />

        {error && 'data' in error && (
          <p
            className="text text_type_main-default mt-4"
            style={{ color: '#e52b1a', textAlign: 'center' }}
          >
            {(error.data as { message: string })?.message || 'Произошла ошибка'}
          </p>
        )}

        <Button
          htmlType="submit"
          type="primary"
          size="large"
          extraClass="mt-6 mb-20"
          disabled={isLoading}
        >
          {isLoading ? 'Данные сохраняются...' : 'Сохранить'}
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
