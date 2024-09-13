const router = require('express').Router();

const apiRoutes = require('./api');
const htmlRoutes = require('./html_routes');

router.use('/', htmlRoutes);
router.use('/api', apiRoutes);

//-----------------------------------------
const entriesRoutes = require('./api/entries');
router.use('/entries', entriesRoutes); 
//----------------------------------------

module.exports = router;


