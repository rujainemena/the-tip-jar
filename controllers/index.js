const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes =require('./homeRoutes');
router.use('/',homeRoutes)
router.use('/api', apiRoutes);

//html routes
router.use('/', homeRoutes);

//api routes 
router.use('/api',apiRoutes);

module.exports = router;

