//------- FÜR DIE GANZE SEITE WICHTIG ------------------
window.addEventListener("load", function(){
    createProductTable()
    createDeleteSelect()
})
    


//GetAllProducts---------------------------------------------------------
async function getAllProducts() {

    let products =  await $.ajax({
        url: 'http://localhost:8000/api/produkt/all',
        method: 'get',
        contentType: 'application/json; charset=utf-8',
        cache: false
    }).done(function(response){
        response
        console.log('AJAX Call getAllProducts Successfully !')
    }).fail(function(response){
        response
        console.log('AJAX Call get getAllProducts Failed !')
    })

    return products 
}

async function getAllSoftware() {

    let software=  await $.ajax({
        url: 'http://localhost:8000/api/software/all',
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
}

async function getAllCountdown() {

    let countdown =  await $.ajax({
        url: 'http://localhost:8000/api/countdown/all',
        method: 'get',
        contentType: 'application/json; charset=utf-8',
        cache: false
    }).done(function(response){
        response
        console.log('AJAX Call getAllCountdown Successfully !')
    }).fail(function(response){
        response
        console.log('AJAX Call getAllCountdown Failed !')
    })

    return countdown 
}


//-------------------------------------------------------------------------


//-----------------------------------Admin Page------------------------------------------------------------
//Optionen
var rBInsertProduct = document.getElementById('inpInsertProduct');
var rBChangeProduct = document.getElementById('inpChangeProduct');
var rBDeleteProduct = document.getElementById('inpDeleteProduct');
var adminOption = document.querySelectorAll('input[type="radio"][name="adminOption"]');

//Admin Option auswählen
adminOption.forEach( button => {
    button.addEventListener('change', function() {
        switch (this.value) {
            case '0':
                document.getElementById('cInsertProduct').style.visibility = 'visible';
                document.getElementById('cChangeProduct').style.visibility = 'hidden';
                document.getElementById('cDeleteProduct').style.visibility = 'hidden';

                break;
            case '1':
                document.getElementById('cInsertProduct').style.visibility = 'hidden';
                document.getElementById('cChangeProduct').style.visibility = 'visible';
                document.getElementById('cDeleteProduct').style.visibility = 'hidden';
                break;
            case '2':
                document.getElementById('cInsertProduct').style.visibility = 'hidden';
                document.getElementById('cChangeProduct').style.visibility = 'hidden';
                document.getElementById('cDeleteProduct').style.visibility = 'visible';
                break;
            default:
                console.log('Etwas ist schief gelaufen');
        }     
    });
});

//-----------------------------------CREATE PRODUCT TABLE------------------------------------------------------------

async function createProductTable() {

    //JSON Responses from AJAX call
    let productJSON = await getAllProducts()
    let softwareJSON = await getAllSoftware()
    let hardwareJSON = await getAllHardware()
    let saleJSON = await getAllSale()
    let countdownJSON = await getAllCountdown()
    let productTBody = document.getElementById('tbody_product')

    let productKeys = Object.keys(productJSON)
    let productCounter = 1

    let table = document.getElementById("table_product")
    table.classList.add("productTableClass")

    for( var i = 0; i < productKeys.length; i++ ) {

        var productData = productJSON[i]
        var softwareData = lookForSoftware ( productJSON[i].id, softwareJSON )

        if(softwareData == null) {
            var hardwareData = lookForHardware ( productJSON[i].id, hardwareJSON )
        } else {
            var hardwareData = null
        }

        var  saleData = lookForSale ( productJSON[i].id, saleJSON)

        if(saleData != null){
            var countdownData = lookForCountdown( saleData.id, countdownJSON)
        } else {
            var countdownData = null
        }

        var r = createRow ( productData, softwareData, hardwareData, saleData, countdownData, i, productCounter )

        productTBody.appendChild(r)

        productCounter++ 
    }

}

function createRow( productData, softwareData , hardwareData, saleData, countdownData, counter, productCounter ) {

    let tRow = document.createElement("tr")
    tRow.id = "tr"+counter
    tRow.className = "product_table_row"

    let trNr = document.createElement("td")
    trNr.innerHTML = productCounter
    tRow.appendChild(trNr)

    //ProduktData in Tabelle Row hinzufügen
    let productDataKeys = Object.keys(productData)
    productDataKeys.forEach( key =>{
        let c = createCell( productData[key], counter, key )
        tRow.appendChild(c)
    })

    //SoftwareData in Tabelle Row hinzufügen
    if(softwareData != null) {
        let softwareDataKeys = Object.keys(softwareData)
        softwareDataKeys.forEach( key =>{
            if(key != "id"){
                let c = createCell( softwareData[key], counter, key )
                tRow.appendChild(c)
            }
        })
    } else {
        let softwareCellNr = 3
        let tableNameSoftware = "Software"
        for( let i = 0 ; i < softwareCellNr ; i++) {
            let blancC = createBlancCell( tableNameSoftware,counter)
            tRow.appendChild(blancC)

        }
    }

    //HardwareData in Tabelle Row hinzufügen
    if(hardwareData != null) {
        let hardwareDataKeys = Object.keys(hardwareData)
        hardwareDataKeys.forEach( key =>{
            if(key != "id"){
                let c = createCell( hardwareData[key], counter, key )
                tRow.appendChild(c)
            }
        })
    } else {
        let hardwareCellNr = 3
        let tableNameHardware = "Hardware"
        for( let i = 0 ; i < hardwareCellNr ; i++) {
            let blancC = createBlancCell( tableNameHardware,counter)
            tRow.appendChild(blancC)
        }
    }

    //SaleData in Tabelle Row hinzufügen
    if(saleData != null) {
        let saleDataKeys = Object.keys(saleData)
        saleDataKeys.forEach( key =>{
            if(key != "produktId"){
                let c = createCell( saleData[key], counter, key )
                tRow.appendChild(c)
            }
        })
    } else {
        let saleCellNr = 2
        let tableNameSale = "Sale"
        for( let i = 0 ; i < saleCellNr ; i++) {
            let blancC = createBlancCell( tableNameSale,counter)
            tRow.appendChild(blancC)
        }
    }
    
    //countdownData in Tabelle Row hinzufügen
    if(countdownData != null) {
        let countdownDataKeys = Object.keys(countdownData)
        countdownDataKeys.forEach( key =>{
            if(key != "id") {
                let c = createCell( countdownData[key], counter, key )
                tRow.appendChild(c)
            }
        })
    } else {
        let countdownCellNr = 2
        let tableNameCountdown = "Countdown"
        for( let i = 0 ; i < countdownCellNr ; i++) {
            let blancC = createBlancCell( tableNameCountdown,counter)
            tRow.appendChild(blancC)
        }
    }    

    return tRow
}

function createBlancCell( tableName,counter ) {
    let tCell = document.createElement("td")
    tCell.id = "td_"+tableName+"_"+counter
    tCell.className = "product_table_cell"
    tCell.innerHTML = "-"

    return tCell

}

function createCell( data, counter, key ) {
    let tCell = document.createElement('td')
    tCell.id = "td_"+key+"_"+counter
    tCell.className = "product_table_cell"
    tCell.innerHTML = data

    return tCell
}

function lookForSoftware( productId , softwareJSON ) {
    let softwareKeys = Object.keys(softwareJSON)

    for( var i = 0; i < softwareKeys.length; i++ ) {
        if ( productId == softwareJSON[i].id ) {
            
            return softwareJSON[i]
        }
    }

    return null

}

function lookForHardware( productId , hardwareJSON ) {
    let hardwareKeys = Object.keys(hardwareJSON)

    for( var i = 0; i < hardwareKeys.length; i++ ) {
        if ( productId == hardwareJSON[i].id ) {
            return hardwareJSON[i]
        }
    }

    return null

}

function lookForSale( productId , saleJSON ) {
    let saleKeys = Object.keys(saleJSON)

    for( var i = 0; i < saleKeys.length; i++ ) {
        if ( productId == saleJSON[i].produktId ) {
            return saleJSON[i]
        }
    }

    return null

}

function lookForCountdown( saleId , countdownJSON ) {
    let countdownKeys = Object.keys(countdownJSON)

    for( var i = 0; i < countdownKeys.length; i++ ) {
        if ( saleId == countdownJSON[i].id ) {
            return countdownJSON[i]
        }
    }

    return null

}

//-----------------------------------DLETE PRODUCT------------------------------------------------------------

var deleteBtn = document.getElementById('btn_product_delete')

deleteBtn.addEventListener ("click", () => {
    let selDelete = document.getElementById("selectToDeleteProduct")
    //zu löschende ID
    let deleteProductID = selDelete.value

    



})


async function createDeleteSelect() {
    let productJSON = await getAllProducts()
    let selDelete = document.getElementById("selectToDeleteProduct")
    selDelete.classList.add("selectPorudct")

    productKeys = Object.keys(productJSON)

    for( var i = 0; i < productKeys.length; i++) {
        let option =  createOption(productJSON[i].id, productJSON[i].id)
        selDelete.appendChild(option)
    }
}

function createOption( value , innerText ) {
    let option = document.createElement('option')
    option.value = value
    option.innerHTML = innerText

    return option

}

//-------------------------------------INSERT PRODUCT------------------------------------------------------------------

//Buttons
var rBSoftware = document.getElementById("inpSoftware");
var rBHardware = document.getElementById("inpHardware");
var checkBtnSale = document.getElementById("inpSale");
var checkBtnCountdown = document.getElementById("inpCountdown");
var btnSubmit = document.getElementById("btnSubmit")
var checkedBtn = document.getElementsByClassName("checkedCountdown")
var cCheckBtnSale = document.getElementById("cCheckBtnSale");
var cCheckBtnCountdown = document.getElementById("cCheckBtnCountdown");

//Divs
var cProductSpecs = document.getElementById("cProductSpecs");
var cSoftwareSpecs = document.getElementById("cSoftwareSpecs");
var cHardwareSpecs = document.getElementById("cHardwareSpecs");
var textBoxPicture = document.getElementById("productPicturePath");

//input
var inpPrice = document.getElementById("productPrice");
var inpTitle = document.getElementById("productTitle");
var inpPicturePath = document.getElementById("productPicturePath");
var inpPlayer = document.getElementById("productPlayer");
var inpGenre = document.getElementById("productGenre");
var inpPerformance = document.getElementById("productPerformance");
var inpReleaseDate = document.getElementById("productReleaseDate");
var inpSalePerCent = document.getElementById("productSaleInPercent");
var inpCountdownTime = document.getElementById("productCountdownTime");
var inpCountdownSale = document.getElementById("productCountdownSale");

var inpFsk = document.getElementById("productFsk");
var inpProducer = document.getElementById("productProducer");


//DatenSammlungen
var productData;
var softwareData;
var hardwareData;
var saleData;
var countdownData;

//response
var spanResponse = document.querySelector("#response");

//Software Bereich
rBSoftware.addEventListener ("click", () => {
    if(rBSoftware.checked) {
        cProductSpecs.style.display = "flex";
        cSoftwareSpecs.style.display = "flex";
        cHardwareSpecs.style.display = "none";
        cCheckBtnSale.style.display = "flex";
        btnSubmit.style.display = "flex";
        
        
        document.getElementById("cSaleSpecs").style.display ="flex";
        checkBtnSale.checked = false;
        checkBtnCountdown.checked = false;
        document.getElementById("cProductSaleInPercent").style.display="none"
        document.getElementById("cCheckBtnCountdown").style.display="none"
        document.getElementById("cCountdownTime").style.display="none"
        document.getElementById("cCountdownSaleInPercent").style.display="none"
    }

});

//Hardware Bereich 
rBHardware.addEventListener ("click", () => {
    if(rBHardware.checked) {
        cProductSpecs.style.display = "flex";
        cHardwareSpecs.style.display = "flex";
        cSoftwareSpecs.style.display = "none";
        cCheckBtnSale.style.display = "flex";
        btnSubmit.style.display = "flex";

        document.getElementById("cSaleSpecs").style.display ="flex";
        checkBtnSale.checked = false;
        checkBtnCountdown.checked = false;
        document.getElementById("cProductSaleInPercent").style.display="none"
        document.getElementById("cCheckBtnCountdown").style.display="none"
        document.getElementById("cCountdownTime").style.display="none"
        document.getElementById("cCountdownSaleInPercent").style.display="none"
    }
});

//Sale Bereich
checkBtnSale.addEventListener ("click", () => {
    if(checkBtnSale.checked) {
        document.getElementById("cProductSaleInPercent").style.display="flex"
        document.getElementById("cCheckBtnCountdown").style.display="flex"
    }
    else{
        document.getElementById("cProductSaleInPercent").style.display="none"
        document.getElementById("cCheckBtnCountdown").style.display="none"
        document.getElementById("cCountdownTime").style.display="none"
        document.getElementById("cCountdownSaleInPercent").style.display="none"
        checkBtnCountdown.checked = false
    }
});

//Countedown Bereich 
checkBtnCountdown.addEventListener ("click", () => {
    if(checkBtnCountdown.checked) {
        document.getElementById("cCountdownTime").style.display="flex"
        document.getElementById("cCountdownSaleInPercent").style.display="flex"
    }else {
        document.getElementById("cCountdownTime").style.display="none"
        document.getElementById("cCountdownSaleInPercent").style.display="none"

    }
});

//Bild Preview
textBoxPicture.addEventListener ("change", function() {
    document.getElementById("imgPreview").src = textBoxPicture.value;
});

//Preis überprüfen
inpPrice.addEventListener("input", function() {
    if (isNumeric(inpPrice.value)) {
        inpPrice.style.border = "5px solid green";
    }else{
        inpPrice.style.border = "3px solid red";
    }
});

//Titel überprüfen
inpTitle.addEventListener("input", function() {
    if (inpTitle.value != "" && inpTitle.value != undefined) {
        inpTitle.style.border = "5px solid green";
    }else{
        inpTitle.style.border = "3px solid red";
    }
});

//Bild überprüfen
inpPicturePath.addEventListener("change", function() {
    if (inpPicturePath.value != "" && inpPicturePath != undefined) {
        inpPicturePath.style.border = "5px solid green";
    }else{
        inpPicturePath.style.border = "3px solid red";
    }
});

//Spieleranzahl überprpüfen
inpPlayer.addEventListener("input", function() {
    if (inpPlayer.value <= 8 && inpPlayer.value >= 1) {
        inpPlayer.style.border = "5px solid green";
    }else{
        inpPlayer.style.border = "3px solid red";
    }
});

//Genre überprüfen
inpGenre.addEventListener("input", function() {
    if ( isAlphabetic(inpGenre.value) ) {
        inpGenre.style.border = "5px solid green";
    }else{
        inpGenre.style.border = "3px solid red";
    }
});

//Fsk überprüfen
inpFsk.addEventListener("input", function() {
    if (inpFsk.value <= 18 && inpFsk.value >= 0 ) {
        inpFsk.style.border = "5px solid green";
    }else{
        inpFsk.style.border = "3px solid red";
    }
});

//Performance überprüfen
inpPerformance.addEventListener("input", function() {
    if(inpPerformance.value >= 1 && inpPerformance.value <= 100 ) {
        inpPerformance.style.border = "5px solid green";
    }else{
        inpPerformance.style.border = "3px solid red";
    }
});

//Erscheinungsdatum überprüfen
inpReleaseDate.addEventListener("input", function() {
    if(inpCountdownSale.value != undefined ) {
        inpReleaseDate.style.border = "5px solid green";
    }else{
        inpReleaseDate.style.border = "3px solid red";
    }
});

//Hersteller überprüfen
inpProducer.addEventListener("input", function() {
    if (inpProducer.value != "" && inpProducer.value != undefined) {
        inpProducer.style.border = "5px solid green";
    }else{
        inpProducer.style.border = "3px solid red";
    }
});

//Sale Prozent überprüfen
inpSalePerCent.addEventListener("input", function () {
    if(inpSalePerCent.value < 100 && inpSalePerCent.value >= 1) {
        inpSalePerCent.style.border = "5px solid green";
    }else{
        inpSalePerCent.style.border = "3px solid red";
    }
});

//Countdown Zeit überprüfen
inpCountdownTime.addEventListener("input", function () {
    if(inpCountdownTime.value <= 100 && inpCountdownTime.value >= 1) {
        inpCountdownTime.style.border = "5px solid green";
    }else{
        inpCountdownTime.style.border = "3px solid red";
    }
});

//Countdown Sale Prozent überprüfen
inpCountdownSale.addEventListener("input", function () {
    if(inpCountdownSale.value < 100 && inpCountdownSale.value >= 1) {
        inpCountdownSale.style.border = "5px solid green";
    }else{
        inpCountdownSale.style.border = "3px solid red";
    }
});

//Submit
$('#btnSubmit').click(async function(event) {
    //Produkt
    var valTitle = document.getElementById("productTitle").value;
    var valPrice = document.getElementById("productPrice").value;
    var valPath = document.getElementById("productPicturePath").value;
    var valReleaseDate = document.getElementById("productReleaseDate").value;

    //Extra Ausgwählt Sale und/oder Coundown 
    var isInpSaleChecked = document.getElementById("inpSale").checked;
    var isInpCountdownChecked = document.getElementById("inpCountdown").checked;

    if(checkedSoftwareData() || checkedHardwareData()){
        if(!checkedProductData()){
            spanResponse.innerHTML = "Produkt - Werte sind nicht vollständig !"
            return;
        }
        try {
            var productData = { 'title' : valTitle, 'price' : valPrice, 'picturePath' : valPath, 'realeaseDate': valReleaseDate };
            //request für Produkt und response speichern
            var productResponse = await requestProduct( productData );


        }
        catch (error) {
            throw console.error("Produkt wurde nicht hinzugefügt");
        }
    }

    //Wenn Software ausgewählt
    if(rBSoftware.checked){

        if(!checkedSoftwareData()){
            spanResponse.innerHTML = "Produkt - Werte sind nicht vollständig !"
            return;
        }
        var softwareResponse = await insertSoftware(productResponse)
    };
    
    //Wenn Hardware ausgewählt
    if(rBHardware.checked){
        if(!checkedHardwareData()){
            spanResponse.innerHTML = "Produkt - Werte sind nicht vollständig !"
            return;
        }

        var hardwareResponse = await insertHardware(productResponse)

        console.log ("ERG HARDWARE : ",hardwareResponse)
    };
    //Sale
    if(isInpSaleChecked){
        if(!checkedSaleData()){
            spanResponse.innerHTML = "Produkt - Werte sind nicht vollständig !"
            return;
        }
        var valSaleInPercent = parseInt(document.getElementById("productSaleInPercent").value);
        try {
            saleData = { 'productId': productResponse.id, 'saleInPercent' : valSaleInPercent };
            var saleResponse = await requestSale( saleData );
            console.log('Sale erfolgreich hinzugefügt mit der ref. id : '+ saleResponse.produktId + ' und der Sale Id : '+ saleResponse.id);
        }
        catch (error) {
            throw console.error("Sale wurde nicht hinzugefügt");
        }
    };

    if(isInpCountdownChecked){
        if(!checkedCountdownData()){
            spanResponse.innerHTML = "Produkt - Werte sind nicht vollständig !"
            return;
        }
        var valCountdownTime = parseInt(document.getElementById("productCountdownTime").value);
        var valCountdownSale = parseFloat(document.getElementById("productCountdownSale").value);
        try {
            countdownData = { 'salesId': saleResponse.id, 'countdownTime' : valCountdownTime, 'countdownPerCent' : valCountdownSale };
            var countdownResponse = await requestCountdown( countdownData );

            console.log('Countdown erfolgreich hinzugefügt mit der ref. id : '+ countdownResponse.id);
        }
        catch (error) {
            throw console.error("Countdown wurde nicht hinzugefügt");
        }
    };
    
    spanResponse.innerHTML = "Erfolgreich Hinzugefügt !"
    document.getElementById("response").style.visibility = "visible";
    setTimeout(function() {
        document.getElementById("response").style.visibility = "hidden";
    }, 5000);
    clearInput()
});

//Software einfügen
async function insertSoftware(productResponse) {
    
    var productId = parseInt(productResponse.id)
    var valPlayer = parseInt(document.getElementById("productPlayer").value)
    var valGenre = document.getElementById("productGenre").value
    var valFsk = parseInt(document.getElementById("productFsk").value)
    try {

        softwareData = { 'productId': productResponse.id, 'player' : valPlayer, 'genre' : valGenre, 'fsk' : valFsk};
        var softwareResponse = await requestSoftware( softwareData );

        console.log('Software erfolgreich hinzugefügt mit der ref. id : '+ softwareResponse.id);
    }
    catch (error) {
        throw console.error("Software wurde nicht hinzugefügt");
    }
};

//Hardware einfügen
async function insertHardware(productResponse) {

    var productId = parseInt(productResponse.id)
    var valPerformance = parseInt(document.getElementById("productPerformance").value)
    var valProducer = document.getElementById("productProducer").value
    var valType = document.getElementById("productSelect").value

    try {
        hardwareData = { 'productId': productId, 'performance' : valPerformance, 'producer' : valProducer, "type": valType };
        
        var hardwareResponse = await requestHardware( hardwareData );
        console.log('Hardware erfolgreich hinzugefügt mit der ref. id : '+ hardwareResponse.id);
    }
    catch (error) {
        throw console.error("Hardware wurde nicht hinzugefügt");
    }
    
}
//Entfernen der Werte 
function clearInput () {
    //Produkt
    document.getElementById("productTitle").value = null;
    document.getElementById("productPrice").value = null;
    document.getElementById("productReleaseDate").value = null;
    //Bildpfad
    document.getElementById("productPicturePath").value = null;
    //Software
    document.getElementById("productPlayer").value = null;
    document.getElementById("productGenre").value = null;
    document.getElementById("productFsk").value = null;
    //Hardware
    document.getElementById("productPerformance").value = null;
    document.getElementById("productProducer").value = null;
    //Sale
    document.getElementById("inpSale").checked = false;
    document.getElementById("productSaleInPercent").value = null;
    //Countdown
    document.getElementById("inpCountdown").checked = false;
    document.getElementById("productCountdownTime").value = null;
    document.getElementById("productCountdownSale").value = null;

    inpTitle.style.border = "1px solid #444";
    inpPrice.style.border = "1px solid #444";
    inpPicturePath.style.border = "1px solid #444";
    inpPlayer.style.border = "1px solid #444";
    inpGenre.style.border = "1px solid #444";
    inpPerformance.style.border = "1px solid #444";
    inpReleaseDate.style.border = "1px solid #444";
    inpSalePerCent.style.border = "1px solid #444";
    inpCountdownTime.style.border = "1px solid #444";
    inpFsk.style.border = "1px solid #444";
    inpProducer.style.border = "1px solid #444";
};

//AJAX Aufruf Produkt
async function requestProduct(product) {
    console.log('Produkt AJAX Aufruf gestartet');
    var xhr1 = new XMLHttpRequest();

    var productData = await $.ajax({
        url: 'http://localhost:8000/api/produkt',
        method: 'post',
        contentType: 'application/json; charset=utf-8',
        cache: false,
        data: JSON.stringify(product)
    }).done(function (response) {
        console.log('productData : '+response.id);
        response;

    }).fail(function (jqXHR, statusText, error) {
        $('#response').html('Ein Fehler ist aufgetreten');
        error;
    });

    return productData


};

//AJAX Aufruf Software
async function requestSoftware(software) {
    console.log('Software AJAX Aufruf gestartet');

    console.log("SOFTWARE DATA REQUEST",software)

    var softwareData = await $.ajax({
        url: 'http://localhost:8000/api/software',
        method: 'post',
        contentType: 'application/json; charset=utf-8',
        cache: false,
        data: JSON.stringify(software)
    }).done(function (response) {
        response;

    }).fail(function (jqXHR, statusText, error) {
        $('#response').html('Ein Fehler ist aufgetreten');
        error;
    });

    return softwareData;
};

//AJAX Aufruf Hardware
async function requestHardware(hardware) {
    console.log('Hardware AJAX Aufruf gestartet');


    var hardwareData = await $.ajax({
        url: 'http://localhost:8000/api/hardware',
        method: 'post',
        contentType: 'application/json; charset=utf-8',
        cache: false,
        data: JSON.stringify(hardware)
    }).done(function (response) {
        response;
    }).fail(function (jqXHR, statusText, error) {
        $('#response').html('Ein Fehler ist aufgetreten');
        response
    });

    return hardwareData;
};

//AJAX Aufruf Sale
async function requestSale(sale) {
    console.log('Sale AJAX Aufruf gestartet');

    var saleData;
    saleData = await $.ajax({
        url: 'http://localhost:8000/api/sale',
        method: 'post',
        contentType: 'application/json; charset=utf-8',
        cache: false,
        data: JSON.stringify(sale)
    }).done(function (response) {
        saleData = response;
    }).fail(function (jqXHR, statusText, error) {
        $('#response').html('Ein Fehler ist aufgetreten');
    });

    return saleData;
};

//AJAX Aufruf Countdown
async function requestCountdown(countdown) {
    console.log('Countdown AJAX Aufruf gestartet');

    var countdownData;
    countdownData = await $.ajax({
        url: 'http://localhost:8000/api/countdown',
        method: 'post',
        contentType: 'application/json; charset=utf-8',
        cache: false,
        data: JSON.stringify(countdown)
    }).done(function (response) {
        countdownData = response;
    }).fail(function (jqXHR, statusText, error) {
        $('#response').html('Ein Fehler ist aufgetreten');
    });

    return countdownData;
};

function isNumeric(input) {
    //d steht für digits [0-9]
    var regex = /^[+]?\d+(\.\d+)?$/;
    return regex.test(input);
};

function isAlphabetic(input) {
    var regex = /^[a-zA-Z]+$/;
    return regex.test(input);
};

function checkedProductData() {
    if( inpPrice.style.borderColor == "green" &&
    inpTitle.style.borderColor == "green" &&
    inpPicturePath.style.borderColor == "green" &&
    inpReleaseDate.style.borderColor == "green") {
        return true
    } else {
        return false
    }  
};

function checkedSoftwareData() {
    if(checkedProductData() &&
        inpPlayer.style.borderColor == "green" &&
        inpGenre.style.borderColor == "green" &&
        inpFsk.style.borderColor == "green"){
            return true
        } else {
            return false
        }  

};

function checkedHardwareData() {
    if(checkedProductData &&
        inpPerformance.style.borderColor == "green" &&
        inpProducer.style.borderColor == "green"){
        return true
    } else {
        return false
    }  

};

function checkedSaleData(){
    if(checkedHardwareData && inpSalePerCent.style.borderColor == "green" || 
    checkedSoftwareData && inpSalePerCent.style.borderColor == "green"){
        return true
    } else {
        return false
    }  

};

function checkedCountdownData(){
    if(checkedSaleData() && inpCountdownTime.style.borderColor == "green" && 
    inpCountdownSale.style.borderColor == "green"){
        return true
    } else {
        return false
    }  
};