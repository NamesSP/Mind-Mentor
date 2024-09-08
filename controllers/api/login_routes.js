const router = require('express').Router();
const User = require('../../models/User.js');
//test
// localhost:3001/api/login
// POST user login route
router.post('/', async (req, res) => {
    try {
      const userData = await User.findOne({ where: { email: req.body.email } });
      if (!userData) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }
  
      const validPassword = await userData.checkPassword(req.body.password);
      if (!validPassword) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }

      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
        
        res.json({ user: userData, message: 'You are now logged in!' });
      });
  
    } catch (err) {
      res.status(400).json(err);
    }
  });

// GET route to return the user_id if the user is logged in
router.get('/user', (req, res) => {
  console.log(req.session);
  if (req.session) {
      res.json({ user_id: req.session.user_id });
  } else {
      res.status(401).json({ message: 'Not logged in' });
  }
});
  
  
module.exports = router;