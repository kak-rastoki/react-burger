import {
  Input,
  PasswordInput,
  Button,
} from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './register.module.css';

export const Register = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Позже здесь будет dispatch(register(values))
    console.log('Данные регистрации:', values);
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
          error={false}
          size="default"
          extraClass="mt-6"
        />
        <Input
          type="email"
          placeholder="E-mail"
          onChange={handleChange}
          value={values.email}
          name="email"
          error={false}
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
          Зарегистрироваться
        </Button>
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
