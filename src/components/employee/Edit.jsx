import { useEffect, useState } from "react";
import { fetchDepartments } from "../../utils/EmployeeHelpers";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function Edit() {
  const [departments, setDepartments] = useState(null);
  const [employee, setEmployee] = useState({
    name: "",
    maritalstatus: "",
    designation: "",
    salary: 0,
    department: "",
  });
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    const getDepartments = async () => {
      const allDepartments = await fetchDepartments();

      setDepartments(allDepartments);
    };
    getDepartments();
  }, []);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(
          `https://ems-backend-beige.vercel.app/api/employee/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(response.data);
        if (response.data.success) {
          const employeeData = response.data.employee;
          setEmployee((prev) => ({
            ...prev,
            name: employeeData.userId.name,
            maritalstatus: employeeData.maritalstatus,
            salary: employeeData.salary,
            designation: employeeData.designation,
            department: employeeData.department,
          }));
        }
      } catch (error) {
        console.log(error);
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    };
    fetchEmployee();
  }, []);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({ ...prev, [name]: value }));
  };

  const handleOnsubmit = async (e) => {
    e.preventDefault();

    console.log(employee);

    try {
      const response = await axios.put(
        `https://ems-backend-beige.vercel.app/api/employee/${id}`,
        employee,
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

  return (
    <>
      {departments && employee ? (
        <div className="max-w-5xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
          <h2 className="text-2xl font-bold mb-6">Edit Employee </h2>
          <form onSubmit={handleOnsubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                {/* name */}
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={employee.name}
                  onChange={handleOnChange}
                  placeholder="Insert Name"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  required
                />
              </div>

              {/* martial status */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Maritial Status
                </label>
                <select
                  name="maritalstatus"
                  value={employee.maritalstatus}
                  onChange={handleOnChange}
                  placeholder="Marital Status"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select status</option>
                  <option value="single">Single</option>
                  <option value="married">Married</option>
                </select>
              </div>
              {/* designation */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Designation
                </label>
                <input
                  type="text"
                  name="designation"
                  onChange={handleOnChange}
                  value={employee.designation}
                  placeholder="Designation"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  required
                />
              </div>

              {/* salary */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Salary
                </label>
                <input
                  type="number"
                  name="salary"
                  onChange={handleOnChange}
                  value={employee.salary}
                  placeholder="salary"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Department
                </label>
                <select
                  name="department"
                  onChange={handleOnChange}
                  value={employee.department}
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
            </div>
            <button
              type="submit"
              className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-md"
            >
              Edit Employee
            </button>
          </form>
        </div>
      ) : (
        <div>Loading</div>
      )}
    </>
  );
}

export default Edit;
