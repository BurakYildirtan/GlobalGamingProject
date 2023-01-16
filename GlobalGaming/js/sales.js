(function () {
  const second = 1000,
    minute = second * 60,
    hour = minute * 60,
    day = hour * 24;


  let today = new Date()
  today = today.getTime()
  salesEnd = today + hour*10


  
  const countDown = new Date(salesEnd).getTime(),
    x = setInterval(function() {    

      const now = new Date().getTime(),
        distance = countDown - now;


        document.getElementById("hours").innerText = Math.floor((distance % (day)) / (hour)),
        document.getElementById("minutes").innerText = Math.floor((distance % (hour)) / (minute)),
        document.getElementById("seconds").innerText = Math.floor((distance % (minute)) / second);

      //do something later when date is reached
      if (distance < 0) {
        document.getElementById("countdown").style.display = "none";
        document.getElementById("content").style.display = "block";
        clearInterval(x);
      }
      //seconds
    }, 0)
}());

document.getElementById("buyBtn").addEventListener("click", function(){
  fetch("http://localhost:8000/api/warenkorb/add/4")

})

const salesArr = [];
const swArr = [];
const hwArr = [];
const produktsArr = [];
const salesCont = document.getElementById('salesCont')
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

fetch('http://localhost:8000/api/sale/all')

  .then(response => response.json())
  .then(rData=>{    
    if(rData.length >= 1){
      for (let i=0; i<rData.length; i++){
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
   
