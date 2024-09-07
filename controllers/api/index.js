const router = require('express').Router();
const signupRoutes = require('./signup_routes');
const diaryRoutes = require('./diary_routes');
const loginRoutes = require('./login_routes');
const createEntryRoutes = require('./create_entry_routes');
const deleteDiary = require('./deleteDiary');

router.use('/signup', signupRoutes);
router.use('/diary', diaryRoutes);
router.use('/login', loginRoutes);
router.use('/create', createEntryRoutes);
// router.use('/delete',deleteDiary);


module.exports = router;
