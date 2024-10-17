import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { columns, EmployeeButtons } from "../../utils/EmployeeHelpers";

function List() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredEmployee, setFilteredEmployee] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://ems-backend-beige.vercel.app/api/employee",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(response.data.employees[0]);

        if (response.data.success) {
          let sno = 1;
          const data = await response.data.employees.map((emp) => ({
            _id: emp._id,
            sno: sno++,
            dep_name: emp.department.dep_name,
            name: emp.userId.name,
            dob: new Date(emp.dob).toLocaleDateString(),
            profileImage: (
              <img
                width={40}
                className=" rounded-full "
                alt=""
                src={`https://ems-backend-beige.vercel.app/${emp.userId.profileImage}`}
              />
            ),
            action: <EmployeeButtons Id={emp._id} />,
          }));
          setEmployees(data);
          setFilteredEmployee(data);
        }
      } catch (error) {
        console.log(error);
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  const handleFilter = (e) => {
    const records = employees.filter((emp) =>
      emp.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredEmployee(records);
  };
  return (
    <div className="p-6">
      <div className="text-center">
        <h3 className=" text-2xl font-bold">Manage Employee</h3>
      </div>
      <div className="flex justify-between items-center">
        <input
          type="text"
          placeholder="Search By Dep Name"
          className="py-0.5 px-4 border"
          onChange={handleFilter}
        />
        <Link
          to="/admin-dashboard/add-employee"
          className="bg-teal-600 py-1 px-4 rounded text-white"
        >
          Add New Employee
        </Link>
      </div>
      <div className="mt-6">
        <DataTable columns={columns} data={filteredEmployee} pagination />
      </div>
    </div>
  );
}

export default List;
