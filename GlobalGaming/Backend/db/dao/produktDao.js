const helper = require('../helper.js');
// const ProduktkategorieDao = require('./produktkategorieDao.js');
// const ProduktbildDao = require('./produktbildDao.js');

class ProduktDao {

    constructor(dbConnection) {
        this._conn = dbConnection;
    }

    getConnection() {
        return this._conn;
    }

    loadById(id) {
        // const produktkategorieDao = new ProduktkategorieDao(this._conn);
        // const produktbildDao = new ProduktbildDao(this._conn);

       

        // if (helper.isUndefined(result)) 
        //     throw new Error('No Record found by id=' + id);

        // result.kategorie = produktkategorieDao.loadById(result.kategorieId);
        // delete result.kategorieId;

        // result.bilder = produktbildDao.loadByParent(result.id);


        var sql = 'SELECT * FROM Produkt WHERE id=?';
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);
        return result;
    }

    loadAll() {
        /*
        const produktkategorieDao = new ProduktkategorieDao(this._conn);
        const produktbildDao = new ProduktbildDao(this._conn);

       

        if (helper.isArrayEmpty(result)) 
            return [];

        for (var i = 0; i < result.length; i++) {
            result[i].kategorie = produktkategorieDao.loadById(result[i].kategorieId);
            delete result[i].kategorieid;


            result[i].bilder = produktbildDao.loadByParent(result[i].id);


        }
        */
        var sql = 'SELECT * FROM Produkt';
        var statement = this._conn.prepare(sql);
        var result = statement.all();
        return result;
    }

    exists(id) {
        var sql = 'SELECT COUNT(id) AS cnt FROM Produkt WHERE id=?';
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (result.cnt == 1) 
            return true;

        return false;
    }


    // create(kategorieId = 1, bezeichnung = '', beschreibung = '',  details = null, nettopreis = 0.0,  bilder = []) {
    //     const produktbildDao = new ProduktbildDao(this._conn);

    //     var sql = 'INSERT INTO Produkt (kategorieId,bezeichnung,beschreibung,details,nettopreis) VALUES (?,?,?,?,?,?,?)';
    //     var statement = this._conn.prepare(sql);
    //     var params = [kategorieId, bezeichnung, beschreibung, details, nettopreis];
    //     var result = statement.run(params);

    //     if (result.changes != 1) 
    //         throw new Error('Could not insert new Record. Data: ' + params);

    //     if (bilder.length > 0) {
    //         for (var element of bilder) {
    //             produktbildDao.create(element.bildpfad, result.lastInsertRowid);
    //         }
    //     }

    //     return this.loadById(result.lastInsertRowid);
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

    // delete(id) {
    //     try {
    //         const produktbildDao = new ProduktbildDao(this._conn);
    //         produktbildDao.deleteByParent(id);

    //         var sql = 'DELETE FROM Produkt WHERE id=?';
    //         var statement = this._conn.prepare(sql);
    //         var result = statement.run(id);

    //         if (result.changes != 1) 
    //             throw new Error('Could not delete Record by id=' + id);

    //         return true;
    //     } catch (ex) {
    //         throw new Error('Could not delete Record by id=' + id + '. Reason: ' + ex.message);
    //     }
    // }

    toString() {
        console.log('ProduktDao [_conn=' + this._conn + ']');
    }
}

module.exports = ProduktDao;