const router = require('express').Router();
const { Jar, User } = require('../models');
const withAuth = require('../utils/auth');


//all html routes are doing get method is reading

//http://localhost:3001/
router.get('/', async (req, res) => {
  try {
    res.render('homepage')
  } catch (err) {
    res.status(500).json(err);
  }
});

//http://localhost:3001/jars
router.get('/jars', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const jarData = await Jar.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });
    //jarData is raw data, can't use raw data on handlebar template
    // Serialize data so the template can read it
    //take raw data and format it to json
    const jars = jarData.map((jar) => jar.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('jars', {
      jars,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//http://localhost:3001/jars/1
router.get('/jars/:id', async (req, res) => {
  try {
    const jarData = await Jar.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const jar = jarData.get({ plain: true });

    res.render('jars', {
      ...jar,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


//http://localhost:3001/profile
// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Jar }],
    });

    const user = userData.get({ plain: true });
    console.log(user)
    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//http://localhost:3001/login
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});
//http://localhost:3001/signup
router.get('/signup', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('signup');
});

module.exports = router;
