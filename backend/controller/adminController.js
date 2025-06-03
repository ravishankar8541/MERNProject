const Admin = require("../models/adminModel");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.createAdmin = async (req, res) => {
  const { email, password } = req.body;
  const existAdmin = await Admin.findOne({ email });
  if (existAdmin) {
    return res.json({
      status: false,
      message: "admin already exist",
    });
  }
  const hashedPassword = await bcrypt.hash(password, 10)

  const admin = await Admin.create({
    email,
    password:hashedPassword,
  });

  res.json({
    status: true,
    message: "admin created successfully",
  });
};

exports.loginAdmin = async (req, res) => {
  try {
    const {email, password} = req.body;
    if(!email || !password){
        return res.json(
            {
                status:false,
                message:"Email and password are required"
            }
        )
    }

    const admin = await Admin.findOne({email})
    if(!admin){
        return res.json(
            {
                status:false,
                message: 'Invalid credentials'

            }
        )
    }

    //check password
    const isMatch = await bcrypt.compare(password, admin.password);
    if(!isMatch){
        return res.json(
            {
                status:false,
                message:"Invalid credentials"
            }
        )
    }

    const token = jwt.sign(
        {
            id:admin._id,

        },
        process.env.SECRET_KEY,
        {
            expiresIn:'2h'
        }
    )

    admin.token = token;
    res.json(
        {
            status:true,
            message:"Login Successfully",
            admin
        }
    )


  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};
