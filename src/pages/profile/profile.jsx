import {
  Input,
  PasswordInput,
  Button,
} from '@krgaa/react-developer-burger-ui-components';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';

import { useLogoutMutation, useUpdateUserMutation } from '@/services/api/authApi';
import { selectUser } from '@/services/user/userSlice';

import styles from './profile.module.css';

export const Profile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [logoutApi] = useLogoutMutation();
  const [updateUser, { isLoading: isUpdating, error: updateError }] =
    useUpdateUserMutation();
  const [showSuccess, setShowSuccess] = useState(false);

  const [values, setValues] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: '',
  });

  useEffect(() => {
    setValues({
      name: user?.name || '',
      email: user?.email || '',
      password: '',
    });
  }, [user]);

  const isFormChanged =
    values.name !== user?.name || values.email !== user?.email || values.password !== '';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleCancel = () => {
    setValues({
      name: user?.name || '',
      email: user?.email || '',
      password: '',
    });
  };

  const handleLogout = async () => {
    try {
      await logoutApi().unwrap();
      navigate('/login', { replace: true });
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser(values).unwrap();
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    } catch (err) {
      console.error('Ошибка при обновлении:', err);
    }
  };

  return (
    <main className={styles.container}>
      <div className={styles.wrapper}>
        <nav className={styles.nav}>
          <NavLink
            to="/profile"
            end
            className={({ isActive }) =>
              `${styles.link} text text_type_main-medium ${isActive ? styles.link_active : 'text_color_inactive'}`
            }
          >
            Профиль
          </NavLink>
          <NavLink
            to="/profile/orders"
            className={({ isActive }) =>
              `${styles.link} text text_type_main-medium ${isActive ? styles.link_active : 'text_color_inactive'}`
            }
          >
            История заказов
          </NavLink>
          <button
            onClick={handleLogout}
            className={`${styles.link} ${styles.logoutButton} text text_type_main-medium text_color_inactive`}
          >
            Выход
          </button>

          <p className="text text_type_main-default text_color_inactive mt-20 opacity-40">
            В этом разделе вы можете изменить свои персональные данные
          </p>
        </nav>

        <div className={styles.content}>
          {location.pathname === '/profile' ? (
            <form className={styles.form} onSubmit={handleSubmit}>
              <Input
                type="text"
                placeholder="Имя"
                onChange={handleChange}
                value={values.name}
                name="name"
                icon="EditIcon"
                extraClass="mb-6"
                disabled={isUpdating}
              />
              <Input
                type="email"
                placeholder="Логин"
                onChange={handleChange}
                value={values.email}
                name="email"
                icon="EditIcon"
                extraClass="mb-6"
                disabled={isUpdating}
              />
              <PasswordInput
                onChange={handleChange}
                value={values.password}
                name="password"
                icon="EditIcon"
                disabled={isUpdating}
              />

              {isFormChanged && (
                <div className={`${styles.buttons} mt-6`}>
                  <Button
                    htmlType="button"
                    type="secondary"
                    size="medium"
                    onClick={handleCancel}
                    disabled={isUpdating}
                  >
                    Отмена
                  </Button>
                  <Button
                    htmlType="submit"
                    type="primary"
                    size="medium"
                    disabled={isUpdating}
                  >
                    {isUpdating ? 'Сохраняем...' : 'Сохранить'}
                  </Button>
                </div>
              )}

              {showSuccess && (
                <p
                  style={{ color: '#00cccc', textAlign: 'right' }}
                  className="text text_type_main-default mt-4"
                >
                  Данные успешно обновлены!
                </p>
              )}
              {updateError && (
                <p
                  style={{ color: '#e52b1a', textAlign: 'right' }}
                  className="text text_type_main-default mt-4"
                >
                  Ошибка: {updateError.data?.message || 'Не удалось сохранить'}
                </p>
              )}
            </form>
          ) : (
            <Outlet />
          )}
        </div>
      </div>
    </main>
  );
};
