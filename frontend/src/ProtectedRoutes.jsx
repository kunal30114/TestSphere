import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  if (!isLoggedIn) {
    return <Navigate to="/teacher/loginTeacher" replace />;
  }

  return <Outlet />; 
};

export default ProtectedRoute;
