let TabelaPrisustvo = function (divRef, podaci) {
    //privatni atributi modula
    let trenutnaSedmica=-3;
    let najvecaSedmica=-1;
    //implementacija metoda
    divRef.innerHTML = "";
    var head = document.getElementsByTagName('HEAD')[0];
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = '../css/prisustvo.css';
    head.appendChild(link);
    //VALIDACIJA
   //1. Broj prisustva na predavanju/vježbi je veći od broja predavanja/vježbi sedmično
   //2. Broj prisustva je manji od nule
   iscrtajTabelu();
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
    var tag1=document.createTextNode("Podaci o prisustvu nisu validni!")
    divRef.appendChild(tag1);
}
else{
    var tag1=document.createElement("h1")
    var text=document.createTextNode(podaci.predmet)
    tag1.appendChild(text);
    divRef.appendChild(tag1);
   let studenti=podaci.studenti;
   const tbl = document.createElement("table");
   const headTabele=document.createElement("thead");
   const red=document.createElement("tr");
    for(let i=0;i<podaci.prisustva.length;i++){
      if(podaci.prisustva[i].sedmica>najvecaSedmica ){
        najvecaSedmica=podaci.prisustva[i].sedmica;
      }
   }
   if(trenutnaSedmica==-3)
   trenutnaSedmica=najvecaSedmica;
   const kolona1=document.createElement("th");
 const tekstKolone1=document.createTextNode(`Ime i prezime`);
 kolona1.appendChild(tekstKolone1);
 red.appendChild(kolona1);
 const kolona2=document.createElement("th");
 const tekstKolone2=document.createTextNode(`Indeks`);
 kolona2.appendChild(tekstKolone2);
 red.appendChild(kolona2);

let rimski=["I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII","XIII","XIV","XV"];
for(let i=0;i<najvecaSedmica;i++){
 const kolona=document.createElement("th");
 const tekstKolone=document.createTextNode(`${rimski[i]}`);
 kolona.appendChild(tekstKolone);
 red.appendChild(kolona);
   }
   if(trenutnaSedmica+1!=15){
   const kolona=document.createElement("th");
   const tekstKolone=document.createTextNode(`${rimski[najvecaSedmica]} - XV`);
   kolona.appendChild(tekstKolone);
   red.appendChild(kolona);}
   headTabele.appendChild(red);
   const tblBody = document.createElement("tbody");
 

   for (let i = 0; i < podaci.studenti.length; i++) {
     const row = document.createElement("tr");
     const c=document.createElement("td");
     const ct=document.createTextNode(`${podaci.studenti[i].ime}`);
     c.appendChild(ct);
     row.appendChild(c);
     const c1=document.createElement("td");
     const ct1=document.createTextNode(`${podaci.studenti[i].index}`);
     c1.appendChild(ct1);
     row.appendChild(c1);
     let indeksStudenta=podaci.studenti[i].index;
     for (let j = 0; j < trenutnaSedmica-1; j++) {
       const cell = document.createElement("td");
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
      const cellText=document.createTextNode(`${procenat}%`);
       cell.appendChild(cellText);}
       row.appendChild(cell);
     }
     const cell3=document.createElement("td");
     const tabelica=document.createElement("table");
     const red1=document.createElement("tr");
     const red2=document.createElement("tr");
     for(let i=0;i<podaci.brojPredavanjaSedmicno;i++){
        const cellm=document.createElement("td");
        const cellt=document.createTextNode(`P`);
        cellm.appendChild(cellt);
        red1.appendChild(cellm);
    
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
        for(let i=0;i<podaci.brojPredavanjaSedmicno;i++){
           const cellm=document.createElement("td");
           cellm.style.backgroundColor="lightcoral";
            if(p>0){
                cellm.style.backgroundColor="lightgreen";
            p--;}
       
            red2.appendChild(cellm);
         }
         for(let i=0;i<podaci.brojVjezbiSedmicno;i++){
            const cellm=document.createElement("td");
            cellm.style.backgroundColor="lightcoral";
             if(v>0){
                 cellm.style.backgroundColor="lightgreen";
             v--;}
        
             red2.appendChild(cellm);
          }
     }
     else{
        for(let i=0;i<podaci.brojPredavanjaSedmicno;i++){
            const cellm=document.createElement("td");
             red2.appendChild(cellm);
          }
          for(let i=0;i<podaci.brojVjezbiSedmicno;i++){
             const cellm=document.createElement("td");
              red2.appendChild(cellm);
           }
     }
     for(let i=0;i<podaci.brojVjezbiSedmicno;i++){
        const cellm=document.createElement("td");
        const cellt=document.createTextNode(`V`);
        cellm.appendChild(cellt);
        red1.appendChild(cellm);
     }
     
     tabelica.appendChild(red1);
     tabelica.appendChild(red2);
     tabelica.setAttribute("border", "1");
    cell3.appendChild(tabelica);
    row.appendChild(cell3);
    for (let j = trenutnaSedmica; j < najvecaSedmica; j++) {
        const cell12 = document.createElement("td");
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
       const cellText12=document.createTextNode(`${procenat1}%`);
        cell12.appendChild(cellText12);}
        row.appendChild(cell12);
      }
    
     const cellm=document.createElement("td");
     row.appendChild(cellm);
     tblBody.appendChild(row);
    }
    tbl.appendChild(headTabele);
    tbl.appendChild(tblBody);

     divRef.appendChild(tbl);
     tbl.setAttribute("border", "1");
     tbl.setAttribute("border-collapse", "collapse");

     //ZADATAK 2
    // <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
     var link1 = document.createElement('link');
     link1.rel = 'stylesheet';
     link1.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css';
     head.appendChild(link1);
     var btn = document.createElement("button");
    btn.innerHTML='<i class="fa-solid fa-arrow-left"></i>';
     btn.onclick = function () {
      prethodnaSedmica();
     };
    divRef.appendChild(btn);
    var btn1 = document.createElement("button");
    btn1.innerHTML='<i class="fa-solid fa-arrow-right"></i>';
     btn1.onclick = function () {
      sljedecaSedmica();
     };
     btn1.style.float="right";
    divRef.appendChild(btn1);
    }
}

    let sljedecaSedmica = function () {
     if(trenutnaSedmica!=najvecaSedmica){
    trenutnaSedmica++;
    iscrtajTabelu();
     }
    }
    let prethodnaSedmica = function () {
    if(trenutnaSedmica>1){
    trenutnaSedmica--;
    iscrtajTabelu();}
    }
    return {
    sljedecaSedmica: sljedecaSedmica,
    prethodnaSedmica: prethodnaSedmica
    }
    };