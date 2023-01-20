const { INTEGER, INET } = require("sequelize");
const Sequelize = require("sequelize");
const sequelize = require("./db");
module.exports =   function (sequelize, DataTypes) {
const prisustva = sequelize.define('prisustvo', {
sedmica: Sequelize.INTEGER,
predavanja: Sequelize.INTEGER,
vjezbe: Sequelize.INTEGER,
index: Sequelize.INTEGER
});

  return prisustva;
}