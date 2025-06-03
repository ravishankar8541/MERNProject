import React, { useState, useEffect } from "react";
import Context from "./Context";
import axios from "axios";
import { toast } from "react-toastify";

const ContextProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [empData, setEmpData] = useState([]);

  useEffect(() => {
    const storedAdmin = localStorage.getItem("admin");
    console.log("Retrieved admin from localStorage:", storedAdmin);
    if (storedAdmin && storedAdmin !== "undefined") {
      setAdmin(JSON.parse(storedAdmin));
    }
  }, []);

  const loginAdmin = async (data) => {
    const res = await axios.post(
      "https://mernproject-backend-x6az.onrender.com/api/v1/admin/login",
      data,
      {
        withCredentials: true,
      }
    );
    console.log("Login response:", res.data);
    if (res?.data?.status) {
      setAdmin(res.data.admin);
      localStorage.setItem("admin", JSON.stringify(res.data.admin));
    }

    return res.data;
  };

  const logoutAdmin = () => {
    setAdmin(null);
    localStorage.removeItem("admin");
  };

  const getEmployees = async () => {
    try {
      const res = await axios.get("https://mernproject-backend-x6az.onrender.com/api/v1/emp/all", {
        withCredentials: true,
      });
      console.log("Employee data:", res.data.employees);
      if (res?.data?.status) {
        setEmpData(res?.data?.data || res?.data?.employees);
      }else {
      toast.error("Failed to create employee. Try again.");
    }
    } catch (error) {
       console.error("Failed to create employee:", error);
    toast.error("Server Error: Unable to create employee.");
    }
  };

  useEffect(() => {
    if (admin) {
      getEmployees();
    }
  }, [admin]);

  const createEmployee = async (data) => {
  try {
    const res = await axios.post(
      "https://mernproject-backend-x6az.onrender.com/api/v1/emp/add",
      data,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log(res.data);

    if (res?.data?.status) {
      setEmpData((prev) => [...prev, res?.data?.employee]);
      await getEmployees();
      toast.success("Employee Created Successfully");
    } else {
      toast.error(res?.data?.message || "Failed to create employee.");
    }
  } catch (error) {
    console.error("Failed to create employee:", error);
    toast.error("Server Error: Unable to create employee.");
  }
};


const deleteEmployee = async (id) => {
  try {
    const res = await axios.delete(
      `https://mernproject-backend-x6az.onrender.com/api/v1/emp/delete/${id}`,
      {
        withCredentials: true,
      }
    );

    console.log(res.data);

    if (res?.data?.status) {
      // Remove deleted employee from local state
      setEmpData((prev) => prev.filter((emp) => emp._id !== id));
      toast.success("Employee Deleted Successfully");
    } else {
      toast.error(res?.data?.message || "Failed to delete employee.");
    }
  } catch (error) {
    console.error("Failed to delete employee:", error);
    toast.error("Server Error: Unable to delete employee.");
  }
};

const editEmployee = async (id, formData) => {
  try {
    const res = await axios.put(
      `https://mernproject-backend-x6az.onrender.com/api/v1/emp/edit/${id}`,
      formData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (res?.data?.status) {
      await getEmployees(); // Refresh the list
      toast.success("Employee updated successfully");
    } else {
      toast.error(res?.data?.message || "Failed to update employee");
    }

    return res.data;
  } catch (error) {
    console.error("Error updating employee:", error);
    toast.error("Server error while updating employee");
  }
};



  return (
    <Context.Provider
      value={{
        admin,
        loginAdmin,
        logoutAdmin,
        getEmployees,
        empData,
        createEmployee,
        editEmployee,
        deleteEmployee
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
