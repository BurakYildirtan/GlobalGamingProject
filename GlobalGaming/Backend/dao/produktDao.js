const helper = require('../helper.js');

class ProduktDao {

    constructor(dbConnection) {
        this._conn = dbConnection;
    }

    getConnection() {
        return this._conn;
    }

    create( title, price, picturePath, realeaseDate ) {
        //Definieren von SQL Statement mit Values
        var sql = 'INSERT INTO Produkt ( titel, nettoPreis, bildpfad, erscheinungsDatum ) VALUES  (?,?,?,?)';

        //definieren von Statement zum ausführen als sql statement
        var statement = this._conn.prepare(sql);

        //Parameter der eingegebenen Produkt Details
        var params = [ title, price, picturePath, realeaseDate ];

        //ausführen von insert statement
        var result = statement.run(params);

        //wenn nicht eingeführt werden konnte
        if ( result.changes != 1 ) 
            throw new Error('Dateien konnten nicht Eingefügt werden ' + params);

        return this.loadById(result.lastInsertRowid);
    }

    loadById(id) {
        var sql = 'SELECT * FROM Produkt WHERE id=?';
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (helper.isUndefined(result)) 
            throw new Error('No Record found by id=' + id);
            console.log('Hier loadbyId return aus der man id nehmen kann: '+result.id);
        return result;
    }

    loadAll() {
        var sql = 'SELECT * FROM Produkt';
        var statement = this._conn.prepare(sql);
        var result = statement.all();
        return result;
    }

    delete(id) {
        try {
            var sql = 'DELETE FROM Produkt WHERE id= ?';
            var statement = this._conn.prepare(sql);
            var result = statement.run(id);

            if (result.changes != 1) 
                throw new Error('Produkt mit der ID =' + id+ ' konnte nicht gelöscht werden.');

            return true;
        } catch (ex) {
            throw new Error('Could not delete Record by id=' + id + '. Reason: ' + ex.message);
        }
    }

    update(id,attribute,wert){
        try {
            console.log(id)
            var sql = 'UPDATE produkt SET ? = ? WHERE id= ?';
            var statement = this._conn.prepare(sql);
            //Parameter der eingegebenen Produkt Details
            var params = [attribute, wert, id];

            //ausführen von insert statement
             var result = statement.run(params);

            if (result.changes != 1) 
                throw new Error('Produkt mit der ID =' + id+ ' konnte nicht geupdatet werden.');

            return true;
        } catch (ex) {
            throw new Error('Could not update Record by id=' + id + '. Reason: ' + ex.message);
        }
    }















    // delete(id) {
    //     try {
    //         // const produktbildDao = new ProduktbildDao(this._conn);
    //         // produktbildDao.deleteByParent(id);

    //         var sql = 'DELETE FROM Produkt WHERE id=?';
    //         var statement = this._conn.prepare(sql);
    //         var result = statement.run(id);

    //         if (result.changes != 1) 
    //             throw new Error('Produkt mit der ID =' + id+ ' konnte nicht gelöscht werden.');

    //         return true;
    //     } catch (ex) {
    //         throw new Error('Could not delete Record by id=' + id + '. Reason: ' + ex.message);
    //     }
    // }

    // update(id, kategorieId = 1, bezeichnung = '', beschreibung = '', details = null, nettopreis = 0.0, bilder = []) {
    //     const produktbildDao = new ProduktbildDao(this._conn);
    //     produktbildDao.deleteByParent(id);

    //     var sql = 'UPDATE Produkt SET kategorieId=?,bezeichnung=?,beschreibung=?,details=?,nettopreis=? WHERE id=?';
    //     var statement = this._conn.prepare(sql);
    //     var params = [kategorieId, bezeichnung, beschreibung, details, nettopreis, id];
    //     var result = statement.run(params);

    //     if (result.changes != 1) 
    //         throw new Error('Could not update existing Record. Data: ' + params);

    //     if (bilder.length > 0) {
    //         for (var element of bilder) {
    //             produktbildDao.create(element.bildpfad, id);
    //         }
    //     }

    //     return this.loadById(id);
    // }

    toString() {
        console.log('ProduktDao [_conn=' + this._conn + ']');
    }
}

module.exports = ProduktDao;