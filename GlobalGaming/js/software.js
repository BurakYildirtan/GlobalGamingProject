
window.addEventListener("load", function(){
    loadElements() 
});


async function loadElements() {

    //JSON Responses from AJAX call
    let saleJSON = await getAllSale()
    let productJSON = await getAllSoftware()

    if(productJSON){
        productJSON.forEach(elementP => {
            if (saleJSON){
                saleJSON.forEach(elementS => {
                    if (elementP.id === elementS.id){
                        elementP.nettoPreis = Math.round(((1-elementS.saleProzent/100)*elementP.nettoPreis + Number.EPSILON) * 100) / 100
                    }
                });
                createItem(elementP)
            }
        });
    }
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

async function getAllSoftware() {

    let software=  await $.ajax({
        url: 'http://localhost:8000/api/software/allWithProduct',
        method: 'get',
        contentType: 'application/json; charset=utf-8',
        cache: false
    }).done(function(response){
        response
        console.log('AJAX Call getAllSoftware Successfully !')
    }).fail(function(response){
        response
        console.log('AJAX Call getAllSoftware Failed !')
    })

    return software
}

async function getAllSoftwareAsc() {

    let software=  await $.ajax({
        url: 'http://localhost:8000/api/software/allWithProductAsc',
        method: 'get',
        contentType: 'application/json; charset=utf-8',
        cache: false
    }).done(function(response){
        response
        console.log('AJAX Call getAllSoftware Successfully !')
    }).fail(function(response){
        response
        console.log('AJAX Call getAllSoftware Failed !')
    })

    return software
}

async function getAllSoftwareDesc() {

    let software=  await $.ajax({
        url: 'http://localhost:8000/api/software/allWithProductDesc',
        method: 'get',
        contentType: 'application/json; charset=utf-8',
        cache: false
    }).done(function(response){
        response
        console.log('AJAX Call getAllSoftware Successfully !')
    }).fail(function(response){
        response
        console.log('AJAX Call getAllSoftware Failed !')
    })

    return software
}

async function getAllSoftwareDate() {

    let software=  await $.ajax({
        url: 'http://localhost:8000/api/software/allWithProductDate',
        method: 'get',
        contentType: 'application/json; charset=utf-8',
        cache: false
    }).done(function(response){
        response
        console.log('AJAX Call getAllSoftware Successfully !')
    }).fail(function(response){
        response
        console.log('AJAX Call getAllSoftware Failed !')
    })

    return software
}

async function changeItem(JSON){
    let productJSON = JSON;
    let saleJSON = await getAllSale()
    const divs = document.querySelectorAll(".grid-item")
    let counter = 0
    productJSON.forEach(elementP => {
        saleJSON.forEach(elementS => {
            if (elementP.id === elementS.id){
                elementP.nettoPreis = Math.round(((1-elementS.saleProzent/100)*elementP.nettoPreis + Number.EPSILON) * 100) / 100
            }
        });
        let gridItem = divs[counter]
        let childs = gridItem.childNodes
        gridItem.id = elementP.id
        let bild = childs[0].firstChild
        bild.src = elementP.bildpfad
        let titel = childs[1]
        titel.innerHTML = elementP.titel
        let preis = childs[2]
        preis.innerHTML = elementP.nettoPreis
        counter++
    });
    
};

function createItem(JSONitem){
    let container = document.getElementById("container")
    let gridItem= document.createElement("div")
    gridItem.classList.add("grid-item")
    gridItem.id = JSONitem.id
    container.appendChild(gridItem)
    let link = document.createElement("a")
    link.href = "SingleArticlePage.html"
    link.classList.add("einzelLink")
    let bild = document.createElement("img")
    bild.src = JSONitem.bildpfad
    bild.classList.add("grid-item-img")
    link.appendChild(bild)
    gridItem.appendChild(link)
    let titel = document.createElement("p")
    titel.innerHTML = JSONitem.titel
    titel.classList.add("grid-item-p")
    gridItem.appendChild(titel)
    let preis = document.createElement("p")
    preis.innerHTML = JSONitem.nettoPreis
    preis.classList.add("grid-item-p")
    gridItem.appendChild(preis)
};

// Filter-button

var button = document.getElementById("filter-button");
var container = document.getElementById("filter-container");

button.onclick = function (e) {
    e.stopPropagation();
    if (container.classList.contains("filters--active")) {
      container.classList.remove("filters--active");
    } else {
      container.classList.add("filters--active");
    }
  };

container.onclick = function (e) {
  e.stopPropagation();
};

window.onclick = function () {
  container.classList.remove("filters--active");
  
};

async function asc(cb) {
        button.classList.add("button--highlight");
        await changeItem(await getAllSoftwareAsc())
  }

  async function desc(cb) {
        button.classList.add("button--highlight");
        await changeItem(await getAllSoftwareDesc())
  }

  async function latest(cb) {
        button.classList.add("button--highlight");
        await changeItem(await getAllSoftwareDate())

  }






