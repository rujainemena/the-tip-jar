const router = require('express').Router();
const { Jar, User } = require('../../models');


//http://localhost:3001/jars/
router.get('/jars', async (req, res) => {
  try {
    const jarData = await Jar.findByAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const jar = jarData.get({ plain: true });

    res.render('jar', {
      ...jar,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//http://localhost:3001/jar/1
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

    res.render('jar', {
      ...jar,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  console.log(req.body)
  try {
    const newJar = await Jar.create({
      ...req.body,
      user_id: req.session.user_id
    });

    res.status(200).json(newJar);
  } catch (err) {
    res.status(400).json(err);
  }
});



router.delete('/:id', async (req, res) => {
  try {
    const jarData = await Jar.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id
      },
    });

    if (!jarData) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }

    res.status(200).json(jarData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
