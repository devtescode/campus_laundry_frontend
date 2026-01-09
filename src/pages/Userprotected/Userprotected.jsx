import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const Userprotected = () => {
  const token = sessionStorage.getItem("laundryToken");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default Userprotected;
