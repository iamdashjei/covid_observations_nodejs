const { Model, DataTypes, Sequelize } = require("sequelize");

const connect = () => {
  const userName = process.env.USER;
  const hostName = process.env.HOST;
  const password = process.env.PASSWORD;
  const database = process.env.DB;
  const dialect = process.env.DIALECT;

  const sequelize = new Sequelize(database, userName, password, {
    host: hostName,
    dialect: dialect,
    operatorsAliases: false,
    pool: {
      max: 30,
      min: 0,
      acquire: 60000,
      idle: 5000,
    },
  });

  const db = {};
  db.Sequelize = Sequelize;
  db.sequelize = sequelize;
  db.rest = require("../model/rest_model")(sequelize, DataTypes, Model);

  return db;
};

module.exports = {
  connect,
};
