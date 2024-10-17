import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import privateRoutes from "./utils/PrivateRoutes.jsx";
import RolebasedRoutes from "./utils/RolebasedRoutes";
import AdminSummary from "./components/dashboard/AdminSummary";

import DepartmentList from "./components/department/DepartmentList";
import AddDepartment from "./components/department/AddDepartment";
import EditDepartment from "./components/department/EditDepartment";
import List from "./components/employee/List";
import Add from "./components/employee/Add";
import View from "./components/employee/View";
import Edit from "./components/employee/Edit";
import AddSalary from "./components/salary/AddSalary";
import ViewSalary from "./components/salary/ViewSalary";
import Summary from "./components/EmployeeDashboard/Summary";
import LeaveList from "./components/leave/List";
import AddLeave from "./components/leave/AddLeave";
import Settings from "./components/setting/Setting";
import Table from "./components/leave/Table";
import Detail from "./components/leave/Detail";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/admin-dashboard" />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route
            path="/admin-dashboard"
            element={
              <privateRoutes>
                <RolebasedRoutes requiredRole={["admin"]}>
                  <AdminDashboard />
                </RolebasedRoutes>
              </privateRoutes>
            }
          >
            <Route index element={<AdminSummary />}></Route>
            <Route
              path="/admin-dashboard/department"
              element={<DepartmentList />}
            ></Route>
            <Route
              path="/admin-dashboard/add-department"
              element={<AddDepartment />}
            ></Route>
            <Route
              path="/admin-dashboard/department/:id"
              element={<EditDepartment />}
            ></Route>
            <Route path="/admin-dashboard/employee" element={<List />}></Route>
            <Route
              path="/admin-dashboard/add-employee"
              element={<Add />}
            ></Route>
            <Route
              path="/admin-dashboard/employee/:id"
              element={<View />}
            ></Route>
            <Route
              path="/admin-dashboard/employee/edit/:id"
              element={<Edit />}
            ></Route>
            <Route
              path="/admin-dashboard/employees/salary/:id"
              element={<ViewSalary />}
            ></Route>
            <Route
              path="/admin-dashboard/employees/leaves/:id"
              element={<LeaveList />}
            ></Route>
            <Route
              path="/admin-dashboard/salary/add"
              element={<AddSalary />}
            ></Route>
            <Route path="/admin-dashboard/leaves" element={<Table />}></Route>
            <Route
              path="/admin-dashboard/leaves/:id"
              element={<Detail />}
            ></Route>
            <Route
              path="/admin-dashboard/setting"
              element={<Settings />}
            ></Route>
          </Route>
          <Route
            path="/employee-dashboard"
            element={
              <privateRoutes>
                <RolebasedRoutes requiredRole={["admin", "employee"]}>
                  <EmployeeDashboard />
                </RolebasedRoutes>
              </privateRoutes>
            }
          >
            <Route index element={<Summary />}></Route>
            <Route
              path="/employee-dashboard/profile/:id"
              element={<View />}
            ></Route>
            <Route
              path="/employee-dashboard/leaves/:id"
              element={<LeaveList />}
            ></Route>
            <Route
              path="/employee-dashboard/add-leave"
              element={<AddLeave />}
            ></Route>
            <Route
              path="/employee-dashboard/salary/:id"
              element={<ViewSalary />}
            ></Route>
            <Route
              path="/employee-dashboard/setting"
              element={<Settings />}
            ></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
