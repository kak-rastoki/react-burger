import { Input, Button } from '@krgaa/react-developer-burger-ui-components';
import { type ReactElement, useState, type FormEvent, type ChangeEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useForgotPasswordMutation } from '@/services/api/authApi';

import styles from './forgot-password.module.css';

export const ForgotPassword = (): ReactElement => {
  const [email, setEmail] = useState<string>('');
  const navigate = useNavigate();
  const [forgotPassword, { isLoading, error }] = useForgotPasswordMutation();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    try {
      await forgotPassword(email).unwrap();
      localStorage.setItem('resetPasswordStep', 'true');
      navigate('/reset-password');
    } catch (err) {
      console.error('Ошибка восстановления:', err);
    }
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };

  return (
    <main className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className="text text_type_main-medium">Восстановление пароля</h1>

        {error && 'data' in error && (
          <p style={{ color: 'red' }} className="text text_type_main-default mt-4">
            {(error.data as { message: string })?.message || 'Произошла ошибка'}
          </p>
        )}

        <Input
          type="email"
          placeholder="Укажите e-mail"
          onChange={onChange}
          value={email}
          name="email"
          extraClass="mt-6"
          disabled={isLoading}
        />

        <Button
          htmlType="submit"
          type="primary"
          size="large"
          extraClass="mt-6 mb-20"
          disabled={isLoading || !email}
        >
          {isLoading ? 'Отправка...' : 'Восстановить'}
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
