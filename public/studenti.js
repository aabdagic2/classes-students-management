const { INTEGER, INET } = require("sequelize");
const Sequelize = require("sequelize");
const sequelize = require("./db");
module.exports =   function (sequelize, DataTypes) {
const studenti = sequelize.define('student', {
ime: Sequelize.STRING,
index: Sequelize.INTEGER
});

  return studenti;
}