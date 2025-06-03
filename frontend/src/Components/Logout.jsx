import React, { useContext } from "react";
import Context from "../context/Context";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const { logoutAdmin } = useContext(Context);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutAdmin();
    navigate("/");
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;