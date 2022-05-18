import React from 'react';
import { Outlet } from 'react-router-dom';

function AppLayout() {
  return (
    <div>
      <header>header</header>
      <section>
        <Outlet />
      </section>
      <footer>footer</footer>
    </div>
  );
}

export default AppLayout;
