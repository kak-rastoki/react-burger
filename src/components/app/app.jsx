import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Home } from '@/pages/home/home';

import { AppHeader } from '../app-header/app-header';

export const App = () => {
  return (
    <BrowserRouter>
      <div className=" style.app">
        <AppHeader />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};
