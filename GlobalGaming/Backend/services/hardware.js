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

    if(helper.isUndefined(request.body.producer))
        errorMsgs.push('Producer fehlt');

    if(helper.isUndefined(request.body.type))
        errorMsgs.push('Art fehlt');

    if (errorMsgs.length > 0) {
        console.log('Service Hardware: Creation not possible, data missing');
        response.status(400).json({ 'fehler': true, 'nachricht': 'Funktion nicht möglich. Fehlende Daten: ' + helper.concatArray(errorMsgs) });
        return;
    }

    const hardwareDao = new HardwareDao(request.app.locals.dbConnection);
    try {
        var obj = hardwareDao.create(request.body.productId, request.body.performance, request.body.producer, request.body.type);
        console.log('Service Hardware: Record inserted');
        response.status(200).json(obj);

    } catch (ex) {
        console.error('Service Hardware: Error creating new record. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get('/hardware/all', function(request, response) {

    const hardwareDao = new HardwareDao(request.app.locals.dbConnection);
    try {
        console.log("Service Hardware : Get All Hardware")

        var allHardware = hardwareDao.loadAll()
        response.status(200).json(allHardware)

    } catch (ex) {
        console.log ('Service Hardware : Error Getting All Hardware. Exception occured : '+ex.message)
        
        response.status(400).json({'fehler' : true, 'nachricht' : ex.message})
    }

});

serviceRouter.get('/hardware/allWithProduct', function(request, response) {

    const hardwareDao = new HardwareDao(request.app.locals.dbConnection);
    try {
        console.log("Service Hardware : Get All with Product DATA Hardware")

        var allHardwareWithProduct = hardwareDao.loadAllwithProduct()
        response.status(200).json(allHardwareWithProduct)

    } catch (ex) {
        console.log ('Service Hardware : Error Getting All withP Product DATA Hardware. Exception occured : '+ex.message)
        
        response.status(400).json({'fehler' : true, 'nachricht' : ex.message})
    }

});

serviceRouter.get('/hardware/allWithProductSortedPriceAsc', function(request, response) {

    const hardwareDao = new HardwareDao(request.app.locals.dbConnection);
    try {
        console.log("Service Hardware : Get All with Product DATA Hardware")

        var allHardwareWithProduct = hardwareDao.allWithProductSortedPriceAsc()
        response.status(200).json(allHardwareWithProduct)

    } catch (ex) {
        console.log ('Service Hardware : Error Getting All withP Product DATA Hardware. Exception occured : '+ex.message)
        
        response.status(400).json({'fehler' : true, 'nachricht' : ex.message})
    }

});

serviceRouter.get('/hardware/allWithProductSortedPriceDesc', function(request, response) {

    const hardwareDao = new HardwareDao(request.app.locals.dbConnection);
    try {
        console.log("Service Hardware : Get All with Product DATA Hardware")

        var allHardwareWithProduct = hardwareDao.allWithProductSortedPriceDesc()
        response.status(200).json(allHardwareWithProduct)

    } catch (ex) {
        console.log ('Service Hardware : Error Getting All withP Product DATA Hardware. Exception occured : '+ex.message)
        
        response.status(400).json({'fehler' : true, 'nachricht' : ex.message})
    }

});

serviceRouter.get('/hardware/allWithProductSortedDate', function(request, response) {

    const hardwareDao = new HardwareDao(request.app.locals.dbConnection);
    try {
        console.log("Service Hardware : Get All with Product DATA Hardware")

        var allHardwareWithProduct = hardwareDao.allWithProductSortedDate()
        response.status(200).json(allHardwareWithProduct)

    } catch (ex) {
        console.log ('Service Hardware : Error Getting All withP Product DATA Hardware. Exception occured : '+ex.message)
        
        response.status(400).json({'fehler' : true, 'nachricht' : ex.message})
    }

});

