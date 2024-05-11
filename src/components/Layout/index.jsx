import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer';
import { Logo2 } from '../imagepath';
import Header2 from '../Header2/index';

export default function Layout() {
  return (
    <>
      <Header2 logoSrc="../../../public/images/Logo2.png" variant="cs_heading_color" />
      <Outlet />
      <Footer />
    </>
  );
}
