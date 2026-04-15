import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import { Feed } from '@/pages/feed/feed';
import { ForgotPassword } from '@/pages/forgot-password/forgot-password';
import { Login } from '@/pages/login/login';
import { NotFound } from '@/pages/not-found/not-found';
import { Profile } from '@/pages/profile/profile';
import { ProfileOrders } from '@/pages/profile/profile-orders';
import { Register } from '@/pages/register/register';
import { ResetPassword } from '@/pages/reset-password/reset-password';
import { useGetUserQuery } from '@/services/api/authApi';
import { selectIsAuthChecked } from '@/services/user/userSlice';
import { OnlyAuth, OnlyUnAuth } from '@components/protected-route/protected-route';
// import { Home, Login, Register, ForgotPassword, ResetPassword, Profile, Feed, NotFound } from '@pages';
import { Home } from '@pages/home/home';

import { AppHeader } from '../app-header/app-header';
import { IngredientDetail } from '../ingredient-details/ingredient-details';
import { Modal } from '../modal/modal';
import { OrderDetails } from '../order-details/order-details';

export const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;

  useGetUserQuery();
  const isAuthChecked = useSelector(selectIsAuthChecked);

  if (!isAuthChecked) {
    return <Preloader />;
  }

  const handleModalClose = () => {
    navigate(-1);
  };

  return (
    <div className=" style.app">
      <AppHeader />
      <Routes location={background || location}>
        <Route path="/" element={<Home />} />
        <Route
          path="/ingredients/:id"
          element={
            <div style={{ marginTop: '100px' }}>
              <h1 className="text text_type_main-large text_color_primary">
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
          Ы
          element={<OnlyUnAuth component={<ResetPassword />} />}
        />
        <Route path="*" element={<NotFound />} />
        <Route path="/feed" element={<Feed />} />

        {/* protected */}
        <Route path="/profile" element={<OnlyAuth component={<Profile />} />}>
          <Route path="orders" element={<ProfileOrders />} />
        </Route>
      </Routes>

      {/* модальныек окна */}
      {background && (
        <Routes>
          <Route
            path="/ingredients/:id"
            element={
              <Modal title="Детали ингредиента" onClose={handleModalClose}>
                {' '}
                <IngredientDetail />{' '}
              </Modal>
            }
          />

          <Route
            path="/order/:id"
            element={
              <Modal title="Детали заказа" onClose={handleModalClose}>
                {' '}
                <OrderDetails />{' '}
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};
