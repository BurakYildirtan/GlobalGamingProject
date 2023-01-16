const helper = require('../helper.js');
const SoftwareDao = require('../dao/softwareDao.js');
const express = require('express');
var serviceRouter = express.Router();

console.log('- Software Service');

serviceRouter.post('/software', function(request, response) {

    console.log('Service Software: Neue Software einfügen');
    var errorMsgs=[];

    if(helper.isUndefined(request.body.productId))
        errorMsgs.push('ID fehlt');
    
    if(helper.isUndefined(request.body.player))
        errorMsgs.push('spielerAnzahl fehlt');

    if(helper.isUndefined(request.body.genre))
        errorMsgs.push('Genre fehlt');
    
    if(helper.isUndefined(request.body.fsk))
        errorMsgs.push('FSK fehlt');

    if (errorMsgs.length > 0) {
        console.log('Service Software: Creation not possible, data missing');
        response.status(400).json({ 'fehler': true, 'nachricht': 'Funktion nicht möglich. Fehlende Daten: ' + helper.concatArray(errorMsgs) });
        return;
    }

    const softwareDao = new SoftwareDao(request.app.locals.dbConnection);
    try {
        console.log('Service Software DAO wird versucht anzubinden')
        var obj = softwareDao.create( request.body.productId, request.body.player, request.body.genre, request.body.fsk );
        console.log('Service Software: Software Hinzugefügt !');
        response.status(200).json(obj);

    } catch (ex) {
        console.error('Service Software: Error creating new record. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get('/software/all', function(request, response) {

    const softwareDao = new SoftwareDao(request.app.locals.dbConnection);
    try {
        console.log("Service Software : Get All Software")

        var allSoftware = softwareDao.loadAll()
        response.status(200).json(allSoftware)

    } catch (ex) {
        console.log ('Service Software: Error Getting All Software. Exception occured : '+ex.message)
        
        response.status(400).json({'fehler' : true, 'nachricht' : ex.message})
    }

});

serviceRouter.get('/software/allWithProduct', function(request, response) {

    const softwareDao = new SoftwareDao(request.app.locals.dbConnection);
    try {
        console.log("Service Sale : Get All With Product Software")

        var allSoftwareWithProduct = softwareDao.loadAllWithProduct()
        response.status(200).json(allSoftwareWithProduct)

    } catch (ex) {
        console.log ('Service Software: Error Getting All With Product Software. Exception occured : '+ex.message)
        
        response.status(400).json({'fehler' : true, 'nachricht' : ex.message})
    }

});

serviceRouter.get('/software/allWithProductAsc', function(request, response) {

    const softwareDao = new SoftwareDao(request.app.locals.dbConnection);
    try {
        console.log("Service Sale : Get All With Product Software")

        var allSoftwareWithProduct = softwareDao.loadAllWithProductAsc()
        response.status(200).json(allSoftwareWithProduct)

    } catch (ex) {
        console.log ('Service Software: Error Getting All With Product Software. Exception occured : '+ex.message)
        
        response.status(400).json({'fehler' : true, 'nachricht' : ex.message})
    }

});

serviceRouter.get('/software/allWithProductDesc', function(request, response) {

    const softwareDao = new SoftwareDao(request.app.locals.dbConnection);
    try {
        console.log("Service Sale : Get All With Product Software")

        var allSoftwareWithProduct = softwareDao.loadAllWithProductDesc()
        response.status(200).json(allSoftwareWithProduct)

    } catch (ex) {
        console.log ('Service Software: Error Getting All With Product Software. Exception occured : '+ex.message)
        
        response.status(400).json({'fehler' : true, 'nachricht' : ex.message})
    }

});

serviceRouter.get('/software/allWithProductDate', function(request, response) {

    const softwareDao = new SoftwareDao(request.app.locals.dbConnection);
    try {
        console.log("Service Sale : Get All With Product Software")

        var allSoftwareWithProduct = softwareDao.loadAllWithProductDate()
        response.status(200).json(allSoftwareWithProduct)

    } catch (ex) {
        console.log ('Service Software: Error Getting All With Product Software. Exception occured : '+ex.message)
        
        response.status(400).json({'fehler' : true, 'nachricht' : ex.message})
    }

});

serviceRouter.get('/software/delete/:id', function(request, response) {
    console.log('Service Software: Client requested deletion of record, id=' + request.params.id);

    const softwareDao = new SoftwareDao(request.app.locals.dbConnection);
    try {
        var obj = softwareDao.loadById(request.params.id)
        softwareDao.delete(request.params.id);
        console.log('Service Software: Deletion of record successfull, id=' + request.params.id);
        response.status(200).json({ 'gelöscht': true , 'delItem': obj });
    } catch (ex) {
        console.error(ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get('/software/existiert/:id', function(request, response) {
    console.log('\nService Software: Check ob ID existiert in Software' + request.params.id);

    const softwareDao = new SoftwareDao(request.app.locals.dbConnection);
    try {
        var exists = softwareDao.loadById(request.params.id);
        console.log('Service Software : Check if record exists by id=' + request.params.id + ', exists=' + exists);
        if(exists == undefined) {
            response.status(200).json(false);
        } else {
            response.status(200).json(true);
        }
    } catch (ex) {
        console.error('Service Software: Error checking if record exists. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});
serviceRouter.get('/software/get/:id', function(request, response) {

<<<<<<< HEAD
    const softwareDao = new SoftwareDao(request.app.locals.dbConnection);
    try {
        console.log("Service Software : Get Software")
        
        var id = request.params.id;
        var software = softwareDao.loadById(id)
        response.status(200).json(software)

    } catch (ex) {
        console.log ('Service Software : Error Getting Specific Software with id= '+id+'. Exception occured : '+ex.message)
        
        response.status(400).json({'fehler' : true, 'nachricht' : ex.message})
    }

});
=======
serviceRouter.post('/software/update', function(request, response) {
    console.log('Service Software: Check ob ID existiert in Software' + request.body.id);

    const softwareDao = new SoftwareDao(request.app.locals.dbConnection);
    try {
        var update = softwareDao.update(request.body.id,request.body.attribute,request.body.wert);
        console.log('Service Software : Check if record exists by id=' + request.body.id + ', exists=' + update);
        if(update == undefined) {
            response.status(200).json(false);
        } else {
            response.status(200).json(true);
        }
    } catch (ex) {
        console.error('Service Software: Error checking if record exists. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

>>>>>>> armin
module.exports = serviceRouter;