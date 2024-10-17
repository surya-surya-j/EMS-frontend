import axios from "axios";
import { useEffect, useState } from "react";
import {  useNavigate, useParams } from "react-router-dom";

function Detail() {
  const { id } = useParams();
  const [leave, setLeave] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchLeave = async () => {
      try {
        const response = await axios.get(
          `https://ems-backend-beige.vercel.app/api/leave/detail/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(response.data);
        if (response.data.success) {
          setLeave(response.data.leave);
        }
      } catch (error) {
        console.log(error);
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    };
    fetchLeave();
  }, []);

  const changeStatus = async(id,status)=>{
           try {
             const response = await axios.put(
               `https://ems-backend-beige.vercel.app/api/leave/detail/${id}`,
               { status },
               {
                 headers: {
                   Authorization: `Bearer ${localStorage.getItem("token")}`,
                 },
               }
             );
             console.log(response.data);
             if (response.data.success) {
              navigate("/admin-dashboard/leaves");
             }
           } catch (error) {
             console.log(error);
             if (error.response && !error.response.data.success) {
               alert(error.response.data.error);
             }
           }
  }

  return (
    <>
      {leave ? (
        <div className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded-md shadow-md">
          <h2 className="text-2xl font-bold mb-8 text-center">Leave Detail</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <img
                src={`https://ems-backend-beige.vercel.app/${leave.employeeId.userId.profileImage}`}
                alt=""
                className="rounded-full border w-72"
              />
            </div>
            <div>
              <div className="flex justify-start items-center mb-5 space-x-3">
                <p className="text-lg font-bold">Name:</p>
                <p className="font-medium">{leave.employeeId.userId.name}</p>
              </div>
              <div className="flex justify-start items-center mb-5 space-x-3">
                <p className="text-lg font-bold">Employee ID:</p>
                <p className="font-medium">{leave.employeeId.employeeId}</p>
              </div>
              <div className="flex justify-start items-center mb-5 space-x-3">
                <p className="text-lg font-bold">Leave Type:</p>
                <p className="font-medium">{leave.leaveType}</p>
              </div>
              <div className="flex justify-start items-center mb-5 space-x-3">
                <p className="text-lg font-bold">Reason:</p>
                <p className="font-medium">{leave.reason}</p>
              </div>
              <div className="flex justify-start items-center mb-5 space-x-3">
                <p className="text-lg font-bold">Department:</p>
                <p className="font-medium">
                  {leave.employeeId.department.dep_name}
                </p>
              </div>
              <div className="flex justify-start items-center mb-5 space-x-3">
                <p className="text-lg font-bold">Start Date:</p>
                <p className="font-medium">
                  {new Date(leave.startDate).toLocaleDateString()}
                </p>
              </div>
              <div className="flex justify-start items-center mb-5 space-x-3">
                <p className="text-lg font-bold">End Date:</p>
                <p className="font-medium">
                  {new Date(leave.endDate).toLocaleDateString()}
                </p>
              </div>
              <div className="flex justify-start items-center mb-5 space-x-3">
                <p className="text-lg font-bold">
                  {leave.status === "Pending" ? "Action" : "Status"}
                </p>
                {leave.status === "Pending" ? (
                  <div className="flex space-x-2">
                    <button
                      className="px-2 py-1 bg-teal-500 hover:bg-teal-600 rounded-md"
                      onClick={() => changeStatus(leave._id, "Approved")}
                    >
                      Approved
                    </button>
                    <button
                      className="px-2 py-1 bg-red-500 hover:bg-red-600 rounded-md"
                      onClick={() => changeStatus(leave._id, "Rejected")}
                    >
                      Rejected
                    </button>
                  </div>
                ) : (
                  <p className="font-medium">{leave.status}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}

export default Detail;
