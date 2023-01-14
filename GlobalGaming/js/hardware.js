
window.addEventListener("load", function(){
    loadElements() 
});


async function loadElements() {

    //JSON Responses from AJAX call
    let productJSON = await getAllHardware()
    let saleJSON = await getAllSale()
    productJSON.array.forEach(elementP => {
        saleJSON.array.forEach(elementS => {
            if (elementP.id === elementS.id){
                elementP.nettoPreis = (1-elementS.saleProzent/100)*elementP.nettoPreis
            }
        });
        createItem(elementP)
    });

};

//Laden von tabllen

async function getAllSale() {

    let sale =  await $.ajax({
        url: 'http://localhost:8000/api/sale/all',
        method: 'get',
        contentType: 'application/json; charset=utf-8',
        cache: false
    }).done(function(response){
        response
        console.log('AJAX Call getAllSale Successfully !')
    }).fail(function(response){
        response
        console.log('AJAX Call getAllSale Failed !')
    })

    return sale
};

async function getAllHardware() {

    let hardware =  await $.ajax({
        url: 'http://localhost:8000/api/hardware/all',
        method: 'get',
        contentType: 'application/json; charset=utf-8',
        cache: false
    }).done(function(response){
        response
        console.log('AJAX Call getAllHardware Successfully !')
    }).fail(function(response){
        response
        console.log('AJAX Call getAllHardware Failed !')
    })

    return hardware
};

function createItem(JSONitem){
    let container = document.getElementById("container")
    let gridItem= document.createElement("div")
    gridItem.classList.add("grid-item")
    gridItem.id = JSONitem.id
    container.appendChild(gridItem)
    let link = document.createElement("a")
    link.href = "SingleArticlePage.html"
    let bild = document.createElement("img")
    bild.src = JSONitem.bildpfad
    link.appendChild(bild)
    gridItem.appendChild(link)
    let preis = document.createElement("p")
    preis.innerHTML = JSONitem.nettoPreis
    gridItem.appendChild(preis)

};





