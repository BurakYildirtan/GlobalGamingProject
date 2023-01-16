const pTitle = document.getElementById("produktTitle");
const pImage = document.getElementById("articleImage");
const pPlayer = document.getElementById("pCount");
const pGenre = document.getElementById("genre");
const pFSK = document.getElementById("fsk");
const pPrice = document.getElementById("price");
const pID = sessionStorage.getItem("PID");
const simArt = document.getElementById("simArt");


var minReq;
var maxReq;

var minCpu;
var maxCpu;
var minGpu;
var maxGpu;
var minRam;
var maxRam;

var articleGenre;

var salesArr;

async function loadValuesWithID(id){
   document.getElementById("buyBtn").addEventListener("click", function(){
      fetch("http://localhost:8000/api/warenkorb/add/"+id)
   })
   document.getElementById("addMinCPU").addEventListener("click", function(){
      reqID = parseInt(minCpu.id)
      fetch("http://localhost:8000/api/warenkorb/add/"+reqID)
   })
   document.getElementById("addMaxCPU").addEventListener("click", function(){
      reqID = parseInt(maxCpu.id)
      fetch("http://localhost:8000/api/warenkorb/add/"+reqID)
   })
   
   document.getElementById("addMinGPU").addEventListener("click", function(){
      reqID = parseInt(minGpu.id)
      fetch("http://localhost:8000/api/warenkorb/add/"+reqID)
   })
   document.getElementById("addMaxGPU").addEventListener("click", function(){
      reqID = parseInt(maxGpu.id)
      fetch("http://localhost:8000/api/warenkorb/add/"+reqID)
   })
   
   document.getElementById("addMinRAM").addEventListener("click", function(){
      reqID = parseInt(minRam.id)
      fetch("http://localhost:8000/api/warenkorb/add/"+reqID)
   })
   document.getElementById("addMaxRAM").addEventListener("click", function(){
      reqID = parseInt(maxRam.id)
      fetch("http://localhost:8000/api/warenkorb/add/"+reqID)
   })
   await fetch('http://localhost:8000/api/produkt/get/'+id)
   .then(response => response.json())
   .then(responseData => {
      var image = responseData.bildpfad;
      var title = responseData.titel;
      
         fetch('http://localhost:8000/api/sale/all')
         .then(response => response.json())
         .then(salesData => {
            salesArr = salesData;
            sale = salesData.filter(obj => obj.produktId == id)
            if(sale.length >0){
               sale = sale[0]
               oldPrice = responseData.nettoPreis;
               percentage = (sale.saleProzent /100)
               price = oldPrice - (oldPrice * percentage)
               pPrice.innerHTML = '<h4 class="priceText" id="price">'+price.toFixed(2)+'</h4>'
               console.log("Price with discount="+price.toFixed(2))
            }
            else{
               console.log("No Sales for Produkt with ID="+id+" available")
               pPrice.innerHTML = '<h4 class="priceText" id="price">'+responseData.nettoPreis+'</h4>'
            }
            
         });
      
     
      

      pImage.src = image
      pTitle.innerHTML = '<h4 class="articleText articleTitleText" id="produktTitle">'+title+'</h4>'
      
   });

 


    await fetch('http://localhost:8000/api/software/all')
    .then(response => response.json())
    .then(responseData => {
     software = responseData.filter(obj => obj.id == id)[0];
     pGenre.innerText = software.genre;
     pFSK.innerText = software.fsk;
     pPlayer.innerText = 1+"-"+software.spielerAnzahl
     minReq = software.minRequirements;
     maxReq = software.recRequirements;

     articleGenre = software.genre
    });

    await fetch("http://localhost:8000/api/hardware/all")
    .then(response => response.json())
    .then(responseData => {

     gpus = responseData.filter(obj => obj.art == "grafikkarte").sort(function(a,b){
      return a.leistung-b.leistung;
     });
     cpus = responseData.filter(obj => obj.art == "prozessor").sort(function(a,b){
      return a.leistung-b.leistung;
     });
     rams = responseData.filter(obj => obj.art == "arbeitsspeicher").sort(function(a,b){
      return a.leistung-b.leistung;
     });

     minGpu = gpus.filter(obj => obj.leistung >= minReq).sort(function(a,b){
      return a.leistung-b.leistung;
     })[0]
     maxGpu = gpus.filter(obj => obj.leistung >= maxReq).sort(function(a,b){
      return a.leistung-b.leistung;
     })[0]

     minRam = rams.filter(obj => obj.leistung >= minReq).sort(function(a,b){
      return a.leistung-b.leistung;
     })[0]
     maxRam = rams.filter(obj => obj.leistung >= maxReq).sort(function(a,b){
      return a.leistung-b.leistung;
     })[0]

     minCpu = cpus.filter(obj => obj.leistung >= minReq).sort(function(a,b){
      return a.leistung-b.leistung;
     })[0]
     maxCpu = cpus.filter(obj => obj.leistung >= maxReq).sort(function(a,b){
      return a.leistung-b.leistung;
     })[0]


    });

    await fetch('http://localhost:8000/api/produkt/all')
    .then(response => response.json())
    .then(responseData => {
     for(let i=0; i<responseData.length; i++){
      if(responseData[i].id == minCpu.id){
         document.getElementById("minCPU").innerText = responseData[i].titel;
      }
      if(responseData[i].id == maxCpu.id){
         document.getElementById("maxCPU").innerText= responseData[i].titel;
      }
      if(responseData[i].id == minGpu.id){
         document.getElementById("minGPU").innerText= responseData[i].titel;
      }
      if(responseData[i].id == maxGpu.id){
         document.getElementById("maxGPU").innerText= responseData[i].titel;
      }
      if(responseData[i].id == minRam.id){
         document.getElementById("minRAM").innerText= responseData[i].titel;
      }
      if(responseData[i].id == maxRam.id){
         document.getElementById("maxRAM").innerText= responseData[i].titel;
      }
     }
    });

    await fetch("http://localhost:8000/api/software/all")
    .then(response => response.json())
    .then(responseData => {
      responseData = responseData.filter(obj => obj.genre == articleGenre )

      limit = 6
      if(responseData.length < 6){
         limit = responseData.length
      }
      
      for(let i=0; i<limit; i++){
         
         pidLoop = responseData[i].id;
         isSale = false
         fetch("http://localhost:8000/api/produkt/get/"+pidLoop)
         .then(response => response.json())
         .then(pData =>{
            
            aName = pData.titel;
            aPrice = pData.nettoPreis;
            aImage = pData.bildpfad;

            salesArr.forEach(element => {
               if(element.produktId == pData.id)    {
                   isSale = true
                   percentage = element.saleProzent / 100;
                   newPrice = pData.nettoPreis - (pData.nettoPreis * percentage)
                   newPrice = newPrice.toFixed(2)
                   simArt.innerHTML += '<div class="cSimilarArticle"> <div class="cSimilarArticlePic"> <button class="articleBtn" id="'+responseData[i].id+'" ><img  class="similarArticlePic"src="'+aImage+'"> </div> <span class="spanSimilarTitleText">'+aName+'</span> <span class="spanSimilarPriceBefore"></span> <span class="spanSimilarPriceAfter">'+newPrice+' €</span> </div>'
               }
              
               });
       
               if(isSale == false){
                   simArt.innerHTML += '<div class="cSimilarArticle"> <div class="cSimilarArticlePic"> <button class="articleBtn" id="'+responseData[i].id+'" ><img  class="similarArticlePic"src="'+aImage+'"> </div> <span class="spanSimilarTitleText">'+aName+'</span> <span class="spanSimilarPriceBefore"></span> <span class="spanSimilarPriceAfter">'+aPrice+' €</span> </div>'
               }
           buttons = document.getElementsByClassName("articleBtn")
          
           for (let j = 0; j < buttons.length; j++) {
            if(buttons[j].id != "buyBtn"){ 
            buttons[j].addEventListener("click", function() {
                  pidBtn = buttons[j].id;
                  sessionStorage.setItem("PID",pidBtn);
                  window.location.assign("SingleArticlePage.html")
              });
            }
              
            }
         })
         
      }

   
    })

}



loadValuesWithID(pID);
