var porukaElement, brojPokusajaElement;
var pokusaj;

window.onload = function () {

   porukaElement=document.getElementById("poruka");
   var loginForm = document.getElementById("LoginForm");
   
  document.getElementById("posalji").addEventListener("click", function () {
   // pokusajAjax(loginForm);
   PoziviAjax.postLogin(loginForm.username.value,loginForm.password.value,ispisi);
  });
};

function ispisi(error,data) {
  if(data=="Uspješna prijava"){
   porukaElement.innerHTML=data;
    window.location.replace("http://localhost:3000/predmeti.html");
 }else{
  porukaElement.innerHTML=error;
 }

}

/*function pokusajAjax(form) {
  var ajax = new XMLHttpRequest();
  var un = form.username.value;
  var pw = form.password.value;
  ajax.onreadystatechange = function () {
    if (ajax.readyState == 4 && ajax.status == 200) {
      var jsonRez = JSON.parse(ajax.responseText);
      if(jsonRez.poruka=="Uspješna prijava")
      window.location.replace("http://localhost:3000/predmeti.html");

    } else if (ajax.readyState == 4) un;
  };
  ajax.open("POST", "http://localhost:3000/login", true);
  ajax.setRequestHeader("Content-Type", "application/json");
  ajax.send(JSON.stringify({ username:un, password:pw }));
}*/