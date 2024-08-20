import React from "react";
import { Navigate } from "react-router-dom";
import Layout from "./Layout";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  return token ? <Layout>{children}</Layout> : <Navigate to="/login" />;
};

export default ProtectedRoute;
