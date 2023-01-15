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

serviceRouter.get('/countdown/all', function(request, response) {

    const countdownDao = new CountdownDao(request.app.locals.dbConnection);
    try {
        console.log("Service Countdown : Get All Countdown")

        var allCountdown = countdownDao.loadAll()
        response.status(200).json(allCountdown)

    } catch (ex) {
        console.log ('Service Countdown : Error Getting All Countdown. Exception occured : '+ex.message)
        
        response.status(400).json({'fehler' : true, 'nachricht' : ex.message})
    }
});

serviceRouter.get('/countdown/allSoftware', function(request, response) {

    const countdownDao = new CountdownDao(request.app.locals.dbConnection);
    try {
        console.log("Service Countdown : Get All Countdown Software")

        var allCountdownSoftware = countdownDao.loadAllSoftware()
        response.status(200).json(allCountdownSoftware)

    } catch (ex) {
        console.log ('Service Countdown : Error Getting All Countdown Software. Exception occured : '+ex.message)
        
        response.status(400).json({'fehler' : true, 'nachricht' : ex.message})
    }
});

serviceRouter.get('/countdown/allHardware', function(request, response) {

    const countdownDao = new CountdownDao(request.app.locals.dbConnection);
    try {
        console.log("Service Countdown : Get All Countdown Hardware")

        var allCountdownHardware = countdownDao.loadAllHardware()
        response.status(200).json(allCountdownHardware)

    } catch (ex) {
        console.log ('Service Countdown : Error Getting All Countdown Hardware. Exception occured : '+ex.message)
        
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
        console.error('Service Countdown: Error checking if record exists. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get('/countdown/delete/:id', function(request, response) {
    console.log('Service Countdown: Client requested deletion of record, id=' + request.params.id);

    const countdownDao = new CountdownDao(request.app.locals.dbConnection);
    try {
        var obj = countdownDao.loadById(request.params.id)
        countdownDao.delete(request.params.id);
        console.log('Service Countdown: Deletion of record successfull, id=' + request.params.id);
        response.status(200).json({ 'gelöscht': true , 'delItem': obj });
    } catch (ex) {
        console.error(ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});



module.exports = serviceRouter;