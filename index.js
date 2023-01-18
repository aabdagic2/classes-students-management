const express = require('express');
const fs = require('fs');
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
const bcrypt = require("bcrypt")
app.post("/login", (req, res) => {
   res.status(200);
   var data = JSON.parse(fs.readFileSync(path.resolve(__dirname, "./public/nastavnici.json")));
   var username=req.body["username"];
   var password=req.body["password"];
   var pronadjeno=false;
   var indeks=-1;
   var hashedPassword = bcrypt.hashSync(password, 10);
   for(let i=0;i<data.length;i++){
   if(data[i].nastavnik.username==username&&bcrypt.compareSync(password, data[i].nastavnik.password_hash)){
    pronadjeno=true;
    indeks=i;
    break;
    
   }
   }
   
if(pronadjeno==true){
    req.session.username = username;
    req.session.predmeti=data[indeks].predmeti;
    res.status(200);
    res.json({ poruka: "Uspješna prijava"});
}
else{
  res.status(400);
    res.json({ poruka: "Neuspješna prijava"});
}});


app.get("/predmeti", function (req, res) {
    if (req.session.username != null) {
      res.status(200);
      res.json({predmeti: req.session.predmeti});
    
    }
      else{
        res.status(400);
        res.json( {greska:"Nastavnik nije loginovan"});
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
   app.get("/predmet/:NAZIV", function (req, res) {
    var data = JSON.parse(fs.readFileSync(path.resolve(__dirname, "./public/prisustva.json")));
    var predmet=null;
    for(let i=0;i<data.length;i++){
      if(data[i].predmet==req.params['NAZIV'].substring(1)){
  
         predmet=data[i];
         break;
      }
    }
    if(predmet!=null){
    res.status(200);
    res.json({prisustvo: predmet});
    }
    else{
      res.status(400);
    }
    
  });
  app.post("/prisustvo/predmet/:NAZIV/student/:index", (req, res) => {
   var data = JSON.parse(fs.readFileSync(path.resolve(__dirname, "./public/prisustva.json")));
   var sedmica=req.body["sedmica"];
   var predavanja=req.body["predavanja"];
   var vjezbe=req.body["vjezbe"];
   var predmet=req.params['NAZIV'].substring(1);
   var indeks=req.params['index'].substring(1);
   var objekat=null;
   console.log(sedmica+predavanja+vjezbe+predmet+indeks);
   var predmet1=-1;
   var nikako=0;
   for(let i=0;i<data.length;i++){
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
   }
   fs.writeFileSync("./public/prisustva.json", JSON.stringify(data));
   if(nikako!=0){
    console.log(data[predmet1]);
    res.json({predmet: data[predmet1]});
   }
   });