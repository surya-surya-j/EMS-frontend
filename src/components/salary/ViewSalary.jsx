import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../Context/AuthsContext";

function ViewSalary() {
  const [salaries, setSalaries] = useState(null);
  const [filteredSalaries, setFilteredSalaries] = useState(null);
  const { id } = useParams();

  let sno = 1;

  const { user } = useAuth();

  const fetchSalaries = async () => {
    try {
      const response = await axios.get(
        `https://ems-backend-beige.vercel.app/salary/${id}/${user.role}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response?.data);
      if (response?.data?.success) {
        // const salaryData = response?.data?.salarydata;
        // const salaryArray = Array.isArray(salaryData)
        //   ? salaryData
        //   : [salaryData]; // Ensure it's an array
        setSalaries(response.data.salary);
        setFilteredSalaries(response.data.salary);
      }
    } catch (error) {
      console.log(error);
      if (error?.response && !error?.response?.data?.success) {
        alert(error?.response?.data?.error);
      }
    }
  };

  useEffect(() => {
    fetchSalaries();
  }, []);

  const filterSalaries = (q) => {
    const filterRecords = salaries?.filter((salary) =>
      salary?.employeeId?.toLowerCase()?.includes(q.toLowerCase())
    );
    setFilteredSalaries(filterRecords);
  };

  return (
    <>
      {filteredSalaries === null ? (
        <div>Loading...</div>
      ) : (
        <div className="overflow-x-auto p-5">
          <div className="text-center">
            <h2 className="text-2xl font-bold ">Salary History</h2>
          </div>
          <div className="flex justify-end my-3 ">
            <input
              type="text"
              placeholder="Search By Emp Id"
              className="border px-2 rounded-md py-0.5 border-gray-300"
              onChange={(e) => filterSalaries(e.target.value)}
            />
          </div>

          {filteredSalaries?.length > 0 ? (
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 border border-gray-200">
                <tr>
                  <th className="px-5 py-3">SNo</th>
                  <th className="px-5 py-3">Emp ID</th>
                  <th className="px-5 py-3">Salary</th>
                  <th className="px-5 py-3">Allowance</th>
                  <th className="px-5 py-3">Deduction</th>
                  <th className="px-5 py-3">Total</th>
                  <th className="px-5 py-3">Pay Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredSalaries?.map((salary) => (
                  <tr
                    key={salary?._id}
                    className="bg-white border-b dark:border-gray-700"
                  >
                    <td className="px-6 py-3">{sno++}</td>
                    <td className="px-6 py-3">
                      {salary?.employeeId?.employeeId}
                    </td>
                    <td className="px-6 py-3">{salary?.basicSalary}</td>
                    <td className="px-6 py-3">{salary?.allowances}</td>
                    <td className="px-6 py-3">{salary?.deductions}</td>
                    <td className="px-6 py-3">{salary?.netSalary}</td>
                    <td className="px-6 py-3">
                      {new Date(salary?.payDate).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div>No Records</div>
          )}
        </div>
      )}
    </>
  );
}

export default ViewSalary;
