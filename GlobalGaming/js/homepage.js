const sales = document.getElementById("homepageSales")
const highlight = document.getElementById("homepageHighlights")
var salesArr = [];

async function getAllSales(){
  countdown = await fetch("http://localhost:8000/api/countdown/all")
    .then(response => response.json())
    countdown = countdown[0]

  await fetch("http://localhost:8000/api/sale/all")
.then(response => response.json())
.then(salesData => {
    
    salesArr = salesData;
    limit = 6;
    if (salesData.length < limit){
        limit = salesData.length
    }
    for(let i=0; i<limit; i++) { 
       fetch("http://localhost:8000/api/produkt/get/"+salesData[i].produktId)
       .then(response => response.json())
       .then(produktData => {
            element = salesData[i]
            percentage = element.saleProzent / 100;
            newPrice = produktData.nettoPreis - (produktData.nettoPreis * percentage)
            if(element.id == countdown.id){
              newPrice -= (newPrice / 100) * countdown.extraProzent
            }
            newPrice = newPrice.toFixed(2)
            
            sales.innerHTML += '<div class="itemContainer"><button class="articleButton" id="'+produktData.id+'"> <img src="'+produktData.bildpfad+'" alt="" width="180" height="220"> </button> <del><p>'+produktData.nettoPreis+'€</p></del> <p>'+newPrice+'€</p> </div>'
            buttons = document.getElementsByClassName("articleButton")
            for(let i=0; i<buttons.length; i++){
            
                    buttons[i].addEventListener("click", function() {         
                        
                        pidBtn =   parseInt(buttons[i].id)
                        console.log(pidBtn)
                        sessionStorage.setItem("PID",parseInt(buttons[i].id));
                        fetch('http://localhost:8000/api/software/all/')
                        .then(response => response.json())
                        .then(swResponse => {
                          for(let i=0; i<swResponse.length; i++){
                            
                            if(pidBtn == swResponse[i].id){
                               window.location.assign("SingleArticlePage.html")
                            }
                          }
                          
                        })
                        fetch('http://localhost:8000/api/hardware/all/')
                        .then(response => response.json())
                        .then(hwResponse => {
                          for(let i=0; i<hwResponse.length; i++){
                            
                            if(pidBtn == hwResponse[i].id){
                              window.location.assign("SingleArticlePageHardware.html")
                            }
                          }
                          
                        })
                    })
                
                
            }
       })
    };
})
}
async function getAllHighlights(){
fetch("http://localhost:8000/api/produkt/all")
.then(response => response.json())
.then(produktData => {
    
    limit = 6;
    if (produktData.length < limit){
        limit = produktData.length
    }
    for(let i=0; i<limit; i++) {
        produktID = produktData[i].id
        console.log("produktID ="+produktID)
        var isSale = false;
        
        salesArr.forEach(element => {
        
        if(element.produktId == produktID)    {
            isSale = true
            percentage = element.saleProzent / 100;
            newPrice = produktData[i].nettoPreis - (produktData[i].nettoPreis * percentage)
            newPrice = newPrice.toFixed(2)
            highlight.innerHTML += '<div class="itemContainer"><button class="articleButton" id="'+produktID+'"> <img src="'+produktData[i].bildpfad+'" alt="" width="180" height="220"> </button> <del><p>'+produktData[i].nettoPreis+'€</p></del> <p>'+newPrice+'€</p> </div>'
        }
       
        });

        if(isSale == false){
            
            highlight.innerHTML += '<div class="itemContainer"> <button class="articleButton" id="'+produktID+'"> <img src="'+produktData[i].bildpfad+'" alt="" width="180" height="220"></button> <p>'+produktData[i].nettoPreis+'€</p> </div>'
        }
        
        
        
    };
    buttons = document.getElementsByClassName("articleButton")
for(let i=0; i<buttons.length; i++){

        buttons[i].addEventListener("click", function() {         
            
            pidBtn =   parseInt(buttons[i].id)
            console.log(pidBtn)
            sessionStorage.setItem("PID",parseInt(buttons[i].id));
            fetch('http://localhost:8000/api/software/all/')
            .then(response => response.json())
            .then(swResponse => {
              for(let i=0; i<swResponse.length; i++){
                
                if(pidBtn == swResponse[i].id){
                   window.location.assign("SingleArticlePage.html")
                }
              }
              
            })
            fetch('http://localhost:8000/api/hardware/all/')
            .then(response => response.json())
            .then(hwResponse => {
              for(let i=0; i<hwResponse.length; i++){
                
                if(pidBtn == hwResponse[i].id){
                  window.location.assign("SingleArticlePageHardware.html")
                }
              }
              
            })
        })
    
    
}
    
})
}

getAllHighlights();
getAllSales();