import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { Navigate, useLocation, type Location } from 'react-router-dom';

import { useAppSelector } from '@/services/store';
import { selectIsAuthChecked, selectUser } from '@/services/user/userSlice';

import type { ReactElement } from 'react';

type TProtectedProps = {
  onlyUnAuth?: boolean;
  component: ReactElement;
};

type TLocationState = {
  from?: Location;
};

const Protected = ({
  onlyUnAuth = false,
  component,
}: TProtectedProps): ReactElement | null => {
  const isAuthChecked = useAppSelector(selectIsAuthChecked);
  const user = useAppSelector(selectUser);
  const location = useLocation();

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (onlyUnAuth && user) {
    const state = location.state as TLocationState;
    const from = state?.from || { pathname: '/' };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return component;
};

export const OnlyAuth = Protected;

type TOnlyUnAuthProps = {
  component: ReactElement;
};

export const OnlyUnAuth = ({ component }: TOnlyUnAuthProps): ReactElement | null => (
  <Protected onlyUnAuth component={component} />
);
