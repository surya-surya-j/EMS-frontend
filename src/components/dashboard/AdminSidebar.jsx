import { NavLink } from "react-router-dom";
import {
  FaBuilding,
  FaCalendarAlt,
  FaCogs,
  FaMoneyBillWave,
  FaTachometerAlt,
  FaUser,
} from "react-icons/fa";
const AdminSidebar = () => {
  return (
    <div className="h-screen w-64 text-white fixed bg-gray-800 left-0 top-0 bottom-0 space-y-2 ">
      <div className="bg-teal-600 h-12 flex items-center justify-center">
        <h3 className="text-2xl text-center font-Pacific">Employee Mys</h3>
      </div>
      <div className="px-4">
        <NavLink
          to="/admin-dashboard"
          className={({ isActive }) =>
            `${
              isActive ? "bg-teal-500" : " "
            } flex items-center space-x-4  py-2.5 px-4 rounded`
          }
          end
        >
          <FaTachometerAlt />
          <span>Dashboard</span>
        </NavLink>
        <NavLink
          to="/admin-dashboard/employee"
          className={({ isActive }) =>
            `${
              isActive ? "bg-teal-500" : " "
            } flex items-center space-x-4  py-2.5 px-4 rounded`
          }
        >
          <FaUser />
          <span>Employee</span>
        </NavLink>
        <NavLink
          to="/admin-dashboard/department"
          className={({ isActive }) =>
            `${
              isActive ? "bg-teal-500" : " "
            } flex items-center space-x-4  py-2.5 px-4 rounded`
          }
        >
          <FaBuilding />
          <span>Department</span>
        </NavLink>
        <NavLink
          to="/admin-dashboard/leaves"
          className={({ isActive }) =>
            `${
              isActive ? "bg-teal-500" : " "
            } flex items-center space-x-4  py-2.5 px-4 rounded`
          }
        >
          <FaCalendarAlt />
          <span>Leave</span>
        </NavLink>
        <NavLink
          to="/admin-dashboard/salary/add"
          className={({ isActive }) =>
            `${
              isActive ? "bg-teal-500" : " "
            } flex items-center space-x-4  py-2.5 px-4 rounded`
          }
        >
          <FaMoneyBillWave />
          <span>Salary</span>
        </NavLink>
        <NavLink
          to="/admin-dashboard/setting"
          className={({ isActive }) =>
            `${
              isActive ? "bg-teal-500" : " "
            } flex items-center space-x-4  py-2.5 px-4 rounded`
          }
        >
          <FaCogs />
          <span>Settings</span>
        </NavLink>
      </div>
    </div>
  );
};

export default AdminSidebar;