serviceRouter.post('/hardware', function(request, response) {

    console.log('Service Hardware: Neue Hardware einfügen');
    var errorMsgs=[];

    if(helper.isUndefined(request.body.productId))
        errorMsgs.push('ID fehlt');
    
    if(helper.isUndefined(request.body.performance))
        errorMsgs.push('Leistung fehlt');

    if(helper.isUndefined(request.body.producer))
        errorMsgs.push('Producer fehlt');

    if(helper.isUndefined(request.body.type))
        errorMsgs.push('Art fehlt');

    if (errorMsgs.length > 0) {
        console.log('Service Hardware: Creation not possible, data missing');
        response.status(400).json({ 'fehler': true, 'nachricht': 'Funktion nicht möglich. Fehlende Daten: ' + helper.concatArray(errorMsgs) });
        return;
    }

    const hardwareDao = new HardwareDao(request.app.locals.dbConnection);
    try {
        var obj = hardwareDao.create(request.body.productId, request.body.performance, request.body.producer, request.body.type);
        console.log('Service Hardware: Record inserted');
        response.status(200).json(obj);

    } catch (ex) {
        console.error('Service Hardware: Error creating new record. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get('/hardware/all', function(request, response) {

    const hardwareDao = new HardwareDao(request.app.locals.dbConnection);
    try {
        console.log("Service Hardware : Get All Hardware")

        var allHardware = hardwareDao.loadAll()
        response.status(200).json(allHardware)

    } catch (ex) {
        console.log ('Service Hardware : Error Getting All Hardware. Exception occured : '+ex.message)
        
        response.status(400).json({'fehler' : true, 'nachricht' : ex.message})
    }

});

serviceRouter.get('/hardware/allWithProduct', function(request, response) {

    const hardwareDao = new HardwareDao(request.app.locals.dbConnection);
    try {
        console.log("Service Hardware : Get All with Product DATA Hardware")

        var allHardwareWithProduct = hardwareDao.loadAllwithProduct()
        response.status(200).json(allHardwareWithProduct)

    } catch (ex) {
        console.log ('Service Hardware : Error Getting All withP Product DATA Hardware. Exception occured : '+ex.message)
        
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

serviceRouter.get('/hardware/allWithProductSortedPriceAsc', function(request, response) {

    const hardwareDao = new HardwareDao(request.app.locals.dbConnection);
    try {
        console.log("Service Hardware : Get All with Product DATA Hardware")

        var allHardwareWithProduct = hardwareDao.allWithProductSortedPriceAsc()
        response.status(200).json(allHardwareWithProduct)

    } catch (ex) {
        console.log ('Service Hardware : Error Getting All withP Product DATA Hardware. Exception occured : '+ex.message)
        
        response.status(400).json({'fehler' : true, 'nachricht' : ex.message})
    }

});

serviceRouter.get('/hardware/allWithProductSortedPriceDesc', function(request, response) {

    const hardwareDao = new HardwareDao(request.app.locals.dbConnection);
    try {
        console.log("Service Hardware : Get All with Product DATA Hardware")

        var allHardwareWithProduct = hardwareDao.allWithProductSortedPriceDesc()
        response.status(200).json(allHardwareWithProduct)

    } catch (ex) {
        console.log ('Service Hardware : Error Getting All withP Product DATA Hardware. Exception occured : '+ex.message)
        
        response.status(400).json({'fehler' : true, 'nachricht' : ex.message})
    }

});

serviceRouter.get('/hardware/allWithProductSortedDate', function(request, response) {

    const hardwareDao = new HardwareDao(request.app.locals.dbConnection);
    try {
        console.log("Service Hardware : Get All with Product DATA Hardware")

        var allHardwareWithProduct = hardwareDao.allWithProductSortedDate()
        response.status(200).json(allHardwareWithProduct)

    } catch (ex) {
        console.log ('Service Hardware : Error Getting All withP Product DATA Hardware. Exception occured : '+ex.message)
        
        response.status(400).json({'fehler' : true, 'nachricht' : ex.message})
    }

});

module.exports = serviceRouter;