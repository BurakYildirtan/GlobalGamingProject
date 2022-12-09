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

//Software Bereich
rBSoftware.addEventListener ("click", () => {
    if(rBSoftware.checked) {
        cProductSpecs.style.display = "flex";
        cSoftwareSpecs.style.display = "flex";
        cHardwareSpecs.style.display = "none";
        cCheckBtnSale.style.display = "flex";
        btnSubmit.style.display = "block";
        
        
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
        btnSubmit.style.display = "block";

        document.getElementById("cSaleSpecs").style.display ="flex";
        checkBtnSale.checked = false;
        checkBtnCountdown.checked = false;
        document.getElementById("cProductSaleInPercent").style.display="none"
        document.getElementById("cCheckBtnCountdown").style.display="none"
        document.getElementById("cCountdownTime").style.display="none"
        document.getElementById("cCountdownSaleInPercent").style.display="none"
    }
});

//Sale Produkt 
checkBtnSale.addEventListener ("click", () => {
    if(checkBtnSale.checked) {
        document.getElementById("cProductSaleInPercent").style.display="flex"
        document.getElementById("cCheckBtnCountdown").style.display="flex"
    }
    else{
        document.getElementById("cProductSaleInPercent").style.display="none"
        document.getElementById("cCheckBtnCountdown").style.display="none"
    }
});

//Countedown Produkt 
checkBtnCountdown.addEventListener ("click", () => {
    if(checkBtnCountdown.checked) {
        document.getElementById("cCountdownTime").style.display="flex"
        document.getElementById("cCountdownSaleInPercent").style.display="flex"
    }else {
        document.getElementById("cCountdownTime").style.display="none"
        document.getElementById("cCountdownSaleInPercent").style.display="none"

    }
});


textBoxPicture.addEventListener ("change", function() {
    document.getElementById("imgPreview").src = textBoxPicture.value;
});


$('#btnSubmit').click(async function() {
    //Produkt
    var valTitle = document.getElementById("productTitle").value;
    var valPrice = document.getElementById("productPrice").value;
    var valPath = document.getElementById("productPicturePath").value;

    var softwareData;
    var hardwareData;
    var saleData;
    var countdownData;

    //Extra Ausgwählt Sale und/oder Coundown 
    var isInpSaleChecked = document.getElementById("inpSale").checked;
    var isInpCountdownChecked = document.getElementById("inpCountdown").checked;

    //Für später
    // var productData = { 'title' : valTitle, 'price' : valPrice, 'picturePath' : valPath };

    var productData = { 'title' : 'TestProdukt1', 'price' : 9.99, 'picturePath' : './Produktbilder/Software/fifa13.jpg' };
    //request für Produkt und response speichern
    var productResponse = await requestProduct(productData);
    //Sicherheitsabfrage
    if (productResponse == undefined) {
        throw console.error('Produkt konnte nicht hinzugefuegt werden!');
    }

    //Wenn Software ausgewählt
    if(rBSoftware.checked){
        var valPlayer = document.getElementById("productPlayer").value;
        var valGenre = document.getElementById("productGenre").value;

        softwareData = { 'productId': productResponse.id, 'player' : valPlayer, 'genre' : genre };
        
        var softwareResponse = await 
    }
    
    //Wenn Hardware ausgewählt
    if(rBHardware.checked){
        var valPerformance = document.getElementById("productPerformance").value;
        var valReleaseDate = document.getElementById("productReleaseDate").value;
    }
    //Sale
    if(isInpSaleChecked){
        var isInpSaleChecked = document.getElementById("inpSale").checked;
        var valSaleInPercent = document.getElementById("productSaleInPercent").value;
    }

    if(isInpCountdownChecked){
        var valCountdownTime = document.getElementById("productCountdownTime").value;
        var valCountdownSale = document.getElementById("productCountdownSale").value;
    }

    // console.log("release Date : "+valReleaseDate);

});

function clearInput () {
    //Produkt
    document.getElementById("productTitle").contentType = null;
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
};


async function requestProduct(product) {
    var productData;
    productData = await $.ajax({
        url: 'http://localhost:8000/api/produkt',
        method: 'post',
        contentType: 'application/json; charset=utf-8',
        cache: false,
        data: JSON.stringify(product)
    }).done(function (response) {
        //DAS BRAUCHE ICH ALS LETZTES
        // $('#response').html(JSON.stringify(response));
        // document.getElementById("response").style.visibility = "visible";
        // clearInput();
        productData = response;
        console.log('productData : '+productData.id);

    }).fail(function (jqXHR, statusText, error) {
        $('#response').html('Ein Fehler ist aufgetreten');
        document.getElementById("response").style.visibility = "visible";
    });

    return productData
}

async function requestSoftware(software) {
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
        document.getElementById("response").style.visibility = "visible";
    });

    return softwareData;
}