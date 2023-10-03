const sequelize = require('../config/connection');
const { User, Jar } = require('../models');

const userData = require('./userData.json');
const jarData = require('./tipJarData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const jarTips of jarData) {
    await Jar.create({
      ...jarTips,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();

