import React, { useState } from "react";
import { Outlet, useLocation  } from "react-router-dom";
import SignIn from "../User/OverallHome/SignIn";

const PrivateRoute = () => {
  const [isSignInVisible, setIsSignInVisible] = useState(true);
  const location = useLocation(); 

  const handleCloseSignIn = () => {
    setIsSignInVisible(false);
  };

  const token = localStorage.getItem("token");
  const pendingSubscription = "";
  

  if (!token) {
    localStorage.setItem("Redirect_Link", location.pathname);
    localStorage.setItem("pendingSubscription", pendingSubscription);
  }

  return token ? (
    <Outlet />
  ) : (
    isSignInVisible && (
      <SignIn isVisible={isSignInVisible} onClose={handleCloseSignIn} />
    )
  );
};

export default PrivateRoute;
