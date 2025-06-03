import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Context from "../context/Context";

const EmployeeForm = () => {
  const { createEmployee, empData, editEmployee } = useContext(Context);
  const { id } = useParams(); // edit mode if ID exists
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "",
    gender: "",
    course: "",
    image: null,
  });

  // Prefill if in edit mode
  useEffect(() => {
    if (id && empData.length > 0) {
      const emp = empData.find((e) => e._id === id);
      if (emp) {
        setFormData({
          name: emp.name,
          email: emp.email,
          mobile: emp.mobile,
          designation: emp.designation,
          gender: emp.gender,
          course: emp.course,
          image: null, // don't prefill file input
        });
      }
    }
  }, [id, empData]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file") {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else if (type === "checkbox") {
      if (checked) {
        setFormData((prev) => ({ ...prev, course: value }));
      } else {
        setFormData((prev) => ({ ...prev, course: "" }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formToSend = new FormData();
    Object.entries(formData).forEach(([key, val]) => {
      if (val) formToSend.append(key, val);
    });

    if (id) {
      editEmployee(id, formToSend);
    } else {
      createEmployee(formToSend);
    }

    navigate("/employeelist");
  };

  return (
    <form className="mt-15 ml-30" onSubmit={handleSubmit}>
      {/* Name */}
      <div className="flex gap-20">
        <label className="text-2xl">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="border outline-none mb-5 px-2 py-[5px]"
        />
      </div>

      {/* Email */}
      <div className="flex gap-21">
        <label className="text-2xl">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="border outline-none mb-5 px-2 py-[5px]"
        />
      </div>

      {/* Mobile */}
      <div className="flex gap-8">
        <label className="text-2xl">Mobile No</label>
        <input
          type="text"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
          className="border outline-none mb-5 px-2 py-[5px]"
        />
      </div>

      {/* Designation */}
      <div className="flex gap-3">
        <label className="text-2xl">Designation</label>
        <select
          name="designation"
          value={formData.designation}
          onChange={handleChange}
          className="border outline-none mb-5 px-2 py-[5px]"
        >
          <option value="">Select</option>
          <option value="HR">HR</option>
          <option value="Manager">Manager</option>
          <option value="Sales">Sales</option>
        </select>
      </div>

      {/* Gender */}
      <div className="flex gap-2 items-center mt-4">
        <label className="text-2xl">Gender</label>
        <input
          type="radio"
          name="gender"
          value="M"
          checked={formData.gender === "M"}
          onChange={handleChange}
          className="ml-12"
        />{" "}
        Male
        <input
          type="radio"
          name="gender"
          value="F"
          checked={formData.gender === "F"}
          onChange={handleChange}
        />{" "}
        Female
      </div>

      {/* Course */}
      <div className="flex gap-3 mt-4">
        <label className="text-2xl"
       
        >Course</label>
        {["MCA", "BCA", "BSC"].map((c) => (
          <label key={c}>
            <input
              type="checkbox"
              name="course"
              value={c}
              checked={formData.course === c}
              onChange={handleChange}
              className="ml-12"
            />{" "}
            {c}
          </label>
        ))}
      </div>

      {/* Image */}
      <div className="mt-4 flex gap-5">
        <label className="text-2xl">Img Upload</label>
        <input type="file" name="image" onChange={handleChange} />
      </div>

      {/* Submit */}
      <button
        className="bg-black text-white px-8 py-3 text-[20px] rounded-md mt-5 hover:text-gray-500"
        
        type="submit"
      >
        {id ? "Update" : "Create"}
      </button>
    </form>
  );
};

export default EmployeeForm;
