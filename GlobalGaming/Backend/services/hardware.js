const helper = require('../helper.js');
const HardwareDao = require('../dao/hardwareDao.js')
const express = require('express');
var serviceRouter = express.Router();

console.log('- Service Hardware');

serviceRouter.post('/hardware', function(request, response) {

    console.log('Service Hardware: Neue Hardware einfügen');
    var errorMsgs=[];

    if(helper.isUndefined(request.body.productId))
        errorMsgs.push('ID fehlt');
    
    if(helper.isUndefined(request.body.performance))
        errorMsgs.push('Leistung fehlt');

    if(helper.isUndefined(request.body.releaseDate))
        errorMsgs.push('Erscheinungsdatum fehlt');

    if (errorMsgs.length > 0) {
        console.log('Service Hardware: Creation not possible, data missing');
        response.status(400).json({ 'fehler': true, 'nachricht': 'Funktion nicht möglich. Fehlende Daten: ' + helper.concatArray(errorMsgs) });
        return;
    }

    const hardwareDao = new HardwareDao(request.app.locals.dbConnection);
    try {
        var obj = hardwareDao.create(request.body.productId, request.body.performance, request.body.releaseDate);
        console.log('Service Hardware: Record inserted');
        response.status(200).json(obj);

    } catch (ex) {
        console.error('Service Hardware: Error creating new record. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

module.exports = serviceRouter;