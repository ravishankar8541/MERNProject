const router = require('express').Router();
const upload = require('../middleware/mullter');

const { addEmployee, getEmployees, deleteEmployee, editEmployee } = require('../controller/employeeController');




router.post('/add', upload.single('image'), addEmployee);
router.get('/all', getEmployees)
router.delete('/delete/:id', deleteEmployee);
router.put('/edit/:id', upload.single('image'), editEmployee);


module.exports = router;