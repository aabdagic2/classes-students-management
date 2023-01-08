const express = require('express');
const fs = require('fs');
const app = express();
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");
app.use(express.static('public'));
app.use(bodyParser.json());
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "public"));
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
  bcrypt.hash(password, 10, function(err, hash) {
    password=hash;
    });

   for(let i=0;i<data.length;i++){
   if(data[i].nastavnik.username==username&&password==data[i].nastavnik.password_hash){
    pronadjeno=true;
    indeks=i;
    break;
    
   }
   }
   
if(pronadjeno==true){
    req.session.username = username;
    req.session.predmeti=data[indeks].predmeti;
    res.json({ poruka: "Uspješna prijava"});
}
else{
    res.json({ poruka: "Neuspješna prijava"});
}});

app.get("/predmeti", function (req, res) {
    if (req.session.username != null) {
      res.render("predmeti1",{predmeti: req.session.predmeti})
    
    }
      else{
        res.json( {greska:"Nastavnik nije loginovan"});
      }
  });
  app.get("/predmeti.html", function (req, res) {
    if (req.session.username != null) {
      
    }
    else{
      res.json( {greska:"Nastavnik nije loginovan"});
    }

  });
  app.post("/logout", (req, res) => {
    res.status(200);
    if(req.session.username!=null){
    req.session.username=null;
    req.session.predmeti=null;
    res.json( {poruka:"Uspješno ste odjavljeni!"});
   }
   });