import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
  Logo,
} from '@krgaa/react-developer-burger-ui-components';
import { NavLink, Link } from 'react-router-dom';

import styles from './app-header.module.css';

export const AppHeader = (): React.ReactElement => {
  const setActiveLink = ({ isActive }: { isActive: boolean }): string =>
    `${styles.link} ${isActive ? styles.link_active : ''}`;

  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} p-4`}>
        <div className={styles.menu_part_left}>
          <NavLink to="/" end className={setActiveLink}>
            {({ isActive }: { isActive: boolean }): React.ReactElement => (
              <>
                <BurgerIcon type={isActive ? 'primary' : 'secondary'} />
                <p className="text text_type_main-default ml-2">Конструктор</p>
              </>
            )}
          </NavLink>

          <NavLink
            to="/feed"
            className={(props: { isActive: boolean }): string =>
              `${setActiveLink(props)} ml-10`
            }
          >
            {({ isActive }: { isActive: boolean }): React.ReactElement => (
              <>
                <ListIcon type={isActive ? 'primary' : 'secondary'} />
                <p className="text text_type_main-default ml-2">Лента заказов</p>
              </>
            )}
          </NavLink>
        </div>

        <div className={styles.logo}>
          <Link to="/">
            <Logo />
          </Link>
        </div>

        <NavLink
          to="/profile"
          className={(props: { isActive: boolean }): string =>
            `${setActiveLink(props)} ${styles.link_position_last}`
          }
        >
          {({ isActive }: { isActive: boolean }): React.ReactElement => (
            <>
              <ProfileIcon type={isActive ? 'primary' : 'secondary'} />
              <p className="text text_type_main-default ml-2">Личный кабинет</p>
            </>
          )}
        </NavLink>
      </nav>
    </header>
  );
};
