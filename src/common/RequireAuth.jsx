import React from "react";
import { useAuthContext } from "../context/auth/authContext";
import { Navigate } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const { user } = useAuthContext();

  if (!user) {
    return <Navigate to="/signin" />;
  }
  return children;
};

export default RequireAuth;
