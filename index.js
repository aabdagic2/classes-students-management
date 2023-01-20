const express = require('express');
const fs = require('fs');
const Sequelize = require('sequelize');
const app = express();
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");
app.use(express.static('public'));
app.use(bodyParser.json());
app.listen(3000);
app.use(
    session({
      secret: "neka tajna sifra",
      resave: true,
      saveUninitialized: true,
    })
  );
  const db = require('./public/db');
  //const nastavnici= require('./public/nastavnici')(sequelize);
  //const predmeti= require('./public/predmeti1')(sequelize);
   //sequelize.sync({ force: true });
   
const bcrypt = require("bcrypt");
const { Console } = require('console');
app.post("/login", async (req, res) => {
   res.status(200);
   var username=req.body["username"];
   var password=req.body["password"];
   var pronadjeno=false;
   var indeks=-1;
   var hashedPassword = bcrypt.hashSync(password, 10);
   const user = await db.nastavnici.findOne({ where: { username: req.body["username"] } });
   //console.log(user);
  if(user!=null){
   if(bcrypt.compareSync(password, user.password_hash)){
    req.session.username = username;
     var predmeti=await db.predmeti.findAll({ where: { nastavnikId: user.id } });
     var predmeti1=[];
     for(let i=0;i<predmeti.length;i++){
      predmeti1.push(predmeti[i].predmet);
     }
    req.session.predmeti=predmeti1;
    res.status(200);
    res.json({ poruka: "Uspješna prijava"});
}
else{
  res.status(400).json({poruka:"Neuspješna prijava"});
}}
else{
  //res.status(400)
  res.status(400).json({poruka:"Neuspješna prijava"});
}
}


);


app.get("/predmeti", function (req, res) {
    if (req.session.username != null) {
      res.status(200);
      res.json({predmeti: req.session.predmeti});
    
    }
      else{
        res.status(400).json( {greska:"Nastavnik nije loginovan"});
      }
  });
  app.post("/logout", (req, res) => {
    if(req.session.username!=null){
      res.status(200);
    req.session.username=null;
    req.session.predmeti=null;
    console.log("Odjavljen je");
    res.json( {poruka:"Uspješno ste odjavljeni!"});

   }
   else{
    res.status(400);
   }
   });
   app.get("/predmet/:NAZIV", async function (req, res) {
    //var data = JSON.parse(fs.readFileSync(path.resolve(__dirname, "./public/prisustva.json")));
    var predmet=[];
    var predmet1=[];
    var indeksi=new Set();
    var studenti=[];
    var predmetBaza=await db.predmeti.findOne({ where: { predmet: req.params['NAZIV'].substring(1) } });
    var prisustva=await db.prisustvo.findAll({where: {predmetId: predmetBaza.id}});
    //console.log(prisustva);
   /* for(let i=0;i<data.length;i++){
      if(data[i].predmet==req.params['NAZIV'].substring(1)){
  
         predmet=data[i];
         break;
      }
    }*/
    
    for(let i=0;i<prisustva.length;i++){
      indeksi.add(prisustva[i].index);
     predmet1.push({sedmica: prisustva[i].sedmica, predavanja: prisustva[i].predavanja, vjezbe: prisustva[i].vjezbe, index: prisustva[i].index});
    }
    for(const indeks of indeksi){
      var st= await db.studenti.findOne({where:{index: indeks}});
      studenti.push({ime: st.ime, index: st.index});
    }
    
    if(predmet1!=null){
    res.status(200);
    res.json({prisustvo: {studenti: studenti, prisustva: predmet1, predmet: predmetBaza.predmet, brojPredavanjaSedmicno: predmetBaza.brojPredavanjaSedmicno, brojVjezbiSedmicno: predmetBaza.brojVjezbiSedmicno}});
    }
    else{
      res.status(400);
    }
    
  });
  app.post("/prisustvo/predmet/:NAZIV/student/:index", async (req, res) => {
   //var data = JSON.parse(fs.readFileSync(path.resolve(__dirname, "./public/prisustva.json")));
   var sedmica=req.body["sedmica"];
   var predavanja=req.body["predavanja"];
   var vjezbe=req.body["vjezbe"];
   var predmet=req.params['NAZIV'].substring(1);
   var predmetBaza=await db.predmeti.findOne({ where: { predmet: predmet } });
   var indeks=req.params['index'].substring(1);
   var objekat=null;
   var predmet1=-1;
   var nikako=0;
   /*for(let i=0;i<data.length;i++){
    if(data[i].predmet==predmet){
      nikako=1;
      for(let j=0;j<data[i].prisustva.length;j++){
          if(data[i].prisustva[j].sedmica==sedmica&&data[i].prisustva[j].index==indeks){
            predmet1=i;
            data[i].prisustva[j].predavanja=predavanja;
            data[i].prisustva[j].vjezbe=vjezbe;
            break;
          }
      }
      if(predmet1==-1){
        objekat ='{ "sedmica":'+sedmica+' , "predavanja":'+predavanja+' , "vjezbe":'+vjezbe+' , "index":'+indeks+' }';
        data[i].prisustva.push(JSON.parse(objekat));
        console.log(JSON.parse(objekat));
        predmet1=i;
      }
    }
   }*/
   if(predmetBaza!=null){
    nikako=1;
   var prisustva= await db.prisustvo.findAll({ where: {predmetId: predmetBaza.id, sedmica: sedmica, index: indeks}});
   console.log(prisustva);
   if(prisustva.length!=0){
    //console.log("22222222222222222222222222222222");
    await db.prisustvo.update({predavanja: predavanja, vjezbe: vjezbe},{where:{predmetId: predmetBaza.id, sedmica: sedmica, index: indeks}})
   }
   else{
   await db.prisustvo.create({sedmica: sedmica, predavanja:predavanja, vjezbe:vjezbe, index: indeks, predmetId: predmetBaza.id});}
  
  }
   //fs.writeFileSync("./public/prisustva.json", JSON.stringify(data));
   if(nikako!=0){
    var prisustva= await db.prisustvo.findAll({ where: {predmetId: predmetBaza.id}});
    var predmet1=[];
    var indeksi=new Set();
    var studenti=[];
    for(let i=0;i<prisustva.length;i++){
      
      indeksi.add(prisustva[i].index);
     predmet1.push({sedmica: prisustva[i].sedmica, predavanja: prisustva[i].predavanja, vjezbe: prisustva[i].vjezbe, index: prisustva[i].index});
    }
    for(const indeks of indeksi){
      var st= await db.studenti.findOne({where:{index: indeks}});
      //console.log(indeks);
      studenti.push({ime: st.ime, index: st.index});
    }
    if(predmet1!=null){
    res.status(200);
    res.json({predmet:{studenti: studenti, prisustva: predmet1, predmet: predmetBaza.predmet, brojPredavanjaSedmicno: predmetBaza.brojPredavanjaSedmicno, brojVjezbiSedmicno: predmetBaza.brojVjezbiSedmicno}});
    }
   }
   });
