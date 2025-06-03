import React, { useState } from "react";
import Context from "../context/Context";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const CreateEmployee = () => {
  const { createEmployee } = useContext(Context);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "",
    gender: "",
    courses: [],
    image: null,
  });
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file") {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else if (type === "checkbox") {
      if (checked) {
        // Set only the clicked course, uncheck others implicitly
        setFormData((prev) => ({ ...prev, course: value }));
      } else {
        // If unchecked, clear the course
        setFormData((prev) => ({ ...prev, course: "" }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    createEmployee(formData);
    navigate("/employeelist");
  };

  return (
    <form className="mt-15 ml-30" onSubmit={handleSubmit}>
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

      <div className="flex gap-2 justify-start items-center">
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

      <div className="flex gap-3 mt-4">
        <label className="text-2xl">Course</label>
        <input
        className="ml-12"
          type="checkbox"
          name="course"
          value="MCA"
          checked={formData.course === "MCA"}
          onChange={handleChange}
        />{" "}
        MCA
        <input
          type="checkbox"
          name="course"
          value="BCA"
          checked={formData.course === "BCA"}
          onChange={handleChange}
        />{" "}
        BCA
        <input
          type="checkbox"
          name="course"
          value="BSC"
          checked={formData.course === "BSC"}
          onChange={handleChange}
        />{" "}
        BSC
      </div>
      <div className="mt-4 flex gap-5">
        <label className="text-2xl">Img Upload</label>
        <input 
        type="file" name="image" onChange={handleChange} />
      </div>

      <button
        className="bg-black text-white px-8 py-3 text-[20px] rounded-md mt-5 hover:text-gray-500"
        type="submit"
      >
        Create
      </button>
    </form>
  );
};

export default CreateEmployee;
