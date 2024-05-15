// Layout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer';
import useStore from '../../services/useStore';
import Header2 from '../Header2';

export default function Layout() {
  const { showHeader } = useStore();

  return (
    <>
      {showHeader && <Header2 logoSrc="../../../public/images/Logo2.png" variant="cs_heading_color" />}
      <Outlet />
      <Footer />
    </>
  );
}
