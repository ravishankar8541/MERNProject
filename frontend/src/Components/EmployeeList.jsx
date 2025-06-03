import React, { useContext, useEffect } from "react";
import Context from "../context/Context";
import { Link } from "react-router-dom";

const EmployeeList = () => {
  const { getEmployees, empData, deleteEmployee } = useContext(Context);

  useEffect(() => {
    getEmployees(); // Fetch employee data on component mount
  }, []);

  return (
    <div>
      <div className="p-4 bg-yellow-400">EmployeeList</div>
      <div className="flex justify-end gap-5 pr-[400px] p-3">
        <p>Total Count:{empData.length}</p>

        <Link to="/createEmployee" className="hover:underline">
          Create Employee
        </Link>
      </div>
      <ul className="list-none flex justify-between bg-gray-400 p-5 font-bold">
        <li className="w-1/6">Unique ID</li>
        <li className="w-1/6">Image</li>
        <li className="w-1/6">Name</li>
        <li className="w-1/6">Email</li>
        <li className="w-1/6">Mobile No</li>
        <li className="w-1/6">Designation </li>
        <li className="w-1/6">gender</li>
        <li className="w-1/6">Course</li>
        <li className="w-1/6">Action</li>
      </ul>

      {empData.length === 0 ? (
        <p className="mt-4">No employees found.</p>
      ) : (
        empData.map((emp, index) => (
          <ul
            key={emp._id}
            className="list-none flex justify-between border-b border-gray-300 p-5"
          >
            <li className="w-1/6">{index + 1}</li>
            <li className="w-1/6">
              <img
                src={emp.image}
                alt="Employee"
                className="w-12 h-12 object-cover rounded-full"
              />
            </li>
            <li className="w-1/6">{emp.name}</li>
            <li className="w-1/6">{emp.email}</li>
            <li className="w-1/6">{emp.mobile}</li>
            <li className="w-1/6">{emp.designation} </li>
            <li className="w-1/6">{emp.gender}</li>
            <li className="w-1/6">{emp.course}</li>
            <li className="w-1/6 flex gap-6 justify-start items-start">
             <Link to={`/edit/${emp._id}`} className="text-blue-600 hover:underline" >
             Edit
             </Link>
              <button onClick={() => deleteEmployee(emp._id)} className="text-red-500">Delete</button>
            </li>
          </ul>
        ))
      )}
    </div>
  );
};

export default EmployeeList;
