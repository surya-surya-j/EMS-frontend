import axios from "axios";
import { Link, useParams } from "react-router-dom";

import { useEffect, useState } from "react";
import { useAuth } from "../../Context/AuthsContext";

const LeaveList = () => {
  const { user } = useAuth();
  const [leaves, setLeaves] = useState([]);
  let sno = 1;
  const { id } = useParams();
  const fetchLeaves = async () => {
    try {
      const response = await axios.get(
        `https://ems-backend-phi.vercel.app/api/leave/${id}/${user.role}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response?.data?.success) {
        setLeaves(response?.data?.leaves);
      }
    } catch (error) {
      console.log(error);
      if (error?.response && !error?.response?.data?.success) {
        alert(error?.response?.data?.error);
      }
    }
  };
  useEffect(() => {
    fetchLeaves();
  }, []);
  return (
    <div className="p-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Manage Leaves</h3>
      </div>
      <div className="flex justify-between items-center">
        <input
          type="text"
          placeholder="Search By Dep Name"
          className="px-4 py-0.5 border"
        />
        {user.role === "employee" && (
          <Link
            to="/employee-dashboard/add-leave"
            className="px-4 py-1 bg-teal-600 rouded text-white"
          >
            Add New Leave
          </Link>
        )}
      </div>
      <table className="w-full text-sm text-left text-gray-500 mt-6">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 border border-gray-200">
          <tr>
            <th className="px-5 py-3">SNo</th>
            <th className="px-5 py-3">LEAVE TYPE</th>
            <th className="px-5 py-3">FROM</th>
            <th className="px-5 py-3">To</th>
            <th className="px-5 py-3">DESCRIPTION</th>
            <th className="px-5 py-3">STATUS</th>
          </tr>
        </thead>
        <tbody>
          {leaves?.map((leave) => (
            <tr
              key={leave?._id}
              className="bg-white border-b dark:border-gray-700"
            >
              <td className="px-6 py-3">{sno++}</td>
              <td className="px-6 py-3">{leave.leaveType}</td>
              <td className="px-6 py-3">
                {new Date(leave.startDate).toLocaleDateString()}
              </td>
              <td className="px-6 py-3">
                {new Date(leave.endDate).toLocaleDateString()}
              </td>
              <td className="px-6 py-3">{leave.reason}</td>
              <td className="px-6 py-3">{leave.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaveList;
