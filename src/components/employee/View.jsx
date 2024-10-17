import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function View() {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);

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
          setEmployee(response.data.employee);
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

  return (
    <>
      {employee ? (
        <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
          <h2 className="text-2xl font-bold mb-8 text-center">Employee</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <img
                src={`https://ems-backend-beige.vercel.app/${employee.userId.profileImage}`}
                alt=""
                className="rounded-full border w-72"
              />
            </div>
            <div>
              <div className="flex mb-5 space-x-3">
                <p className="text-lg font-bold">Name:</p>
                <p className="font-medium">{employee.userId.name}</p>
              </div>
              <div className="flex mb-5 space-x-3">
                <p className="text-lg font-bold">Employee ID:</p>
                <p className="font-medium">{employee.employeeId}</p>
              </div>
              <div className="flex mb-5 space-x-3">
                <p className="text-lg font-bold">Date Of Birth:</p>
                <p className="font-medium">
                  {new Date(employee.dob).toLocaleDateString()}
                </p>
              </div>
              <div className="flex mb-5 space-x-3">
                <p className="text-lg font-bold">Gender:</p>
                <p className="font-medium">{employee.gender}</p>
              </div>
              <div className="flex mb-5 space-x-3">
                <p className="text-lg font-bold">Department:</p>
                <p className="font-medium">{employee.department.dep_name}</p>
              </div>
              <div className="flex mb-5 space-x-3">
                <p className="text-lg font-bold">Maritial Status:</p>
                <p className="font-medium">{employee.maritalstatus}</p>
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

export default View;
