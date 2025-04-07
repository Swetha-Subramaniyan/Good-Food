import { useSidebar } from "../Sidebar/SidebarContext";
import UserSidebar from "../../Pages/User/UserSidebar";
import AdminSidebar from "../../Pages/Admin/AdminSidebar";
import "./MainSidebar.css"

const MainSidebar = () => {
  const { isOpen, toggleSidebar, userRole, token } = useSidebar();

  console.log(token,"sss")

  if (!token) return null;

  return (
    <>
      <div className={`sidebar-container ${isOpen ? "open" : "closed"}`}>
        {((userRole === "ADMIN" || userRole === "DELIVERY")) ? <AdminSidebar /> : <UserSidebar />}
      </div>
      <div className={`sidebar-overlay ${isOpen ? "active" : ""}`}></div>
    </>
  );
};

export default MainSidebar;