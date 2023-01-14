
window.addEventListener("load", function(){
    Test()
    Test()
    Test()
    Test()
    Test()
    Test()
    Test()    
});


async function loadElements() {

    //JSON Responses from AJAX call
    let productJSON = await getAllHardware()
    let productTBody = document.getElementById('tbody_product')

    let productKeys = Object.keys(productJSON)    

}

//Laden von tabllen

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
}


//TEST
function Test(){
    let container = document.getElementById("container")
    let testDiv = document.createElement("div")
    testDiv.classList.add("grid-item")
    container.appendChild(testDiv)
    let link = document.createElement("a")
    link.href = "SingleArticlePage.html"
    let bild = document.createElement("img")
    bild.src = "pics/fortnite.jpeg"
    link.appendChild(bild)
    testDiv.appendChild(link)
    let del = document.createElement("del")
    let PreisD = document.createElement("p")
    PreisD.innerHTML = "19.99"
    del.appendChild(PreisD)
    let preis = document.createElement("p")
    testDiv.appendChild(del)
    preis.innerHTML = "9.99€"
    testDiv.appendChild(preis)
};




