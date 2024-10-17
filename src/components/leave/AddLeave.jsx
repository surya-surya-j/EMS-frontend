import { useState } from "react";
import { useAuth } from "../../Context/AuthsContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddLeave = () => {
  const navigate = useNavigate();

  const { user } = useAuth();
  const [leave, setLeave] = useState({
    userId: user._id,
  });
  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setLeave((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`http://localhost:3000/api/leave/add`, leave, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(response.data);
      if (response.data.success) {
        navigate(`/employee-dashboard/leaves/${leave.userId}`);
      }
    } catch (error) {
      console.log(error);
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };
  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-6">Request For Leave </h2>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Leave Type
            </label>
            <select
              name="leaveType"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              onChange={handleOnChange}
              required
            >
              <option value="">Select Leave</option>
              <option value="Sick Leave">Sick Leave</option>
              <option value="Casual Leave">Casual Leave</option>
              <option value="Annual Leave">Annual Leave</option>
            </select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                From Date
              </label>
              <input
                type="date"
                name="startDate"
                onChange={handleOnChange}
                placeholder="Insert mail"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                To Date
              </label>
              <input
                type="date"
                name="endDate"
                onChange={handleOnChange}
                placeholder="Insert mail"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="reason"
              placeholder="Reason"
              onChange={handleOnChange}
              className="w-full border border-gray-300"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-md"
        >
          Add Leave
        </button>
      </form>
    </div>
  );
};

export default AddLeave;
