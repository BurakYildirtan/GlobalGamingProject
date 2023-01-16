
window.addEventListener("load", function(){
    loadElements() 
});


async function loadElements() {

    //JSON Responses from AJAX call
    let saleJSON = await getAllSale()
    let productJSON = await getAllHardware()

        productJSON.forEach(elementP => {
            saleJSON.forEach(elementS => {
                if (elementP.id === elementS.id){
                    elementP.nettoPreis = Math.round(((1-elementS.saleProzent/100)*elementP.nettoPreis + Number.EPSILON) * 100) / 100
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
        url: 'http://localhost:8000/api/hardware/allWithProduct',
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

async function getAllHardwareAsc() {

    let hardware =  await $.ajax({
        url: 'http://localhost:8000/api/hardware/allWithProductSortedPriceAsc',
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

async function getAllHardwareDesc() {

    let hardware =  await $.ajax({
        url: 'http://localhost:8000/api/hardware/allWithProductSortedPriceDesc',
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

async function getAllHardwareDate() {

    let hardware =  await $.ajax({
        url: 'http://localhost:8000/api/hardware/allWithProductSortedDate',
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
    link.href = "SingleArticlePageHardware.html"
    link.classList.add("einzelLink")
    link.id = "link"+JSONitem.id
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
        await changeItem(await getAllHardwareAsc())
  }

  async function desc(cb) {
        button.classList.add("button--highlight");
        await changeItem(await getAllHardwareDesc())
  }

  async function latest(cb) {
        button.classList.add("button--highlight");
        await changeItem(await getAllHardwareDate())

  }

const imageLinks = document.querySelector(".einzelLink");
console.log(imageLinks)
console.log(imageLinks.item(0))
for (el in imageLinks) {
    console.log(elI)
    elI.addEventListener('click', event => {
        let id = el.id.match(/\d+/g)[0]
        sessionStorage.setItem("PID",elI.id)
    });
}





