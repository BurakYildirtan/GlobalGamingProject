const pTitle = document.getElementById("produktTitle");
const pImage = document.getElementById("articleImage");
const pBrand = document.getElementById("brand");
const pPrice = document.getElementById("price");
const pID =  sessionStorage.getItem("PID");



const simArt = document.getElementById("simArt");

var articleArt ;
var salesArr

async function loadValuesWithID(id){
    document.getElementById("buyBtn").addEventListener("click", function(){
        fetch("http://localhost:8000/api/warenkorb/add/"+id)
     })
   await fetch('http://localhost:8000/api/produkt/get/'+id)
   .then(response => response.json())
   .then(responseData => {
      var image = responseData.bildpfad;
      var title = responseData.titel;
      
         fetch('http://localhost:8000/api/sale/all')
         .then(response => response.json())
         .then(salesData => {
            salesArr = salesData
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



    await fetch('http://localhost:8000/api/hardware/all')
    .then(response => response.json())
    .then(responseData => {
        hardware = responseData.filter(obj => obj.id == id)[0];
        pBrand.innerText = hardware.hersteller;
        articleArt = hardware.art;
    });


    
    await fetch("http://localhost:8000/api/hardware/all")
    .then(response => response.json())
    .then(responseData => {
        responseData = responseData.filter(obj => obj.art == articleArt )
      limit = 6
      if(responseData.length < 6){
         limit = responseData.length
      }
      
      for(let i=0; i<limit; i++){
         pidLoop = responseData[i].id;
         
         fetch("http://localhost:8000/api/produkt/get/"+pidLoop)
         .then(response => response.json())
         .then(pData =>{
            isSale = false
            aName = pData.titel;
            aPrice = pData.nettoPreis;
            aImage = pData.bildpfad;
   
            salesArr.forEach(element => {
                if(element.produktId == pData.id)    {
                    isSale = true
                    percentage = element.saleProzent / 100;
                    newPrice = pData.nettoPreis - (pData.nettoPreis * percentage)
                    newPrice = newPrice.toFixed(2)
                    simArt.innerHTML += '<div class="cSimilarArticle"> <div class="cSimilarArticlePic"> <button class="articleClass" id="'+responseData[i].id+'" ><img  class="similarArticlePic"src="'+aImage+'"> </div> <span class="spanSimilarTitleText">'+aName+'</span> <span class="spanSimilarPriceBefore"></span> <span class="spanSimilarPriceAfter">'+newPrice+' €</span> </div>'
                }
                
                });
        
                if(isSale == false){
                    simArt.innerHTML += '<div class="cSimilarArticle"> <div class="cSimilarArticlePic"> <button class="articleClass" id="'+responseData[i].id+'" ><img  class="similarArticlePic"src="'+aImage+'"> </div> <span class="spanSimilarTitleText">'+aName+'</span> <span class="spanSimilarPriceBefore"></span> <span class="spanSimilarPriceAfter">'+aPrice+' €</span> </div>'
                }
           buttons = document.getElementsByClassName("articleClass")
          
           for (let j = 0; j < buttons.length; j++) {
               
              buttons[j].addEventListener("click", function() {
                if(buttons[j].id != "buyBtn"){
                 
                  pidBtn = buttons[j].id;
                  sessionStorage.setItem("PID",pidBtn);
                  window.location.assign("SingleArticlePageHardware.html")
                }
            
              });
              
            }
         })
         
      }

   
    })
}



loadValuesWithID(pID);


