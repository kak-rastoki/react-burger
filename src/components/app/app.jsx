import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import { ForgotPassword } from '@/pages/forgot-password/forgot-password';
import { Login } from '@/pages/login/login';
import { NotFound } from '@/pages/not-found/not-found';
import { Register } from '@/pages/register/register';
import { ResetPassword } from '@/pages/reset-password/reset-password';
import { selectIsAuthChecked } from '@/services/user/userSlice';
// import { Home, Login, Register, ForgotPassword, ResetPassword, Profile, Feed, NotFound } from '@pages';
import { Home } from '@pages/home/home';

import { AppHeader } from '../app-header/app-header';
import { IngredientDetail } from '../ingredient-details/ingredient-details';
import { Modal } from '../modal/modal';
import { OrderDetails } from '../order-details/order-details';
// import { Profile } from '@/pages/profile/profile';

export const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;

  // const { isLoading } = useGetUserQuery();
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

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/*
          <Route path="/profile/*" element={<Profile />} />


          <Route path="/feed" element={<Feed />} /> */}

        <Route path="*" element={<NotFound />} />
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
