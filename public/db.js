const Sequelize = require("sequelize");
const sequelize = new Sequelize("wt22", "root", "password", {
host: "localhost",
dialect: "mysql"
,logging:false
});
const db={};
db.Sequelize = Sequelize;  
db.sequelize = sequelize;


db.nastavnici = require('./nastavnici')(sequelize);
db.predmeti = require('./predmeti1')(sequelize);
db.prisustvo = require('./prisustvo1.js')(sequelize);
db.studenti = require('./studenti.js')(sequelize);



db.nastavnici.hasMany(db.predmeti,{as:'predmetId'});
db.predmeti.hasMany(db.prisustvo,{as:'PrisustvoId'});


module.exports = db;
