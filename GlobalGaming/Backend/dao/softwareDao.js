const helper = require('../helper.js');
// const ProduktkategorieDao = require('./produktkategorieDao.js');
// const ProduktbildDao = require('./produktbildDao.js');

class SoftwareDao {

    constructor(dbConnection) {
        this._conn = dbConnection;
    }

    getConnection() {
        return this._conn;
    }

    create(id, players, price) {
        //Definieren von SQL Statement mit Values
        var sql = 'INSERT INTO Software ( id, spielerAnzahl, genre) VALUES  (?,?,?)';

        //definieren von Statement zum ausführen als sql statement
        var statement = this._conn.prepare(sql);


        //Parameter der eingegebenen Produkt Details
        var params = [ id, players, price ];

        //ausführen von insert statement
        var result = statement.run(params);


        //wenn nicht eingeführt werden konnte
        if (result.changes != 1) 
            throw new Error('Dateien konnten nicht Eingefügt werden ' + params);

        //zeigt das Produkt noch nicht wichtig
        // return this.loadById(result.lastInsertRowid);
    }


    getProductid()















    delete(id) {
        try {
            // const produktbildDao = new ProduktbildDao(this._conn);
            // produktbildDao.deleteByParent(id);

            var sql = 'DELETE FROM Produkt WHERE id=?';
            var statement = this._conn.prepare(sql);
            var result = statement.run(id);

            if (result.changes != 1) 
                throw new Error('Produkt mit der ID =' + id+ ' konnte nicht gelöscht werden.');

            return true;
        } catch (ex) {
            throw new Error('Could not delete Record by id=' + id + '. Reason: ' + ex.message);
        }
    }

    // loadById(id) {
    //     // const produktkategorieDao = new ProduktkategorieDao(this._conn);
    //     // const produktbildDao = new ProduktbildDao(this._conn);

       

    //     // if (helper.isUndefined(result)) 
    //     //     throw new Error('No Record found by id=' + id);

    //     // result.kategorie = produktkategorieDao.loadById(result.kategorieId);
    //     // delete result.kategorieId;

    //     // result.bilder = produktbildDao.loadByParent(result.id);


    //     var sql = 'SELECT * FROM Produkt WHERE id=?';
    //     var statement = this._conn.prepare(sql);
    //     var result = statement.get(id);
    //     return result;
    // }

    // loadAll() {
    //     /*
    //     const produktkategorieDao = new ProduktkategorieDao(this._conn);
    //     const produktbildDao = new ProduktbildDao(this._conn);

       

    //     if (helper.isArrayEmpty(result)) 
    //         return [];

    //     for (var i = 0; i < result.length; i++) {
    //         result[i].kategorie = produktkategorieDao.loadById(result[i].kategorieId);
    //         delete result[i].kategorieid;


    //         result[i].bilder = produktbildDao.loadByParent(result[i].id);


    //     }
    //     */
    //     var sql = 'SELECT * FROM Produkt';
    //     var statement = this._conn.prepare(sql);
    //     var result = statement.all();
    //     return result;
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