import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import SignIn from "../User/OverallHome/SignIn";

const PrivateRoute = () => {
  const [isSignInVisible, setIsSignInVisible] = useState(true);
  const location = useLocation();
  const token = localStorage.getItem("token");

  const handleCloseSignIn = () => {
    setIsSignInVisible(false);
  };

  if (!token) {
    localStorage.setItem("Redirect_Link", location.pathname);
    return isSignInVisible ? (
      <SignIn isVisible={isSignInVisible} onClose={handleCloseSignIn} />
    ) : null;
  }

  return (
      <Outlet />
  );
};

export default PrivateRoute;