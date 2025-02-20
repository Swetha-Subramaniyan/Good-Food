
// import React from 'react'
// import { Outlet, Navigate } from "react-router-dom";

// const PrivateRoute = ({ children }) => {
//   const isAuthenticated = localStorage.getItem("token"); 
//   return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
// };

// export default PrivateRoute;



import React from 'react'
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = () => {
  const isAuthenticated = localStorage.getItem("token"); 
  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;

