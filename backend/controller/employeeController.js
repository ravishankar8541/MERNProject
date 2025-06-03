const Employee = require("../models/employeeModel");

exports.addEmployee = async (req, res) => {
  try {
    console.log("Request body:", req.body);
    console.log("Request file:", req.file);

    const { name, email, mobile, designation, gender, course } = req.body;
    const image = req?.file?.path;
    


    if (!(name && email && mobile && designation && gender && course)) {
      return res.json({
        status: false,
        message: "All fields are compulsory",
      });
    }

    if (!image) {
      return res.json({
        status: false,
        message: "Please add image",
      });
    }

    const existingEmp = await Employee.findOne({ email });
    if (existingEmp) {
      return res.json({
        status: false,
        message: "Employee already exists",
      });
    }

    const employee = await Employee.create({
      name,
      email,
      mobile,
      designation,
      gender,
      course,
      image,
    });

    console.log("New employee created:", employee);

    res.json({
      status: true,
      message: "Employee added successfully",
      employee,
    });

  } catch (error) {
    console.error("Error in addEmployee:", error);
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};


exports.getEmployees = async (req, res) => {
  try{
    const employees = await Employee.find();
    return res.json(
      {
        status:true,
        message:"All Employess",
        employees
      }
    )

  }catch(error){
      res.status(500).json({
      status: false,
      message: error.message,
    });
  }
}

exports.deleteEmployee = async (req, res) => {
  try {
    const empId = req.params.id;

    const employee = await Employee.findByIdAndDelete(empId);

    if (!employee) {
      return res.json({
        status: false,
        message: "Employee not found",
      });
    }

    res.json({
      status: true,
      message: "Employee deleted successfully",
    });

  } catch (error) {
    console.error("Error in deleteEmployee:", error);
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};


exports.editEmployee = async (req, res) => {
  try {
    const empId = req.params.id;
    const image = req?.file?.path;

    // Extract only the fields that are present
    const { name, email, mobile, designation, gender, course } = req.body;

    const updatedData = {};

    if (name) updatedData.name = name;
    if (email) updatedData.email = email;
    if (mobile) updatedData.mobile = mobile;
    if (designation) updatedData.designation = designation;
    if (gender) updatedData.gender = gender;
    if (course) updatedData.course = course;
    if (image) updatedData.image = image;

    // If no data is provided to update
    if (Object.keys(updatedData).length === 0) {
      return res.json({
        status: false,
        message: "No fields provided to update",
      });
    }

    const employee = await Employee.findByIdAndUpdate(empId, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!employee) {
      return res.json({
        status: false,
        message: "Employee not found",
      });
    }

    res.json({
      status: true,
      message: "Employee updated successfully",
      employee,
    });

  } catch (error) {
    console.error("Error in editEmployee:", error);
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

