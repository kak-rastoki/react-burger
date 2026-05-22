import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
  type Location,
} from 'react-router-dom';

import { Feed } from '@/pages/feed/feed';
import { ForgotPassword } from '@/pages/forgot-password/forgot-password';
import { Login } from '@/pages/login/login';
import { NotFound } from '@/pages/not-found/not-found';
import { Profile } from '@/pages/profile/profile';
import { ProfileOrders } from '@/pages/profile/profile-orders';
import { Register } from '@/pages/register/register';
import { ResetPassword } from '@/pages/reset-password/reset-password';
import { useGetUserQuery } from '@/services/api/authApi';
import { useAppSelector } from '@/services/store';
import { selectIsAuthChecked } from '@/services/user/userSlice';
import { OnlyAuth, OnlyUnAuth } from '@components/protected-route/protected-route';
import { Home } from '@pages/home/home';

import { AppHeader } from '../app-header/app-header';
import { IngredientDetail } from '../ingredient-details/ingredient-details';
import { Modal } from '../modal/modal';
import { OrderDetails } from '../order-details/order-details';
import { OrderInfo } from '../order-info/order-info.tsx';

import styles from './app.module.css';

type TLocationState = {
  background?: Location;
};

export const App = (): React.ReactElement => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as TLocationState;
  const background = state?.background;

  useGetUserQuery();
  const isAuthChecked = useAppSelector(selectIsAuthChecked);

  if (!isAuthChecked) {
    return <Preloader />;
  }

  const handleModalClose = (): void => {
    navigate(-1);
  };

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path="/" element={<Home />} />
        <Route
          path="/ingredients/:id"
          element={
            <div style={{ marginTop: '100px' }}>
              <h1
                className="text text_type_main-large text_color_primary"
                style={{ textAlign: 'center' }}
              >
                Детали ингредиента
              </h1>
              <IngredientDetail />
            </div>
          }
        />

        <Route path="/login" element={<OnlyUnAuth component={<Login />} />} />
        <Route path="/register" element={<OnlyUnAuth component={<Register />} />} />
        <Route
          path="/forgot-password"
          element={<OnlyUnAuth component={<ForgotPassword />} />}
        />
        <Route
          path="/reset-password"
          element={<OnlyUnAuth component={<ResetPassword />} />}
        />

        <Route path="/feed" element={<Feed />} />
        <Route
          path="/feed/:id"
          element={
            <div style={{ marginTop: '100px' }}>
              <OrderInfo />
            </div>
          }
        />

        <Route path="/profile" element={<OnlyAuth component={<Profile />} />}>
          <Route path="orders" element={<ProfileOrders />} />
        </Route>

        <Route
          path="/profile/orders/:id"
          element={
            <OnlyAuth
              component={
                <div style={{ marginTop: '100px' }}>
                  <OrderInfo />
                </div>
              }
            />
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>

      {background && (
        <Routes>
          <Route
            path="/ingredients/:id"
            element={
              <Modal title="Детали ингредиента" onClose={handleModalClose}>
                <IngredientDetail />
              </Modal>
            }
          />
          <Route
            path="/order/:id"
            element={
              <Modal title="Детали заказа" onClose={handleModalClose}>
                <OrderDetails />
              </Modal>
            }
          />
          <Route
            path="/feed/:id"
            element={
              <Modal title="Детали заказа" onClose={handleModalClose}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path="/profile/orders/:id"
            element={
              <OnlyAuth
                component={
                  <Modal title="Детали заказа" onClose={handleModalClose}>
                    <OrderInfo />
                  </Modal>
                }
              />
            }
          />
        </Routes>
      )}
    </div>
  );
};
