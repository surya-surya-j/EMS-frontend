import { Outlet } from "react-router-dom";
import SideBar from "../components/EmployeeDashboard/SideBar";
import AdminNavbar from "../components/dashboard/AdminNavbar";

function EmployeeDashboard() {
  return (
    <div className="flex">
     <SideBar/>
      <div className="flex-1 ml-64 bg-gray-100 h-screen">
        <AdminNavbar />
        <Outlet />
      </div>
    </div>
  );
}

export default EmployeeDashboard;
