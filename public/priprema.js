const db = require('./db');
db.sequelize.sync({force:true}).then(function(){
    inicializacija();
});
function inicializacija()
{
    db.nastavnici.bulkCreate([
        { 
            username: 'USERNAME',
            password_hash: '$2b$10$iB576z1G/Z75C4mxbB9eN.wrwWejbUjSVFLkwiEbiuIEOHZvjSo2C'
        },
        { 
            username: 'USERNAME2',
            password_hash: '$2b$10$vsU7lPr9xw3AdKcBz3iKwO0Nv3mAG1eo8i95bE8zHoAwr4JzEcpc.'
        }
      ]).then(() => console.log("Nastavnici spaseni"));

      db.predmeti.bulkCreate([
        { 
            predmet: "PREDMET1",
            brojPredavanjaSedmicno: 2,
            brojVjezbiSedmicno: 2,
            nastavnikId: 1
        },
        { 
            predmet: "PREDMET2",
            brojPredavanjaSedmicno: 2,
            brojVjezbiSedmicno: 2,
            nastavnikId: 1
        },
        {predmet: "PREDMET3",
            brojPredavanjaSedmicno: 2,
            brojVjezbiSedmicno: 2,
            nastavnikId: 2}
        
      ]).then(() => console.log("Predmeti spaseni"));
      db.studenti.bulkCreate([
        {ime:"Neko Nekic",index:12345 },
        {ime:"Drugi Neko",index:12346},
        {ime:"N N",index:12347}
      ]).then(() => console.log("Studenti spaseni"));
      db.prisustvo.bulkCreate([
        {sedmica:1,predavanja:2,vjezbe:1,index:12345,predmetId: 1},
{sedmica:1,predavanja:2,vjezbe:2,index:12346,predmetId: 1},
{sedmica:2,predavanja:1,vjezbe:1,index:12345,predmetId: 1},
{sedmica:2,predavanja:2,vjezbe:1,index:12346,predmetId: 1},
{sedmica:3,predavanja:0,vjezbe:1,index:12346,predmetId: 1},
{sedmica:4,predavanja:2,vjezbe:2,index:12347,predmetId: 1},
{sedmica:4,predavanja:1,vjezbe:1,index:12345,predmetId: 1},
{sedmica:4,predavanja:1,vjezbe:1,index:12346,predmetId: 1},
{sedmica:3,predavanja:1,vjezbe:0,index:12345,predmetId: 1},
{sedmica:3,predavanja:0,vjezbe:1,index:12347,predmetId: 1},
{sedmica:2,predavanja:1,vjezbe:2,index:12347,predmetId: 1},

{sedmica:1,predavanja:2,vjezbe:1,index:12345,predmetId: 2},
{sedmica:1,predavanja:2,vjezbe:2,index:12346,predmetId: 2},
{sedmica:2,predavanja:2,vjezbe:0,index:12345,predmetId: 2},
{sedmica:2,predavanja:2,vjezbe:1,index:12346,predmetId: 2},
{sedmica:3,predavanja:1,vjezbe:2,index:12346,predmetId: 2},
{sedmica:4,predavanja:2,vjezbe:1,index:12347,predmetId: 2},
{sedmica:4,predavanja:2,vjezbe:2,index:12345,predmetId: 2},
{sedmica:4,predavanja:1,vjezbe:2,index:12346,predmetId: 2},
{sedmica:3,predavanja:1,vjezbe:0,index:12347,predmetId: 2},
{sedmica:3,predavanja:0,vjezbe:1,index:12345,predmetId: 2},

{sedmica:1,predavanja:2,vjezbe:1,index:12345,predmetId: 3},
{sedmica:1,predavanja:2,vjezbe:2,index:12346,predmetId: 3},
{sedmica:2,predavanja:2,vjezbe:0,index:12345,predmetId: 3},
{sedmica:2,predavanja:2,vjezbe:1,index:12346,predmetId: 3},
{sedmica:3,predavanja:1,vjezbe:2,index:12346,predmetId: 3},
{sedmica:4,predavanja:2,vjezbe:2,index:12345,predmetId: 3},
{sedmica:4,predavanja:1,vjezbe:1,index:12346,predmetId: 3},
{sedmica:4,predavanja:1,vjezbe:1,index:12347,predmetId: 3},
{sedmica:3,predavanja:0,vjezbe:1,index:12345,predmetId: 3},
{sedmica:3,predavanja:0,vjezbe:1,index:12347,predmetId: 3},
{sedmica:2,predavanja:0,vjezbe:1,index:12347,predmetId: 3},
{sedmica:1,predavanja:1,vjezbe:0,index:12347,predmetId: 3}
      ]).then(() => console.log("Prisustvo spaseno"));


}