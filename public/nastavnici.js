const Sequelize = require("sequelize");
const sequelize = require("./db");
module.exports =  function (sequelize, DataTypes) {
const nastavnici = sequelize.define('nastavnik', {
username: Sequelize.STRING,
password_hash: Sequelize.STRING
});
return nastavnici;
}



