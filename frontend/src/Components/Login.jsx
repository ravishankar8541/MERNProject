import React, { useState, useContext } from "react";
import Context from "../context/Context";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const { loginAdmin } = useContext(Context);
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginAdmin(loginData);
      if (res.status) {
        toast.success("Login successful");
        navigate("/dashbord");
      } else {
        toast.error(res.message);
      }
    } catch (err) {
      toast.error("Login failed");
    }
  };
  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="w-[700px] bg-white p-6 rounded shadow">
        <h1 className="text-center text-3xl font-bold mb-6 text-gray-600">
          Login
        </h1>
        <div className="flex flex-col space-y-6 mt-15">
          <form onSubmit={handleSubmit}>
            <input
              className="bg-gray-200 px-2 py-5 rounded outline-none w-full mb-4"
              type="text"
              placeholder="Enter the email"
              name="email"
              value={loginData.email}
              onChange={handleChange}
            />
            <input
              className="bg-gray-200 px-2 py-5 rounded outline-none w-full mb-4"
              type="password"
              placeholder="Enter the password"
              name="password"
              value={loginData.password}
              onChange={handleChange}
            />
            <button
              className="bg-green-600 p-3 rounded text-2xl mt-[30px] hover:bg-green-700 text-white w-full"
              type="submit"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
