import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Context from "../context/Context";

const Navbar = () => {
  const { admin, logoutAdmin } = useContext(Context);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutAdmin();
    navigate("/");
  };

  return (
    <nav>
      {admin && (
        <div className="bg-gray-500 p-4 flex gap-6 text-white text-lg justify-between items-center">
          <Link to="/dashbord" className="hover:underline">
            Dashboard
          </Link>
          <Link to="/employeelist" className="hover:underline">
            Employee List
          </Link>
          <p>ravi</p>
          <button onClick={handleLogout} className="hover:underline">
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
