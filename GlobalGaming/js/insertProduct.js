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
    var productResponse = await requestProduct( productData );
    //Sicherheitsabfrage
    if (productResponse == undefined) {
        throw console.error('Produkt konnte nicht hinzugefuegt werden!');
    };

    //Wenn Software ausgewählt
    if(rBSoftware.checked){
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
        //DAS BRAUCHE ICH ALS LETZTES
        // $('#response').html(JSON.stringify(response));
        // document.getElementById("response").style.visibility = "visible";
        // clearInput();
        productData = response;
        console.log('productData : '+productData.id);

    }).fail(function (jqXHR, statusText, error) {
        $('#response').html('Ein Fehler ist aufgetreten');
        //DAS BRAUCH ICH ALS LETZTES
        // document.getElementById("response").style.visibility = "visible";
    });


    return productData
};

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