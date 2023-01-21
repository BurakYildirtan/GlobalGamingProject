const helper = require('../helper.js');
const WarenkorbDao = require('../dao/warenkorbDao.js');
const express = require('express');
var serviceRouter = express.Router();

console.log('- Warenkorb Service');

serviceRouter.post('/warenkorb', function(request, response) {

    console.log('Service warenkorb: Neue Artikel einfügen');
    var errorMsgs=[];

    if(helper.isUndefined(request.body.productId))
        errorMsgs.push('ID fehlt');
    

    if (errorMsgs.length > 0) {
        console.log('Service warenkorb: Creation not possible, data missing');
        response.status(400).json({ 'fehler': true, 'nachricht': 'Funktion nicht möglich. Fehlende Daten: ' + helper.concatArray(errorMsgs) });
        return;
    }

    const warenkorbDao = new WarenkorbDao(request.app.locals.dbConnection);
    try {
        console.log('Service Warenkorb DAO wird versucht anzubinden')
        var obj = warenkorbDao.create( request.body.productId);
        console.log('Service Warenkorb: warenkorb Hinzugefügt !');
        response.status(200).json(obj);

    } catch (ex) {
        console.error('Service Warenkorb: Error creating new record. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get('/warenkorb/all', function(request, response) {

    const warenkorbDao = new WarenkorbDao(request.app.locals.dbConnection);
    try {
        console.log("Service Warenkorb : Get All Warenkorb")

        var allArtikel = warenkorbDao.loadAll()
        response.status(200).json(allArtikel)

    } catch (ex) {
        console.log ('Service Warenkorb: Error Getting All Warenkorb. Exception occured : '+ex.message)
        
        response.status(400).json({'fehler' : true, 'nachricht' : ex.message})
    }

});

serviceRouter.get('/warenkorb/get/:id', function(request, response) {

    const warenkorbDao = new WarenkorbDao(request.app.locals.dbConnection);
    try {
        console.log("Service Warenkorb : Get Warenkorb")
        
        var id = request.params.id;
        var artikel = warenkorbDao.loadById(id)
        response.status(200).json(artikel)

    } catch (ex) {
        console.log ('Service Warenkorb : Error getting specific element of Warenkorb with id= '+id+'. Exception occured : '+ex.message)
        
        response.status(400).json({'fehler' : true, 'nachricht' : ex.message})
    }

});

serviceRouter.get('/warenkorb/add/:id', function(request, response) {

    const warenkorbDao = new WarenkorbDao(request.app.locals.dbConnection);
    try {
        console.log("Service Warenkorb : Add to Warenkorb")
        
        var id = request.params.id;
        warenkorbDao.add(id)
        response.status(200).json("artikel")

    } catch (ex) {
        console.log ('Service Warenkorb : Error adding element to Warenkorb with id= '+id+'. Exception occured : '+ex.message)
        
        response.status(400).json({'fehler' : true, 'nachricht' : ex.message})
    }

});
serviceRouter.get('/warenkorb/delete/:id', function(request, response) {
    console.log('Service Warenkorb: Client requested deletion of record, id=' + request.params.id);

    const warenkorbDao = new WarenkorbDao(request.app.locals.dbConnection);
    try {
        var obj = warenkorbDao.loadById(request.params.id)
        warenkorbDao.delete(request.params.id);
        console.log('Service Warenkorb: Deletion of record successfull, id=' + request.params.id);
        response.status(200).json({ 'gelöscht': true , 'delItem': obj });
    } catch (ex) {
        console.error(ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});
serviceRouter.get('/warenkorb/reduce/:id', function(request, response) {
    let id= request.params.id
    console.log('Service Warenkorb: Client requested deletion of record, id=' + request.params.id);
    
    const warenkorbDao = new WarenkorbDao(request.app.locals.dbConnection);
    try {
        
        var obj = warenkorbDao.loadById(id)
        warenkorbDao.reduce(id);
        console.log('Service Warenkorb: Deletion of record successfull, id=' + request.params.id);
        response.status(200).json({ 'gelöscht': true , 'delItem': obj });
    } catch (ex) {
        console.error(ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});





module.exports = serviceRouter;