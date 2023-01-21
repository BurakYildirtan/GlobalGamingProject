


const pcontent = document.getElementById("warenkorbcontent");
var image = "pics/cpu.jpeg"
var articlename;
var priceValues;
var anzahlc = 1
var warenkorbInhalt = []

var zahlungsart ="Sofortüberweisung";
var totalAmount = 0;

var allProducts = [];
var allWarenkorb = [];
var allSales = [];

var count = document.getElementById("count");
var price = document.getElementById("SumValue");
var addButton = document.querySelectorAll(".moreButton");
var subtractButton = document.querySelectorAll(".lessButton");
var priceValue = 0;

var buyNowButton = document.querySelector(".buyNowButton");
buyNowButton.addEventListener("click", function() {
   
    var modal = document.createElement("div");
    modal.classList.add("modal");
    modal.innerHTML = `
        <div class="modal-content">
            <p>Thank you for your purchase with `+zahlungsart+`!</p>
            <p>The total amount is: <span id="SumValue">`+totalAmount.toFixed(2)+`</span></p>
            <button id="close-modal">Close</button>
        </div>
    `;
    document.body.appendChild(modal);

   
    modal.style.display = "block";
    modal.style.position = "fixed";
    modal.style.top = "50%";
    modal.style.left = "50%";
    modal.style.transform = "translate(-50%, -50%)";

   
    var closeModalButton = document.querySelector("#close-modal");
    closeModalButton.addEventListener("click", function() {
        modal.remove();
    });
});

var cPayments = document.querySelector(".cPayments");

var paymentMethods = ["VISA", "Sofortüberweisung", "Direkt", "Paypal", "Bitcoin"];

cPayments.addEventListener("click", function() {
    
    var modal = document.createElement("div");
    modal.classList.add("modal");
    modal.innerHTML = `
        <div class="modal-content">
            <p>Please select a payment method:</p>
            <select id="payment-options">
                ${paymentMethods.map(function(method) {
                    return `<option value="${method}">${method}</option>`
                }).join('')}
            </select>
            <button id="select-payment">Select</button>
            <button id="close-modal">Close</button>
        </div>
    `;
    document.body.appendChild(modal);

   
    modal.style.display = "block";
    modal.style.position = "fixed";
    modal.style.top = "50%";
    modal.style.left = "50%";
    modal.style.transform = "translate(-50%, -50%)";


    var selectcPayments = document.querySelector("#select-payment");
    selectcPayments.addEventListener("click", function() {
        var selectedOption = document.querySelector("#payment-options").value;
		zahlungsart = selectedOption
        alert(`You have selected ${selectedOption} as your payment method.`);
    });

    
    var closeModalButton = document.querySelector("#close-modal");
    closeModalButton.addEventListener("click", function() {
        modal.remove();
    });
	});

    async function loadPage(){
        var warenkorbUnique = []
        await fetch("http://localhost:8000/api/warenkorb/all")
        .then(response => response.json())
        .then(data => {
            allWarenkorb = data;
        })      
        await fetch("http://localhost:8000/api/produkt/all")
        .then(response => response.json())
        .then(data => {
            allProducts = data;
        })      
        await fetch("http://localhost:8000/api/sale/all")
        .then(response => response.json())
        .then(responseData => {
            allSales = responseData;
        })
        
        allWarenkorb.forEach(el =>{
            
            if(warenkorbUnique.some(item => item.produktId == el.produktId) == false)
            {
                warenkorbUnique.push(el)
            }
            
        })

        
        warenkorbUnique.forEach(el => {
            produkt = allProducts.filter(item => item.id == el.produktId)[0]
            amount = allWarenkorb.filter(item => item.produktId == el.produktId).length
            image = produkt.bildpfad
            articlename = produkt.titel
            priceValues = produkt.nettoPreis
            allSales.forEach(saleItem =>{
                if(el.produktId == saleItem.produktId){
                    priceValues -= priceValues * saleItem.saleProzent /100  
                }
            })
            totalAmount += priceValues * amount
            pcontent.innerHTML += '<div class="cArticle"> <div class="cCancel"> <button class=" articleButton cancelButton">X</button> </div>  <div class="cPicture"> <img  class="imgArticle" src="'+image+'" alt="articlePicture" width="220px" height="200px"/>  </div>  <!-- Beschreibung --> <div class="cDescription"> <div class="cDescriptionTitle"> <h4 class="productTitle articleText">'+articlename+'</h4> </div> <p class="articleText articlePriceText" id="priceOf'+produkt.id+'">'+priceValues.toFixed(2)+'€</p> <!-- Anzahl --> <div class="cQuantity">  <div class="cQuantityText"> <p class="articleText quantityText">Anzahl : </p>  <p class="articleText quantityText"  data-count="count" id="'+produkt.id+'">'+amount+'</p> </div> <button class="articleButton moreButton"  id="add'+produkt.id+'">+</button> <button class="articleButton lessButton" id="subtract'+produkt.id+'">-</button> </div> </div> </div>'
            price.innerText = totalAmount.toFixed(2)
        })
        addButton = document.querySelectorAll(".moreButton");
        addButton.forEach(button => {
            button.addEventListener("click", function() {
                var article = button.closest(".cArticle");
                var count = article.querySelector('[data-count="count"]');
                count.innerText = parseInt(count.innerText) + 1;
                totalAmount += parseFloat(article.querySelector(".articlePriceText").innerText);	
                price.innerText = totalAmount.toFixed(2) + " €";
                produktId = article.querySelector('[data-count="count"]').id
                fetch("http://localhost:8000/api/warenkorb/add/"+produktId)
                });
            });
            subtractButton = document.querySelectorAll(".lessButton");
            subtractButton.forEach(button => {
                button.addEventListener("click", function() {
                    var article = button.closest(".cArticle");
                    var count = article.querySelector('[data-count="count"]');
                    if (parseInt(count.innerText) >= 1) {
                        count.innerText = parseInt(count.innerText) - 1;
                        totalAmount -= parseFloat(article.querySelector(".articlePriceText").innerText);
                        price.innerText = totalAmount.toFixed(2) + " €"; 
                        produktId = article.querySelector('[data-count="count"]').id
                        fetch("http://localhost:8000/api/warenkorb/reduce/"+produktId)
                        }
                    if(parseInt(count.innerText) == 0){
                         this.parentElement.parentElement.parentElement.remove();
                    }
                    });
                    
                    
                });

            var cancelButtons = document.querySelectorAll(".cancelButton");
            cancelButtons.forEach(button => {
                button.addEventListener("click", function() {
                    var article = button.closest(".cArticle");
                    var count = parseInt(article.querySelector('[data-count="count"]').innerText);
                    var articlePrice = parseFloat(article.querySelector(".articlePriceText").innerText)
                    totalAmount -=  articlePrice * count;	
                    price.innerText = totalAmount.toFixed(2) + " €";
                    produktId = article.querySelector('[data-count="count"]').id
                    fetch("http://localhost:8000/api/warenkorb/delete/"+produktId)
                    this.parentElement.parentElement.remove();
            })
        })

        

    }

    
		

    





    loadPage()