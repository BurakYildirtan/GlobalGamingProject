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

    //Extra Ausgwählt Sale und/oder Coundown 
    var isInpSaleChecked = document.getElementById("inpSale").checked;
    var isInpCountdownChecked = document.getElementById("inpCountdown").checked;

    if(checkedSoftwareData() || checkedHardwareData()){
        if(!checkedProductData()){
            spanResponse.innerHTML = "Produkt - Werte sind nicht vollständig !"
            return;
        }
        try {
            var productData = { 'title' : valTitle, 'price' : valPrice, 'picturePath' : valPath };
            //request für Produkt und response speichern
            var productResponse = await requestProduct( productData );
        }
        catch (error) {
            throw console.error("Produkt wurde nicht hinzugefügt");
        }
    }

    //Wenn Software ausgewählt
    if(rBSoftware.checked){
        console.log("CHECKED DATA SOFTWARE: ", !checkedSoftwareData)
        if(!checkedSoftwareData()){
            spanResponse.innerHTML = "Produkt - Werte sind nicht vollständig !"
            return;
        }

        var valPlayer = document.getElementById("productPlayer").value;
        var valGenre = document.getElementById("productGenre").value;
        try {
            // softwareData = { 'productId': productResponse.id, 'player' : valPlayer, 'genre' : genre };
            softwareData = { 'productId': productResponse.id, 'player' : 8, 'genre' : 'Action' };
            // console.log("produktId von der Software es referenziert : "+productResponse.id);
            var softwareResponse = await requestSoftware( softwareData );
            console.log('Software erfolgreich hinzugefügt mit der ref. id : '+ softwareResponse.id);
        }
        catch (error) {
            throw console.error("Software wurde nicht hinzugefügt");
        }
    };
    
    //Wenn Hardware ausgewählt
    if(rBHardware.checked){
        if(!checkedHardwareData()){
            spanResponse.innerHTML = "Produkt - Werte sind nicht vollständig !"
            return;
        }

        var valPerformance = document.getElementById("productPerformance").value;
        var valReleaseDate = document.getElementById("productReleaseDate").value;
        try {
            // hardwareData = { 'productId': productResponse.id, 'performance' : valPerformance, 'releaseDate' : valReleaseDate };
            hardwareData = { 'productId': productResponse.id, 'performance' : 100, 'releaseDate' : '2022-10-10' };
            // console.log("produktId von der Hardware es referenziert : "+productResponse.id);
            var hardwareResponse = await requestHardware( hardwareData );
            console.log('Hardware erfolgreich hinzugefügt mit der ref. id : '+ hardwareResponse.id);
        }
        catch (error) {
            throw console.error("Hardware wurde nicht hinzugefügt");
        }
    };
    //Sale
    if(isInpSaleChecked){
        if(!checkedSaleData()){
            spanResponse.innerHTML = "Produkt - Werte sind nicht vollständig !"
            return;
        }
        var valSaleInPercent = document.getElementById("productSaleInPercent").value;
        try {
            // saleData = { 'productId': productResponse.id, 'saleInPercent' :  valSaleInPercent};
            saleData = { 'productId': productResponse.id, 'saleInPercent' : 99 };
            // console.log("produktId von der Sale es referenziert : "+productResponse.id);
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
        var valCountdownTime = document.getElementById("productCountdownTime").value;
        var valCountdownSale = document.getElementById("productCountdownSale").value;
        try {
            // countdownData = { 'id': saleResponse.id, 'countdownTime' : valCountdownTime, 'countdownPerCent' : valCountdownSale };
            countdownData = { 'salesId': saleResponse.id, 'countdownTime' : 10000, 'countdownPerCent' : 20 };
            console.log("id von der Countdown es referenziert : "+saleResponse.id);
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

//Entfernen der Werte 
function clearInput () {
    //Produkt
    document.getElementById("productTitle").value = null;
    document.getElementById("productPrice").value = null;
    //Bildpfad
    document.getElementById("productPicturePath").value = null;
    //Software
    document.getElementById("productPlayer").value = null;
    document.getElementById("productGenre").value = null;
    //Hardware
    document.getElementById("productPerformance").value = null;
    document.getElementById("productReleaseDate").value = null;
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
};

//AJAX Aufruf Produkt
async function requestProduct(product) {
    console.log('Produkt AJAX Aufruf gestartet');

    var xhr1 = new XMLHttpRequest();

    var productData;
    productData = await $.ajax({
        url: 'http://localhost:8000/api/produkt',
        method: 'post',
        contentType: 'application/json; charset=utf-8',
        cache: false,
        data: JSON.stringify(product)
    }).done(function (response) {
        productData = response;
        console.log('productData : '+productData.id);

    }).fail(function (jqXHR, statusText, error) {
        $('#response').html('Ein Fehler ist aufgetreten');
    });


    return productData
};

//AJAX Aufruf Software
async function requestSoftware(software) {
    console.log('Software AJAX Aufruf gestartet');

    var softwareData;
    softwareData = await $.ajax({
        url: 'http://localhost:8000/api/software',
        method: 'post',
        contentType: 'application/json; charset=utf-8',
        cache: false,
        data: JSON.stringify(software)
    }).done(function (response) {
        softwareData = response;

    }).fail(function (jqXHR, statusText, error) {
        $('#response').html('Ein Fehler ist aufgetreten');
    });

    return softwareData;
};

//AJAX Aufruf Hardware
async function requestHardware(hardware) {
    console.log('Hardware AJAX Aufruf gestartet');

    var hardwareData;
    hardwareData = await $.ajax({
        url: 'http://localhost:8000/api/hardware',
        method: 'post',
        contentType: 'application/json; charset=utf-8',
        cache: false,
        data: JSON.stringify(hardware)
    }).done(function (response) {
        hardwareData = response;
    }).fail(function (jqXHR, statusText, error) {
        $('#response').html('Ein Fehler ist aufgetreten');
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
    inpPicturePath.style.borderColor == "green" ) {
        return true
    } else {
        return false
    }  
};

function checkedSoftwareData() {
    if(checkedProductData() &&
        inpPlayer.style.borderColor == "green" &&
        inpGenre.style.borderColor == "green"){
            return true
        } else {
            return false
        }  

};

function checkedHardwareData() {
    if(checkedProductData &&
        inpPerformance.style.borderColor == "green" &&
        inpReleaseDate.style.borderColor == "green"){
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