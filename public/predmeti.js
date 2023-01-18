
var porukaElement,meniElement;
window.onload= function () {
    meniElement=document.getElementById("meni");
    porukaElement=document.getElementById("poruka");
    tabelaElement=document.getElementById("tabelaPrisustva");
    PoziviAjax.getPredmeti(predmetiCallback); 
}
function predmetiCallback(error, data){
    if(error==null){
    var predmeti=data;
    let meni='<style>ul {list-style-type: none;}li{display:inline-block; padding:0.2cm;}</style>';
    meni+='<ul>';
        for(let i=0;i<predmeti.length;i++){
          meni+='<li><button id="'+predmeti[i]+'">'+ predmeti[i]+'</button></li>';}
          meni+='<li><button id="btn" type="button">Logout</button></li>';
    meni+='</ul>';
    meni+=' <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script><script>'
    meni+='</script>';
    meniElement.innerHTML=meni;
    for(let i=0;i<predmeti.length;i++){
        document.getElementById(predmeti[i]).addEventListener("click", function () {
            PoziviAjax.getPredmet(predmeti[i],tabela);

    });}
    document.getElementById("btn").addEventListener("click", function () {
          PoziviAjax.postLogout(ispisi)
     
  });
 }
  if(data==null){
    porukaElement.innerHTML = error;
  }
}
function tabelaCrtaj(podaci){
    var divRef=document.getElementById("tabelaPrisustva");
   console.log(podaci);
    TabelaPrisustvo(divRef,podaci);
    //var data = JSON.parse(fs.readFileSync(path.resolve(__dirname, "./public/prisustva.json")));
    

}
function kliknuto(predmet,indeks,trenutnaSedmica,predavanja,crveno){

}
  function tabela(error,data){
    if(data!=null){
        tabelaCrtaj(data);
        console.log(data);
    }
    else{
       porukaElement.innerHTML=error;
    }
  }
  function ispisi(error,data) {
    if(error!=null)
    porukaElement.innerHTML = error;
    if(data!=null)
    porukaElement.innerHTML=data;
   
  }