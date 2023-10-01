const router = require('express').Router();
const userRoutes = require('./userRoutes');
const jarRoutes = require('./jarRoutes');

router.use('/users', userRoutes);
router.use('/jars', jarRoutes);

module.exports = router;

