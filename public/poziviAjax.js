const PoziviAjax = (()=>{
    //fnCallback u svim metodama se poziva kada stigne odgovor sa servera putem Ajax-a
    // svaki callback kao parametre ima error i data, error je null ako je status 200 i data je tijelo odgovora
    // ako postoji greška poruka se prosljeđuje u error parametar callback-a, a data je tada null
    function impl_getPredmet(naziv,fnCallback){
        var ajax = new XMLHttpRequest();
        ajax.open("GET", "http://localhost:3000/predmet/:"+naziv, true);
  ajax.setRequestHeader("Content-Type", "application/json");
  ajax.send();
  console.log(naziv);
  ajax.onreadystatechange = function () {
    if (ajax.readyState == 4 && ajax.status == 200) {
        var predmeti1=JSON.parse(ajax.responseText);
        console.log(predmeti1.prisustvo);
        fnCallback(null,predmeti1.prisustvo);

    }
    else if(ajax.readyState == 4){
        fnCallback(ajax.responseText,null);
    }

}
    }
    // vraća listu predmeta za loginovanog nastavnika ili grešku da nastavnik nije loginovan
    function impl_getPredmeti(fnCallback){
        var ajax = new XMLHttpRequest();
        ajax.open("GET", "http://localhost:3000/predmeti", true);
  ajax.setRequestHeader("Content-Type", "application/json");
  ajax.send();
  ajax.onreadystatechange = function () {
    if (ajax.readyState == 4 && ajax.status == 200) {
  var predmeti1=JSON.parse(ajax.responseText);
  fnCallback(null,predmeti1.predmeti);
  return predmeti1.predmeti;
    }
    else if (ajax.readyState == 4) {
      error=ajax.statusText;
        fnCallback(error,null);
        return error;
    }
}}
    function impl_postLogin(username,password,fnCallback){
        var ajax = new XMLHttpRequest();
        ajax.onreadystatechange = function () {
          if (ajax.readyState == 4 && ajax.status == 200) {
            var jsonRez = JSON.parse(ajax.responseText);
            console.log(jsonRez.poruka);
            fnCallback(null,jsonRez.poruka); 
          } else if (ajax.readyState == 4) {
            var jsonRez = JSON.parse(ajax.responseText);
            fnCallback(jsonRez.poruka,null);}
        };
        ajax.open("POST", "http://localhost:3000/login", true);
        ajax.setRequestHeader("Content-Type", "application/json");
        ajax.send(JSON.stringify({ username:username, password:password }));
    }
    function impl_postLogout(fnCallback){
        var ajax = new XMLHttpRequest(); 
        ajax.open("POST", "http://localhost:3000/logout", true); 
        ajax.setRequestHeader("Content-Type", "application/json");
        ajax.send();
        var error=null,data=null;
        ajax.onreadystatechange = function () {
            if (ajax.readyState == 4 && ajax.status == 200) {
              var jsonRez = JSON.parse(ajax.responseText);
              data=jsonRez.poruka;
              fnCallback(error,data);
            } else if (ajax.readyState == 4) {error=ajax.statusText;
                fnCallback(error,data);
            }}

    }
    //prisustvo ima oblik {sedmica:N,predavanja:P,vjezbe:V}
    function impl_postPrisustvo(naziv,index,prisustvo,fnCallback){
        var ajax = new XMLHttpRequest(); 
        ajax.open("POST", "http://localhost:3000/prisustvo/predmet/:"+naziv+"/student/:"+index, true);
        ajax.setRequestHeader("Content-Type", "application/json");
 
        ajax.send(JSON.stringify({sedmica:prisustvo.sedmica, predavanja: prisustvo.predavanja, vjezbe:prisustvo.vjezbe}));
        ajax.onreadystatechange = function () {
            if (ajax.readyState == 4 && ajax.status == 200) {
              var jsonRez = JSON.parse(ajax.responseText);
              data=jsonRez.predmet;
              console.log(data);
              fnCallback(null,data);
            } else if (ajax.readyState == 4) {error=ajax.statusText;
                fnCallback(error,null);
            }}
    }
    return{
    postLogin: impl_postLogin,
    postLogout: impl_postLogout,
    getPredmet: impl_getPredmet,
    getPredmeti: impl_getPredmeti,
    postPrisustvo: impl_postPrisustvo
    };
    })();