import { useEffect, useState } from "react";
import { fetchDepartments, getEmployees } from "../../utils/EmployeeHelpers";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddSalary() {
  const [departments, setDepartments] = useState(null);
  const [salary, setSalary] = useState({
    employeeId: null,
    basicSalary: 0,
    allowances: 0,
    deductions: 0,
    date: null,
  });
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getDepartments = async () => {
      const allDepartments = await fetchDepartments();

      setDepartments(allDepartments);
    };
    getDepartments();
  }, []);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setSalary((prev) => ({ ...prev, [name]: value }));
  };

  const handleOnsubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:3000/api/salary/add`,
        salary,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        navigate("/admin-dashboard/employee");
      }
    } catch (error) {
      console.log(error);

      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };

  const handleDepartment = async (e) => {
    const emps = await getEmployees(e.target.value);
    setEmployees(emps);
  };

  return (
    <>
      {departments ? (
        <div className="max-w-5xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
          <h2 className="text-2xl font-bold mb-6">Add Salary </h2>
          <form onSubmit={handleOnsubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* department */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Department
                </label>
                <select
                  name="department"
                  onChange={handleDepartment}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select Department</option>
                  {departments?.map((dep, index) => (
                    <option key={index} value={dep?.dep_name}>
                      {dep?.dep_name}
                    </option>
                  ))}
                </select>
              </div>
              {/* employee */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Employee
                </label>
                <select
                  name="employeeId"
                  onChange={handleOnChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select Employee</option>
                  {employees.map((emp) => (
                    <option key={emp._id} value={emp._id}>
                      {emp.employeeId}
                    </option>
                  ))}
                </select>
              </div>

              {/* Basic Salary */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Basic Salary
                </label>
                <input
                  type="number"
                  name="basicSalary"
                  onChange={handleOnChange}
                  placeholder="basic salary"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  required
                />
              </div>

              {/* Allowances */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Allowances
                </label>
                <input
                  type="number"
                  name="allowances"
                  onChange={handleOnChange}
                  placeholder="allowances"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  required
                />
              </div>
              {/* deductions */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Deductions
                </label>
                <input
                  type="number"
                  name="deductions"
                  onChange={handleOnChange}
                  placeholder="deductions"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  required
                />
              </div>
              {/* pay Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Pay Date
                </label>
                <input
                  type="date"
                  name="payDate"
                  onChange={handleOnChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-md"
            >
              Add Salary
            </button>
          </form>
        </div>
      ) : (
        <div>Loading</div>
      )}
    </>
  );
}

export default AddSalary;
