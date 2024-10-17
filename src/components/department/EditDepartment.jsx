import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditDepartment() {
  const { id } = useParams();
  const [department, setDepartment] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:3000/api/department/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          setDepartment(response.data.department);
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
    fetchDepartments();
  }, []);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setDepartment({
      ...department,
      [name]: value,
    });
  };

  const handleOnsubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:3000/api/department/${id}`,
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
    <>
      {loading ? (
        <div>Loading....</div>
      ) : (
        <div className="w-96 max-w-3xl bg-white mx-auto mt-10 p-8 rounded-md shadow-md  ">
          <h2 className="text-2xl font-bold mb-6">Edit Department</h2>
          <form onSubmit={handleOnsubmit}>
            <div>
              <label
                htmlFor="dep_name"
                className="text-sm font-medium text-gray-700"
              >
                Department Name
              </label>
              <input
                name="dep_name"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                value={department.dep_name}
                onChange={handleOnChange}
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
                value={department.description}
                onChange={handleOnChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                rows="4"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-sm"
            >
              Edit Department
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default EditDepartment;
