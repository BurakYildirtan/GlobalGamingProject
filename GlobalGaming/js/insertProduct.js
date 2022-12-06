
//Dateiübergreifende Variablen
var cProductSpecs = document.getElementById("cProductSpecs");
var cSoftwareSpecs = document.getElementById("cSoftwareSpecs");
var rBSoftware = document.getElementById("inpSoftware");

rBSoftware.addEventListener ("click", () => {
    if(rBSoftware.checked) {
        cProductSpecs.style.display = "block";
        cSoftwareSpecs.style.display ="block";
    } else {
        cProductSpecs.style.display = "none";
    }

});