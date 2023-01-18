let TabelaPrisustvo = function (divRef, podaci) {
    //privatni atributi modula
    let trenutnaSedmica=-4;
    let najvecaSedmica=-1;
    let flegTekIscrtana=0;
    //implementacija metoda
    divRef.innerHTML = "";
    var head = document.getElementsByTagName('HEAD')[0];
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = './prisustvo.css';
    head.appendChild(link);
    //VALIDACIJA
   //1. Broj prisustva na predavanju/vježbi je veći od broja predavanja/vježbi sedmično
   //2. Broj prisustva je manji od nule
   iscrtajTabelu();
   flegTekIscrtana=1;
   function iscrtajTabelu(){
    divRef.innerHTML = "";
    let prisustvoVeceOdSedmicnog=0,prisustvoManjeOdNule=0;
    for(let i=0;i<podaci.prisustva.length;i++){
        if(podaci.prisustva[i].predavanja>podaci.brojPredavanjaSedmicno||podaci.prisustva[i].vjezbe>podaci.brojVjezbiSedmicno){
            prisustvoVeceOdSedmicnog=1;
            break;
        }
        if(podaci.prisustva[i].predavanja<0||podaci.prisustva[i].vjezbe<0){
            prisustvoManjeOdNule=1;
            break;
        }
    }
  //3. Isti student ima dva ili više unosa prisustva za istu sedmicu
let viseUnosa=0;
let indeksiStudenata=[]
const uneseneSedmice=new Set();

for(let i=0;i<podaci.studenti.length;i++){
    let uneseneSedmiceZaStudenta=[];
    indeksiStudenata.push(podaci.studenti[i].index);
    for(let j=0;j<podaci.prisustva.length;j++){
        uneseneSedmice.add(podaci.prisustva[j].sedmica);
        if(podaci.prisustva[j].index==podaci.studenti[i].index){
            uneseneSedmiceZaStudenta.push(podaci.prisustva[j].sedmica);
        }
    }
    if(uneseneSedmiceZaStudenta.length>new Set(uneseneSedmiceZaStudenta).size){
        viseUnosa=1;
        break;
    }
}
//4. Postoje dva ili više studenata sa istim indeksom u listi studenata
let istiIndeks=0;
if(indeksiStudenata.length!=new Set(indeksiStudenata).size){
    istiIndeks=1;
}
//5. Postoji prisustvo za studenta koji nije u listi studenata
let nijeUListiStudenata=0;
for(let i=0;i<podaci.prisustva.length;i++){
    if(indeksiStudenata.filter(x=>x==podaci.prisustva[i].index)==0){
nijeUListiStudenata=1;
break;
    }
}
//6. Postoji sedmica, između dvije sedmice za koje je uneseno prisustvo bar jednom
//studentu, u kojoj nema unesenog prisustva. Npr. uneseno je prisustvo za sedmice 1 i 3
//ali nijedan student nema prisustvo za sedmicu 2
let imaPraznih=0;
   let uneseneSedmice1=Array.from(uneseneSedmice.values());
   for(let i=uneseneSedmice1.at(0);i<uneseneSedmice1.length+uneseneSedmice1.at(0);i++){
    if(uneseneSedmice1[i-uneseneSedmice1.at(0)]!=i){
imaPraznih=1;
break;
    }
   }
if(prisustvoVeceOdSedmicnog||podaci.brojPredavanjaSedmicno<0||podaci.brojVjezbiSedmicno<0||prisustvoManjeOdNule||viseUnosa||istiIndeks||nijeUListiStudenata||imaPraznih){
    var tekstGreske=document.createTextNode("Podaci o prisustvu nisu validni!")
    divRef.appendChild(tekstGreske);
}
else{
    var naslovPredmeta=document.createElement("h1")
    var textPredmet=document.createTextNode(podaci.predmet)
    naslovPredmeta.appendChild(textPredmet);
    divRef.appendChild(naslovPredmeta);

   const tabelaPrisustva = document.createElement("table");
   //Zaglavlje Tabele
   const headTabele=document.createElement("thead");
   const red=document.createElement("tr");
   //Pronalazak najvece sedmice
    for(let i=0;i<podaci.prisustva.length;i++){
      if(podaci.prisustva[i].sedmica>najvecaSedmica ){
        najvecaSedmica=podaci.prisustva[i].sedmica;
      }
   }
   if(trenutnaSedmica==-4)
   trenutnaSedmica=najvecaSedmica;
   
   const kolonaIme=document.createElement("th");
 const tekstKoloneIme=document.createTextNode(`Ime i prezime`);
 kolonaIme.appendChild(tekstKoloneIme);
 red.appendChild(kolonaIme);
 const kolonaIndeks=document.createElement("th");
 const tekstKoloneIndeks=document.createTextNode(`Indeks`);
 kolonaIndeks.appendChild(tekstKoloneIndeks);
 red.appendChild(kolonaIndeks);

let rimski=["I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII","XIII","XIV","XV"];
for(let i=0;i<najvecaSedmica;i++){
 const kolonaSedmice=document.createElement("th");
 const tekstKoloneSedmice=document.createTextNode(`${rimski[i]}`);
 kolonaSedmice.appendChild(tekstKoloneSedmice);
 red.appendChild(kolonaSedmice);
   }
   if(trenutnaSedmica+1!=15){
   const kolonaPreostale=document.createElement("th");
   const tekstKolonePreostale=document.createTextNode(`${rimski[najvecaSedmica]} - XV`);
   kolonaPreostale.appendChild(tekstKolonePreostale);
   red.appendChild(kolonaPreostale);}
   headTabele.appendChild(red);
   const tabelaPrisustvoBody = document.createElement("tbody");
 

   for (let i = 0; i < podaci.studenti.length; i++) {
     const red = document.createElement("tr");
     const kolonaIme=document.createElement("td");
     const kolonaImeTekst=document.createTextNode(`${podaci.studenti[i].ime}`);
     kolonaIme.appendChild(kolonaImeTekst);
     red.appendChild(kolonaIme);
     const kolonaIndeks=document.createElement("td");
     const kolonaIndeksTekst=document.createTextNode(`${podaci.studenti[i].index}`);
     kolonaIndeks.appendChild(kolonaIndeksTekst);
     red.appendChild(kolonaIndeks);
     let indeksStudenta=podaci.studenti[i].index;
     for (let j = 0; j < trenutnaSedmica-1; j++) {
       const kolonaProcenat = document.createElement("td");
       let prisustva1=-1;
       for(let k=0;k<podaci.prisustva.length;k++){
        if(podaci.prisustva[k].index==indeksStudenta&&podaci.prisustva[k].sedmica==j+1){
            prisustva1=podaci.prisustva[k].predavanja+podaci.prisustva[k].vjezbe;
            break;
        }
       }

        let procenat=((prisustva1)/(podaci.brojPredavanjaSedmicno+podaci.brojVjezbiSedmicno))*100;
      // ako je prisustva ostao -1 procenat će biti negativan (nema uneseno prisustvo za ovog studenta) pa ćemo ćeliju ostaviti praznu u tom slučaju
      if(procenat>=0){
      const procenatTekst=document.createTextNode(`${procenat.toFixed(0)}%`);
       kolonaProcenat.appendChild(procenatTekst);}
       red.appendChild(kolonaProcenat);
     }
     const kolonaTabelice=document.createElement("td");
     const tabelica=document.createElement("table");
     tabelica.setAttribute('id','n');
     const red1=document.createElement("tr");
     const red2=document.createElement("tr");
     for(let i=0;i<podaci.brojPredavanjaSedmicno;i++){
        const kolonaPredavanja=document.createElement("td");
        const kolonaPredavanjaTekst=document.createTextNode(`P`);
        kolonaPredavanja.appendChild(kolonaPredavanjaTekst);
        red1.appendChild(kolonaPredavanja);
    
     }
    if(podaci.prisustva.filter(x=>x.index==indeksStudenta&&x.sedmica==trenutnaSedmica).length!=0){
        let p=-1,v=-1;
        for(let k=0;k<podaci.prisustva.length;k++){
            if(podaci.prisustva[k].index==indeksStudenta&&podaci.prisustva[k].sedmica==trenutnaSedmica){
                p=podaci.prisustva[k].predavanja;
                v=podaci.prisustva[k].vjezbe;
                break;
            }
           }
        for(let l=0;l<podaci.brojPredavanjaSedmicno;l++){
           const kolonaPrisustvaPred=document.createElement("td");
           kolonaPrisustvaPred.style.backgroundColor="lightcoral";
          kolonaPrisustvaPred.setAttribute('id',podaci.studenti[i].ime+"%"+podaci.studenti[i].index+"%"+trenutnaSedmica+"%"+"P%C");
            if(p>0){
                kolonaPrisustvaPred.style.backgroundColor="lightgreen";
                kolonaPrisustvaPred.setAttribute('id',podaci.studenti[i].ime+"%"+podaci.studenti[i].index+"%"+trenutnaSedmica+"%"+"P%Z");
            p--;}
       
            red2.appendChild(kolonaPrisustvaPred);
         }
         for(let l=0;l<podaci.brojVjezbiSedmicno;l++){
           const kolonaPrisustvaVjez=document.createElement("td");
            kolonaPrisustvaVjez.style.backgroundColor="lightcoral";
            //kolonaPrisustvaVjez.id="pc";
            kolonaPrisustvaVjez.setAttribute('id',podaci.studenti[i].ime+"%"+podaci.studenti[i].index+"%"+trenutnaSedmica+"%"+"V%C");
            console.log(trenutnaSedmica);
             if(v>0){
                kolonaPrisustvaVjez.setAttribute('id',podaci.studenti[i].ime+"%"+podaci.studenti[i].index+"%"+trenutnaSedmica+"%"+"V%Z");
                 kolonaPrisustvaVjez.style.backgroundColor="lightgreen";
             v--;}
        
             red2.appendChild(kolonaPrisustvaVjez);
          }
     }
     else{
        for(let l=0;l<podaci.brojPredavanjaSedmicno;l++){
            const kolonaPredav=document.createElement("td");
            kolonaPredav.setAttribute('id',podaci.studenti[i].ime+"%"+podaci.studenti[i].index+"%"+trenutnaSedmica+"%"+"P%N");
             red2.appendChild(kolonaPredav);
          }
          for(let l=0;l<podaci.brojVjezbiSedmicno;l++){
             const kolonaVjez=document.createElement("td");
             kolonaVjez.setAttribute('id',podaci.studenti[i].ime+"%"+podaci.studenti[i].index+"%"+trenutnaSedmica+"%"+"V%N");
              red2.appendChild(kolonaVjez);
           }
     }
     for(let i=0;i<podaci.brojVjezbiSedmicno;i++){
        const kolonaV=document.createElement("td");
        const kolonaVTekst=document.createTextNode(`V`);
        kolonaV.appendChild(kolonaVTekst);
        red1.appendChild(kolonaV);
     }
     
     tabelica.appendChild(red1);
     tabelica.appendChild(red2);
     tabelica.setAttribute("border", "1");
    kolonaTabelice.appendChild(tabelica);
    //kolonaTabelice.id="idd";
    red.appendChild(kolonaTabelice);
    for (let j = trenutnaSedmica; j < najvecaSedmica; j++) {
        const kolonaPris = document.createElement("td");
        let prisustva12=-1;
        for(let k=0;k<podaci.prisustva.length;k++){
         if(podaci.prisustva[k].index==indeksStudenta&&podaci.prisustva[k].sedmica==j+1){
             prisustva12=podaci.prisustva[k].predavanja+podaci.prisustva[k].vjezbe;
             break;
         }
        }
 
         let procenat1=((prisustva12)/(podaci.brojPredavanjaSedmicno+podaci.brojVjezbiSedmicno))*100;
       // ako je prisustva ostao -1 procenat će biti negativan (nema uneseno prisustvo za ovog studenta) pa ćemo ćeliju ostaviti praznu u tom slučaju
       if(procenat1>=0){
       const kolonaPrisTekst=document.createTextNode(`${procenat1.toFixed(0)}%`);
        kolonaPris.appendChild(kolonaPrisTekst);}
        red.appendChild(kolonaPris);
      }
     
    if(najvecaSedmica<15){
     const zadnjaKolona=document.createElement("td");
     red.appendChild(zadnjaKolona);}
     tabelaPrisustvoBody.appendChild(red);
    }
    tabelaPrisustva.appendChild(headTabele);
    tabelaPrisustva.appendChild(tabelaPrisustvoBody);

     divRef.appendChild(tabelaPrisustva);
     tabelaPrisustva.setAttribute("border", "1");
     tabelaPrisustva.setAttribute("border-collapse", "collapse");

     //ZADATAK 2
    // <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
     var linkIkonica = document.createElement('link');
     linkIkonica.rel = 'stylesheet';
     linkIkonica.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css';
     head.appendChild(linkIkonica);
     var dugmeLijevo = document.createElement("button");
    dugmeLijevo.innerHTML='<i class="fa-solid fa-arrow-left"></i>';
     dugmeLijevo.onclick = function () {
      prethodnaSedmica();
     };
    divRef.appendChild(dugmeLijevo);
    var dugmeDesno = document.createElement("button");
    dugmeDesno.innerHTML='<i class="fa-solid fa-arrow-right"></i>';
     dugmeDesno.onclick = function () {
      sljedecaSedmica();
     };
     dugmeDesno.style.float="right";
    divRef.appendChild(dugmeDesno);
    }
}

    let sljedecaSedmica = function () {
     if(trenutnaSedmica!=najvecaSedmica||flegTekIscrtana==1){
        flegTekIscrtana=0;
    trenutnaSedmica++;
    iscrtajTabelu();
     }
    }
    let prethodnaSedmica = function () {
    if(trenutnaSedmica>1){
        flegTekIscrtana=0;
    trenutnaSedmica--;
    iscrtajTabelu();}
    }
    return {
    sljedecaSedmica: sljedecaSedmica,
    prethodnaSedmica: prethodnaSedmica,
    iscrtajTabelu: iscrtajTabelu
    }
    };