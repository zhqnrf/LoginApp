import React from "react";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ element: Component, ...rest }) {
  const isAuthenticated = JSON.parse(localStorage.getItem("loggedInUser"));

  return isAuthenticated ? <Component {...rest} /> : <Navigate to="/" />;
}
