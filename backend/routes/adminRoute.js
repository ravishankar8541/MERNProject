const { createAdmin, loginAdmin } = require('../controller/adminController');

const router = require('express').Router();


router.post('/create', createAdmin);
router.post('/login', loginAdmin);






module.exports = router