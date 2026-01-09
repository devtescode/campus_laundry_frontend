import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const Adminprotected = () => {
  const token = sessionStorage.getItem("adminToken");

  if (!token) {
    return <Navigate to="/adminauth" replace />;
  }

  return <Outlet />;
};

export default Adminprotected;
