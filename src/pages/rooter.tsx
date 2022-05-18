import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import AppLayout from '@/layout/AppLayout';
import Home from '@/pages/home';
import Login from '@/pages/login';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />

        <Route path='app' element={<AppLayout />}>
          <Route path='login' element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
