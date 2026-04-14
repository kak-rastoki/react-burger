// import { useState } from 'react';
// import { NavLink, Outlet, useLocation } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   Input,
//   PasswordInput,
//   Button
// } from '@krgaa/react-developer-burger-ui-components';

// import { logout } from '@/services/user/actions';
// import { selectUser } from '@/services/user/slice';
// import styles from './profile.module.css';

// export const Profile = () => {
//   const dispatch = useDispatch();
//   const location = useLocation();
//   const user = useSelector(selectUser);

//   const [values, setValues] = useState({
//     name: user?.name || '',
//     email: user?.email || '',
//     password: ''
//   });

//   const isFormChanged = values.name !== user?.name || values.email !== user?.email || values.password !== '';

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setValues({ ...values, [name]: value });
//   };

//   const handleCancel = () => {
//     setValues({
//       name: user?.name || '',
//       email: user?.email || '',
//       password: ''
//     });
//   };

//   const handleLogout = () => {
//     dispatch(logout());
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Отправляем обновленные данные:', values);
//   };

//   return (
//     <main className={styles.container}>
//       <div className={styles.wrapper}>

//         {/* Левая панель: Навигация */}
//         <nav className={styles.nav}>
//           <NavLink
//             to="/profile"
//             end // Чтобы /profile/orders не подсвечивал этот пункт
//             className={({ isActive }) =>
//               `${styles.link} text text_type_main-medium ${isActive ? styles.link_active : 'text_color_inactive'}`
//             }
//           >
//             Профиль
//           </NavLink>
//           <NavLink
//             to="/profile/orders"
//             className={({ isActive }) =>
//               `${styles.link} text text_type_main-medium ${isActive ? styles.link_active : 'text_color_inactive'}`
//             }
//           >
//             История заказов
//           </NavLink>
//           <button
//             onClick={handleLogout}
//             className={`${styles.link} ${styles.logoutButton} text text_type_main-medium text_color_inactive`}
//           >
//             Выход
//           </button>

//           <p className="text text_type_main-default text_color_inactive mt-20 opacity-40">
//             В этом разделе вы можете изменить свои персональные данные
//           </p>
//         </nav>

//         {/* Правая панель: Контент */}
//         <div className={styles.content}>
//           {/* Если URL ровно /profile — показываем форму.
//               Если /profile/orders — Outlet отрендерит страницу заказов */}
//           {location.pathname === '/profile' ? (
//             <form className={styles.form} onSubmit={handleSubmit}>
//               <Input
//                 type="text"
//                 placeholder="Имя"
//                 onChange={handleChange}
//                 value={values.name}
//                 name="name"
//                 icon="EditIcon" // Иконка редактирования из библиотеки
//                 extraClass="mb-6"
//               />
//               <Input
//                 type="email"
//                 placeholder="Логин"
//                 onChange={handleChange}
//                 value={values.email}
//                 name="email"
//                 icon="EditIcon"
//                 extraClass="mb-6"
//               />
//               <PasswordInput
//                 onChange={handleChange}
//                 value={values.password}
//                 name="password"
//                 icon="EditIcon"
//               />

//               {isFormChanged && (
//                 <div className={`${styles.buttons} mt-6`}>
//                   <Button
//                     htmlType="button"
//                     type="secondary"
//                     size="medium"
//                     onClick={handleCancel}
//                   >
//                     Отмена
//                   </Button>
//                   <Button htmlType="submit" type="primary" size="medium">
//                     Сохранить
//                   </Button>
//                 </div>
//               )}
//             </form>
//           ) : (
//             <Outlet />
//           )}
//         </div>

//       </div>
//     </main>
//   );
// };
