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

module.exports = serviceRouter;