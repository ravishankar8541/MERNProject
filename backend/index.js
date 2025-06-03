const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('./config/Database');

const app = express();


app.use(cors({
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));

app.use(express.json());


const employeeRoutes = require('./routes/employeeRoute');
const adminRoutes = require('./routes/adminRoute');
app.use('/api/v1/emp', employeeRoutes);
app.use('/api/v1/admin', adminRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
