const helper = require('../helper.js');
const CountdownDao = require('../dao/countdownDao.js');
const express = require('express');
var serviceRouter = express.Router();

console.log('- Countdown Service');

serviceRouter.post('/countdown', function(request, response) {

    console.log('Service Countdown: Neue Countdown einfügen');
    var errorMsgs=[];

    if(helper.isUndefined(request.body.salesId))
        errorMsgs.push('SalesID fehlt');
    
    if(helper.isUndefined(request.body.countdownTime))
        errorMsgs.push('countdownTime fehlt');

    if(helper.isUndefined(request.body.countdownPerCent))
        errorMsgs.push('countdownPerCent fehlt');
    
    if (errorMsgs.length > 0) {
        console.log('Service Countdown: Creation not possible, data missing');
        response.status(400).json({ 'fehler': true, 'nachricht': 'Funktion nicht möglich. Fehlende Daten: ' + helper.concatArray(errorMsgs) });
        return;
    }

    const countdownDao = new CountdownDao(request.app.locals.dbConnection);
    try {
        var obj = countdownDao.create( request.body.salesId, request.body.countdownTime, request.body.countdownPerCent );
        console.log('Service Countdown: Countdown Hinzugefügt !');
        response.status(200).json(obj);

    } catch (ex) {
        console.error('Service Countdown: Error creating new record. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

module.exports = serviceRouter;