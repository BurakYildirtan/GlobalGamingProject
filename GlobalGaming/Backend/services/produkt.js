const helper = require('../helper.js');
const ProduktDao = require('../dao/produktDao.js');
const express = require('express');
var serviceRouter = express.Router();

console.log('- Service Produkt');

serviceRouter.post('/produkt', function(request, response) {
    console.log('Service Produkt: Neues Produkt einfügen');
    //errorMsgs für Attribute
    var errorMsgs=[];

    if (helper.isUndefined(request.body.title)) 
        errorMsgs.push('title fehlerhaft !');

    if (helper.isUndefined(request.body.price)) 
        errorMsgs.push('Preis fehlerhaft !');

    if (helper.isUndefined(request.body.picturePath)) 
        request.body.beschreibung = 'Bildpfad fehlerhaft !';
        
    if (helper.isUndefined(request.body.realeaseDate)) 
        errorMsgs.push('Preis fehlerhaft !');
        
    if ( errorMsgs.length > 0 ) {
        console.log('Service Produkt: Creation not possible, data missing');
        response.status(400).json({ 'fehler': true, 'nachricht': 'Funktion nicht möglich weil : '+ errorMsgs });
        return;
    }

    const produktDao = new ProduktDao(request.app.locals.dbConnection);
    try {
        var obj = produktDao.create(request.body.title, request.body.price, request.body.picturePath, request.body.realeaseDate);
        console.log('Service Produkt: Hinzugefügt!');
        response.status(200).json(obj);

    } catch (ex) {
        console.error('Service Produkt: Error creating new record. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get('/produkt/all', function(request, response) {

    const produktDao = new ProduktDao(request.app.locals.dbConnection);
    try {
        console.log("Service Produkt : Get All Products")

        var allProducts = produktDao.loadAll()
        response.status(200).json(allProducts)

    } catch (ex) {
        console.log ('Service Produkt : Error Getting All Products. Exception occured : '+ex.message)
        
        response.status(400).json({'fehler' : true, 'nachricht' : ex.message})
    }

});

serviceRouter.get('/produkt/delete/:id', function(request, response) {
    console.log('Service Produkt: Client requested deletion of record, id=' + request.params.id);

    const produktDao = new ProduktDao(request.app.locals.dbConnection);
    try {
        var obj = produktDao.loadById(request.params.id)
        produktDao.delete(request.params.id);
        console.log('Service Produkt: Deletion of record successfull, id=' + request.params.id);
        response.status(200).json({ 'gelöscht': true , 'delItem': obj });
    } catch (ex) {
        console.error(ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get('/produkt/existiert/:id', function(request, response) {
    console.log('Service Produkt: Check ob ID existiert in Hardware' + request.params.id);

    const produktDao = new ProduktDao(request.app.locals.dbConnection);
    try {
        var exists = produktDao.loadById(request.params.id);
        console.log('Service Produkt : Check if record exists by id=' + request.params.id + ', exists=' + exists);
        if(exists == undefined) {
            response.status(200).json(false);
        } else {
            response.status(200).json(true);
        }
    } catch (ex) {
        console.error('Service Produkt: Error checking if record exists. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.post('/produkt/update', function(request, response) {
    console.log('Service Produkt: Check ob ID existiert in Hardware' + request.body.id);

    const produktDao = new ProduktDao(request.app.locals.dbConnection);
    try {
        var update = produktDao.update(request.body.id,request.body.attribute,request.body.wert);
        console.log('Service Produkt : Check if record exists by id=' + request.body.id + ', exists=' + update);
        if(update == undefined) {
            response.status(200).json(false);
        } else {
            response.status(200).json(true);
        }
    } catch (ex) {
        console.error('Service Produkt: Error checking if record exists. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});







// serviceRouter.get('/produkt/existiert/:id', function(request, response) {
//     console.log('Service Produkt: Client requested check, if record exists, id=' + request.params.id);

//     const produktDao = new ProduktDao(request.app.locals.dbConnection);
//     try {
//         var exists = produktDao.exists(request.params.id);
//         console.log('Service Produkt: Check if record exists by id=' + request.params.id + ', exists=' + exists);
//         response.status(200).json({'id': request.params.id, 'existiert': exists});
//     } catch (ex) {
//         console.error('Service Produkt: Error checking if record exists. Exception occured: ' + ex.message);
//         response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
//     }
// });

// serviceRouter.put('/produkt', function(request, response) {
//     console.log('Service Produkt: Client requested update of existing record');

//     var errorMsgs=[];
//     if (helper.isUndefined(request.body.id)) 
//         errorMsgs.push('id fehlt');
//     if (helper.isUndefined(request.body.bezeichnung)) 
//         errorMsgs.push('bezeichnung fehlt');
//     if (helper.isUndefined(request.body.beschreibung)) 
//         request.body.beschreibung = '';
//     if (helper.isUndefined(request.body.details)) 
//         request.body.details = null;
//     if (helper.isUndefined(request.body.nettopreis)) 
//         errorMsgs.push('nettopreis fehlt');
//     if (!helper.isNumeric(request.body.nettopreis)) 
//         errorMsgs.push('nettopreis muss eine Zahl sein');
//     if (helper.isUndefined(request.body.kategorie)) {
//         errorMsgs.push('kategorie fehlt');
//     } else if (helper.isUndefined(request.body.kategorie.id)) {
//         errorMsgs.push('kategorie gesetzt, aber id fehlt');
//     }        
//     if (helper.isUndefined(request.body.mehrwertsteuer)) {
//         errorMsgs.push('mehrwertsteuer fehlt');
//     } else if (helper.isUndefined(request.body.mehrwertsteuer.id)) {
//         errorMsgs.push('mehrwertsteuer gesetzt, aber id fehlt');
//     }        
//     if (helper.isUndefined(request.body.datenblatt)) {
//         request.body.datenblatt = null;
//     } else if (helper.isUndefined(request.body.datenblatt.id)) {
//         errorMsgs.push('datenblatt gesetzt, aber id fehlt');
//     } else {
//         request.body.datenblatt = request.body.datenblatt.id;
//     }
//     if (helper.isUndefined(request.body.bilder)) 
//         request.body.bilder = [];

//     if (errorMsgs.length > 0) {
//         console.log('Service Produkt: Update not possible, data missing');
//         response.status(400).json({ 'fehler': true, 'nachricht': 'Funktion nicht möglich. Fehlende Daten: ' + helper.concatArray(errorMsgs) });
//         return;
//     }

//     const produktDao = new ProduktDao(request.app.locals.dbConnection);
//     try {
//         var obj = produktDao.update(request.body.id, request.body.kategorie.id, request.body.bezeichnung, request.body.beschreibung, request.body.mehrwertsteuer.id, request.body.details, request.body.nettopreis, request.body.datenblatt, request.body.bilder);
//         console.log('Service Produkt: Record updated, id=' + request.body.id);
//         response.status(200).json(obj);
//     } catch (ex) {
//         console.error('Service Produkt: Error updating record by id. Exception occured: ' + ex.message);
//         response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
//     }    
// });

// serviceRouter.delete('/produkt/:id', function(request, response) {
//     console.log('Service Produkt: Client requested deletion of record, id=' + request.params.id);

//     const produktDao = new ProduktDao(request.app.locals.dbConnection);
//     try {
//         var obj = produktDao.loadById(request.params.id);
//         produktDao.delete(request.params.id);
//         console.log('Service Produkt: Deletion of record successfull, id=' + request.params.id);
//         response.status(200).json({ 'gelöscht': true, 'eintrag': obj });
//     } catch (ex) {
//         console.error('Service Produkt: Error deleting record. Exception occured: ' + ex.message);
//         response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
//     }
// });

module.exports = serviceRouter;