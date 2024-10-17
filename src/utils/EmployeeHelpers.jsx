import axios from "axios";
import { useNavigate } from "react-router-dom";

export const columns = [
  {
    name: "S No",
    selector: (row) => row.sno,
    width: "70px",
  },
  {
    name: "Name",
    selector: (row) => row.name,
    width: "100px",
    sortable: true,
  },
  {
    name: "Image",
    selector: (row) => row.profileImage,
    width: "90px",
  },
  {
    name: "Department",
    selector: (row) => row.dep_name,
    sortable: true,
    width: "120px",
  },
  {
    name: "DOB",
    selector: (row) => row.dob,
    sortable: true,
    width: "140px",
  },
  {
    name: "Action",
    selector: (row) => row.action,
    center: true,
  },
];

export const EmployeeButtons = ({ Id }) => {
  const navigate = useNavigate();

  return (
    <div className="flex space-x-3">
      <button
        className="px-3 py-1 bg-teal-600 text-white"
        onClick={() => navigate(`/admin-dashboard/employee/${Id}`)}
      >
        View
      </button>
      <button
        className="px-3 py-1 bg-blue-600 text-white"
        onClick={() => navigate(`/admin-dashboard/employee/edit/${Id}`)}
      >
        Edit
      </button>
      <button
        className="px-3 py-1 bg-yellow-600 text-white"
        onClick={() => navigate(`/admin-dashboard/employees/salary/${Id}`)}
      >
        Salary
      </button>
      <button
        className="px-3 py-1 bg-red-600 text-white"
        onClick={() => navigate(`/admin-dashboard/employees/leaves/${Id}`)}
      >
        Leave
      </button>
    </div>
  );
};

// fetch departmnts

export const fetchDepartments = async () => {
  let departments;
  try {
    const response = await axios.get("http://localhost:3000/api/department", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (response.data.success) {
      departments = await response.data.departments;
    }
  } catch (error) {
    console.log(error);
    if (error.response && !error.response.data.success) {
      alert(error.response.data.error);
    }
  }
  return departments;
};

// employees for Salary Form

export const getEmployees = async (id) => {
  let employees;
  try {
    const response = await axios.get(
      `http://localhost:3000/api/employee/department/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log(response, "respo");

    if (response.data.success) {
      employees = await response.data.employees;
    }
  } catch (error) {
    console.log(error);
    if (error.response && !error.response.data.success) {
      alert(error.response.data.error);
    }
  }
  return employees;
};
