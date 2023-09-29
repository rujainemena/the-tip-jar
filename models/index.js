const User = require('./User');
const Jar = require('./Jar');

User.hasMany(Jar, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Jar.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Jar };
