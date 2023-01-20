const { INTEGER, INET } = require("sequelize");
const Sequelize = require("sequelize");
const sequelize = require("./db");
module.exports =   function (sequelize, DataTypes) {
const predmeti = sequelize.define('predmet', {
predmet: Sequelize.STRING,
brojPredavanjaSedmicno: Sequelize.INTEGER,
brojVjezbiSedmicno: Sequelize.INTEGER
});

  return predmeti;
}