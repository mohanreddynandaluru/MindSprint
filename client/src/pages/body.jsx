import React from "react";
import Navbar from "../componets/Navbar";
import { Outlet } from "react-router-dom";

const body = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default body;
