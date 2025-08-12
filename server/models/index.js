const { Sequelize, DataTypes } = require('sequelize');
const config = require('../Config/config.js');

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
    logging: false
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./users')(sequelize, DataTypes);
db.Category = require('./categories')(sequelize, DataTypes);
db.Product = require('./products')(sequelize, DataTypes);
db.Payment = require('./payments')(sequelize, DataTypes);
db.Order = require('./orders')(sequelize, DataTypes);
db.Cart = require('./cart.js')(sequelize, DataTypes);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
