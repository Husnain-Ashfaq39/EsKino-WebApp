import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../Footer";
import useStore from "../../services/useStore";
import Header2 from "../Header2";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Layout() {
  const { showHeader } = useStore();

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        style={{ zIndex: 9999 }} // Ensuring it's above other elements
      />
      {showHeader && (
        <Header2
          logoSrc="../../../public/images/Logo2.png"
          variant="cs_heading_color"
        />
      )}
      <Outlet />
      <Footer />
    </>
  );
}
