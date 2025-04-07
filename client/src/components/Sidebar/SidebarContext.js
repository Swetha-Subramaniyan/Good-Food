import { createContext, useContext, useState, useEffect } from "react";

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [userRole, setUserRole] = useState("USER");
  const [token, setToken] = useState(null);

  useEffect(() => {
    setUserRole(localStorage.getItem("role"));
    setToken(localStorage.getItem("token"));
  }, []);

  const toggleSidebar = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <SidebarContext.Provider
      value={{ isOpen, toggleSidebar, userRole, token }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => useContext(SidebarContext);
