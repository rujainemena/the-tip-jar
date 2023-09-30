const router = require('express').Router();
const { Jar, User } = require('../models');
const withAuth = require('../utils/auth');


//all html routes are doing get method is reading
//http://localhost:3001/
router.get('/', async (req, res) => {
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
    //select user.name , project.* from project join user on user.id = project.user_id

//projectData is raw data, can't use raw data on handlebar template
    // Serialize data so the template can read it
    //take raw data and format it to json
    const jars = jarData.map((jar) => jar.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      jars, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


//http://localhost:3001/project/1
router.get('/jar/:id', async (req, res) => {
  try {
    const jarData = await Jar.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const jar = jarsData.get({ plain: true });

    res.render('jar', {
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

router.get('/signup', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('signup');
});

module.exports = router;
