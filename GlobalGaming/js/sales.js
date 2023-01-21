(async function () {
  countDownElement = await fetch("http://localhost:8000/api/countdown/all")
  .then(response => response.json())
  countDownElement = countDownElement[0]
  countDownTime = countDownElement.countdownZeit

  
  const second = 1000,
    minute = second * 60,
    hour = minute * 60,
    day = hour * 24;


  let today = new Date()
  today = today.getTime()

  salesEnd = today + hour*countDownTime


  
  const countDown = new Date(salesEnd).getTime(),
    x = setInterval(function() {    

      const now = new Date().getTime(),
        // Zum Testen ob countdown funktioniert
        // extraTime = (minute * 59) + (hour * 61) + (second*50)
        // distance = countDown - now - extraTime ;
        distance = countDown - now // beim Testen diese zeile rauskommentieren
        document.getElementById("days").innerText = Math.floor(distance / day),
        document.getElementById("hours").innerText = Math.floor((distance % (day)) / (hour)),
        document.getElementById("minutes").innerText = Math.floor((distance % (hour)) / (minute)),
        document.getElementById("seconds").innerText = Math.floor((distance % (minute)) / second);

      //do something later when date is reached
      if (distance < 0) {
        clearInterval(x)
        fetch("http://localhost:8000/api/countdown/delete/"+countDownElement.id)
        window.location.assign("Sales.html")
      }
      //seconds
    }, 0)
}());



const salesArr = [];
const swArr = [];
const hwArr = [];
const produktsArr = [];
const salesCont = document.getElementById('salesCont')
const dealsNewPrice = document.getElementById("salesNewPrice")
const dealsOldPrice = document.getElementById("salesOldPrice")
const dealsButton = document.getElementById("dealsButton")
const dealsTitle = document.getElementById("dealsTitle")
const dealsImage = document.getElementById("salesImage")

document.getElementById("buyBtn").addEventListener("click", function(){
  fetch("http://localhost:8000/api/warenkorb/add/4")
})

fetch("http://localhost:8000/api/software/all")
.then(response => response.json())
.then(softwareData => {

  softwareData.forEach(element => {
      swArr.push(parseInt(element.id))
  });
})

fetch("http://localhost:8000/api/hardware/all")
.then(response => response.json())
.then(softwareData => {

  softwareData.forEach(element => {
      hwArr.push(parseInt(element.id))
  });
})

async function getAllsales(){
  var countdown =  await fetch("http://localhost:8000/api/countdown/all")
  .then(response => response.json())
  countdown = countdown[0]
  
fetch('http://localhost:8000/api/sale/all')
  .then(response => response.json())
  .then(rData=>{    
    
    if(rData.length >= 1){
      limit = 6;
      if(rData.length < 6){
        limit = rData.length
      }
      for (let i=0; i<limit; i++){
        salesArr.push(rData[i])

        
      fetch('http://localhost:8000/api/produkt/get/'+rData[i].produktId)
      .then(response => response.json())
      .then(responseData => {
        pID = parseInt(rData[i].produktId);
        produktsArr.push(responseData)
        image = responseData.bildpfad;
        oldPrice = responseData.nettoPreis;
        percentage = (rData[i].saleProzent /100)
        newPrice = oldPrice - (oldPrice * percentage)
        if(rData[i].id == countdown.id){
          newPrice -= (newPrice / 100) * countdown.extraProzent
        }

        if(swArr.includes(pID)){
          salesCont.innerHTML += ' <div class="itemContainer" >    <button id="'+pID+'"> <img src="'+image+'" alt=""  class="shadow" ></button> <del><p>'+oldPrice+' €</p></del>    <p>'+newPrice.toFixed(2)+' €</p> </div>';    
        }
        else{
          document.getElementById('HardwareSalesContent').innerHTML += ' <div class="itemContainer" >    <button id="'+pID+'"> <img src="'+image+'" alt=""  class="shadow" ></button> <del><p>'+oldPrice+' €</p></del>    <p>'+newPrice.toFixed(2)+' €</p> </div>';    
        }
        

        

        buttons = document.getElementsByTagName("button");
                
          for (let i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener("click", function() {
              
              if(buttons[i].id != "buyBtn"){
                pID = buttons[i].id;
                console.log("sessionStorage="+sessionStorage.getItem("PID"))
                sessionStorage.setItem("PID",pID)
                fetch('http://localhost:8000/api/software/all/')
                .then(response => response.json())
                .then(swResponse => {
                  for(let i=0; i<swResponse.length; i++){
                    if(pID == swResponse[i].id){
                      window.location.assign("SingleArticlePage.html")
                    }
                  }
                  
                })
                fetch('http://localhost:8000/api/hardware/all/')
                .then(response => response.json())
                .then(hwResponse => {
                  for(let i=0; i<hwResponse.length; i++){
                    if(pID == hwResponse[i].id){
                      window.location.assign("SingleArticlePageHardware.html")
                    }
                  }
                })   
              }
            });
          }
        })
      }
    }
  })
}


async function getDeals(){
  await fetch("http://localhost:8000/api/countdown/all")
  .then(response => response.json())
  .then(responseData => {
    let countdown = responseData[0]
    fetch("http://localhost:8000/api/sale/get/"+countdown.id)
    .then(response => response.json())
    .then(responseData => {
      let sale = responseData
      fetch("http://localhost:8000/api/produkt/get/"+sale.produktId)
      .then(response => response.json())
      .then(responseData => {
        produkt = responseData
        let newPrice = produkt.nettoPreis- (produkt.nettoPreis /100) * sale.saleProzent
        newPrice -= (newPrice / 100) * countdown.extraProzent

        dealsOldPrice.innerText = produkt.nettoPreis
        dealsNewPrice.innerText = newPrice.toFixed(2)
        dealsTitle.innerHTML = produkt.titel;
        dealsImage.src = produkt.bildpfad
        
        dealsImage.addEventListener("click", function(){
          sessionStorage.setItem("PID",produkt.id)
          console.log(p= produkt.id)
          if(swArr.includes(produkt.id)){
          window.location.assign("singleArticlePage.html")
          }
          else{
            window.location.assign("singleArticlePageHardware.html")
          }
        })

       })
    })
  })
  

  
}



getAllsales();
getDeals();