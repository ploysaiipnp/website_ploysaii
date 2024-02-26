import React from "react";
import Navbar from "../../../components/Layout/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../../../components/Layout/Footer";

const LayoutPage = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default LayoutPage;
