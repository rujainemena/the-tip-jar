const router = require('express').Router();
const userRoutes = require('./userRoutes');
const jarRoutes = require('./jarRoutes');

//http://localhost:3001/api/user/
router.use('/users', userRoutes);
//http://localhost:3001/api/jars/
router.use('/jars', jarRoutes);

module.exports = router;

