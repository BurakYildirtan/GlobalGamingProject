
//Buttons
var rBSoftware = document.getElementById("inpSoftware");
var rBHardware = document.getElementById("inpHardware");
var checkBtnSale = document.getElementById("inpSale");
var checkBtnCountdown = document.getElementById("inpCountdown");



//Klassen
var checkedBtn = document.getElementsByClassName("checkedCountdown")





var cCheckBtnSale = document.getElementById("cCheckBtnSale");
var cCheckBtnCountdown = document.getElementById("cCheckBtnCountdown");


var cProductSpecs = document.getElementById("cProductSpecs");
var cSoftwareSpecs = document.getElementById("cSoftwareSpecs");
var cHardwareSpecs = document.getElementById("cHardwareSpecs");


//Software Bereich
rBSoftware.addEventListener ("click", () => {
    if(rBSoftware.checked) {
        cProductSpecs.style.display = "flex";
        cSoftwareSpecs.style.display = "flex";
        cHardwareSpecs.style.display = "flex";
    }
});

//Hardware Bereich 
rBHardware.addEventListener ("click", () => {
    if(rBHardware.checked) {
        cProductSpecs.style.display = "flex";
        cHardwareSpecs.style.display = "flex";
    }
});


checkBtnSale.addEventListener ("click", () => {
    if(checkBtnSale.checked) {

    }
});

checkBtnCountdown.addEventListener ("click", () => {
    if(checkBtnCountdown.checked) {
        checkedBtn.style.display = "flex";
    }else {
        checkedBtn.style.display = "none";

    }
});
