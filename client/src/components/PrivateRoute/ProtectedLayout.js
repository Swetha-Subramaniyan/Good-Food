import React from "react";
import MainSidebar from "../Sidebar/MainSidebar"
import { Outlet } from "react-router-dom";

const ProtectedLayout = () => {
  return (
    <div>
      <MainSidebar />
      <Outlet />
    </div>
  );
};

export default ProtectedLayout;