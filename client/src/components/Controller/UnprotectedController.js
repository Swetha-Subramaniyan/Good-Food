import React from "react";
import { Outlet } from "react-router-dom";

const UnprotectedController = () => {
  return <Outlet />;
};

export default UnprotectedController;
