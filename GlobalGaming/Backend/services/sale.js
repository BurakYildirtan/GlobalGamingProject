const helper = require('../helper.js');
const SaleDao = require('../dao/saleDao.js');
const express = require('express');
const { startCase } = require('lodash');
var serviceRouter = express.Router();

console.log('- Service Sale');

serviceRouter.post('/sale', function(request, response) {
    console.log('Service Sale: Neues Sales einfügen');

    var errorMsgs=[];

    if(helper.isUndefined(request.body.productId))
    errorMsgs.push('productID fehlt');
    
    if(helper.isUndefined(request.body.saleInPercent))
        errorMsgs.push('saleProzent fehlt');

    if (errorMsgs.length > 0) {
        console.log('Service Sale: Creation not possible, data missing');
        response.status(400).json({ 'fehler': true, 'nachricht': 'Funktion nicht möglich. Fehlende Daten: ' + helper.concatArray(errorMsgs) });
        return;
    }

    const saleDao = new SaleDao(request.app.locals.dbConnection);
    try {
        var obj = saleDao.create(request.body.productId, request.body.saleInPercent);
        console.log('Service Sale: Record inserted');
        response.status(200).json(obj);

    } catch (ex) {
        console.error('Service Sale: Error creating new record. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get('/sale/all', function(request, response) {

    const saleDao = new SaleDao(request.app.locals.dbConnection);
    try {
        console.log("Service Sale : Get All Sale")

        var allSale = saleDao.loadAll()
        response.status(200).json(allSale)

    } catch (ex) {
        console.log ('Service Produkt : Error Getting All Sale. Exception occured : '+ex.message)
        
        response.status(400).json({'fehler' : true, 'nachricht' : ex.message})
    }

});

serviceRouter.get('/sale/allSoftware', function(request, response) {

    const saleDao = new SaleDao(request.app.locals.dbConnection);
    try {
        console.log("Service Sale : Get All Sale with Software")

        var allSaleSoftware = saleDao.loadAllSoftware()
        response.status(200).json(allSaleSoftware)

    } catch (ex) {
        console.log ('Service Produkt : Error Getting All Sale with Software. Exception occured : '+ex.message)
        
        response.status(400).json({'fehler' : true, 'nachricht' : ex.message})
    }

});

serviceRouter.get('/sale/allHardware', function(request, response) {

    const saleDao = new SaleDao(request.app.locals.dbConnection);
    try {
        console.log("Service Sale : Get All Sale with Hardware")

        var allSaleHardware = saleDao.loadAllHardware()
        response.status(200).json(allSaleHardware)

    } catch (ex) {
        console.log ('Service Produkt : Error Getting All Sale with Hardware. Exception occured : '+ex.message)
        
        response.status(400).json({'fehler' : true, 'nachricht' : ex.message})
    }

});

serviceRouter.get('/countdown/existiert/:id', function(request, response) {
    console.log('Service Countdown: Check ob ID existiert in Countdown' + request.params.id);

    const countdownDao = new CountdownDao(request.app.locals.dbConnection);
    try {
        var exists = countdownDao.loadById(request.params.id);
        console.log('Service Countdown : Check if record exists by id=' + request.params.id + ', exists=' + exists);
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

module.exports = serviceRouter;