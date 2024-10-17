import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddDepartment() {
  const [department, setDepartment] = useState({
    dep_name: "",
    description: "",
  });
  const navigate = useNavigate();
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setDepartment({
      ...department,
      [name]: value,
    });
  };
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://ems-backend-beige.vercel.app/api/department/add",
        department,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        navigate("/admin-dashboard/department");
      }
    } catch (error) {
      console.log(error);

      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };
  return (
    <div className="w-96 max-w-3xl bg-white mx-auto mt-10 p-8 rounded-md shadow-md  ">
      <h3 className="text-2xl font-bold mb-6">Add New Department</h3>
      <form onSubmit={handleOnSubmit}>
        <div>
          <label
            htmlFor="dep_name"
            className="text-sm font-medium text-gray-700"
          >
            Department Name
          </label>
          <input
            name="dep_name"
            onChange={handleOnChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            type="text"
            placeholder="Enter Dep Name"
            required
          />
        </div>
        <div className="mt-3">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            name="description"
            placeholder="Description"
            onChange={handleOnChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            rows="4"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-sm"
        >
          Add Department
        </button>
      </form>
    </div>
  );
}

export default AddDepartment;
