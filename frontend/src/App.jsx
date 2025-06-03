import React, { useContext, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Dashbord from "./Components/Dashbord";
import EmployeeList from "./Components/EmployeeList";
import Navbar from "./Components/Navbar";
import Logout from "./Components/Logout";
import Context from "./context/Context";
import CreateEmployee from "./Components/CreateEmployee";
import EditEmployee from "./Components/EditEmployee";

const App = () => {
  const { admin } = useContext(Context);

  return (
    <BrowserRouter>
      
      <Navbar />  

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashbord" element={<Dashbord />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/employeelist" element={<EmployeeList />} />
        <Route path="/createEmployee" element={<CreateEmployee/>}/>
        <Route path="/edit/:id" element={<EditEmployee />} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;
