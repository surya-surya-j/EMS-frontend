import { Outlet } from "react-router-dom";
import AdminNavbar from "../components/dashboard/AdminNavbar";
import AdminSidebar from "../components/dashboard/AdminSidebar";

const AdminDashboard = () => {
  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 ml-64 bg-gray-100 h-screen">
        <AdminNavbar />
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
