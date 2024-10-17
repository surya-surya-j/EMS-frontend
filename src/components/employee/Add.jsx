import { useEffect, useState } from "react";
import { fetchDepartments } from "../../utils/EmployeeHelpers";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Add() {
  const [departments, setDepartments] = useState([]);
  const [formData, setFormdata] = useState({});
  const navigate = useNavigate();
  
useEffect(() => {
  const getDepartments = async () => {
    const allDepartments = await fetchDepartments();

    setDepartments(allDepartments);
  };
  getDepartments();
}, []);

  const handleOnChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormdata((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormdata((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleOnsubmit = async (e) => {
    e.preventDefault();
    const formDataObj = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataObj.append(key, formData[key]);
    });

    try {
      const response = await axios.post(
        "https://ems-backend-beige.vercel.app/api/employee/add",
        formDataObj,
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
    <div className="max-w-5xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-6">Add New Employee </h2>
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
              onChange={handleOnChange}
              placeholder="Insert Name"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>
          {/* email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              onChange={handleOnChange}
              placeholder="Insert mail"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>
          {/* Employee Id */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Employee ID
            </label>
            <input
              type="text"
              name="employeeId"
              placeholder="Employee Id"
              onChange={handleOnChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>
          {/* Date of Birth */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Date of Birth
            </label>
            <input
              type="date"
              name="dob"
              onChange={handleOnChange}
              placeholder="DOB"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>
          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Gender
            </label>
            <select
              name="gender"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              onChange={handleOnChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          {/* martial status */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Maritial Status
            </label>
            <select
              name="maritalstatus"
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
              placeholder="Designation"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>
          {/* Department */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Department
            </label>
            <select
              name="department"
              onChange={handleOnChange}
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
          {/* salary */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Salary
            </label>
            <input
              type="number"
              name="salary"
              onChange={handleOnChange}
              placeholder="salary"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>
          {/* password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              onChange={handleOnChange}
              placeholder="********"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>
          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <select
              name="role"
              onChange={handleOnChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="employee">Employee</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Upload Image
            </label>
            <input
              type="file"
              name="image"
              onChange={handleOnChange}
              placeholder="Upload Image"
              accept="image/*"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-md"
        >
          Add Employee
        </button>
      </form>
    </div>
  );
}

export default Add;
