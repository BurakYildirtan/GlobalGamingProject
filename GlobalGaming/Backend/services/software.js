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
    
    if (errorMsgs.length > 0) {
        console.log('Service Software: Creation not possible, data missing');
        response.status(400).json({ 'fehler': true, 'nachricht': 'Funktion nicht möglich. Fehlende Daten: ' + helper.concatArray(errorMsgs) });
        return;
    }

    const softwareDao = new SoftwareDao(request.app.locals.dbConnection);
    try {
        var obj = softwareDao.create( request.body.productId, request.body.player, request.body.genre );
        console.log('Service Software: Software Hinzugefügt !');
        response.status(200).json(obj);

    } catch (ex) {
        console.error('Service Software: Error creating new record. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

module.exports = serviceRouter;