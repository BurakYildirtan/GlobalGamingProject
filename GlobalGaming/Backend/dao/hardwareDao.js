const helper = require('../helper.js');

class HardwareDao {

    constructor(dbConnection) {
        this._conn = dbConnection;
    }

    getConnection() {
        return this._conn;
    }

    create(id, performance, producer, type ) {
        //Definieren von SQL Statement mit Values
        var sql = 'INSERT INTO Hardware ( id, leistung, hersteller, art) VALUES  (?,?,?,?)';

        //definieren von Statement zum ausführen als sql statement
        var statement = this._conn.prepare(sql);


        //Parameter der eingegebenen Produkt Details
        var params = [ id, performance, producer, type];

        //ausführen von insert statement
        var result = statement.run(params);


        //wenn nicht eingeführt werden konnte
        if (result.changes != 1) 
            throw new Error('Dateien konnten nicht Eingefügt werden ' + params);

        return this.loadById(id);
    }

    loadById(id) {
        var sql = 'SELECT * FROM Hardware WHERE id=?';
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);
        return result;
    } 

    loadByIdWithProduct(id) {
        var sql = 'Select p.*,h.leistung,h.hersteller,h.art  from Produkt p INNER JOIN Hardware h on p.id = h.id WHERE p.id=?';
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);
        return result;
    } 
    
    loadAll() {
        var sql = 'SELECT * FROM Hardware';
        var statement = this._conn.prepare(sql);
        var result = statement.all();
        return result;
    }

    toString() {
        console.log('HardwareDao [_conn=' + this._conn + ']');
    }

    loadAllwithProduct() {
        var sql = 'SELECT p.*, h.leistung, h.hersteller, h.art  FROM Produkt p INNER JOIN Hardware h ON p.id = h.id'
        var statement = this._conn.prepare(sql);
        var result = statement.all();
        return result;
    }

    allWithProductSortedPriceAsc(){
        var sql = 'select p.*,h.leistung ,h.hersteller ,h.art  from Produkt p inner join Hardware h on p.id = h.id ORDER by p.nettoPreis asc'
        var statement = this._conn.prepare(sql);
        var result = statement.all();
        return result;
    }
    allWithProductSortedPriceDesc(){
        var sql = 'select p.*,h.leistung ,h.hersteller ,h.art  from Produkt p inner join Hardware h on p.id = h.id ORDER by p.nettoPreis desc'
        var statement = this._conn.prepare(sql);
        var result = statement.all();
        return result;
    }

    allWithProductSortedDate(){
        var sql = 'select p.*,h.leistung ,h.hersteller ,h.art  from Produkt p inner join Hardware h on p.id = h.id ORDER  by p.erscheinungsDatum desc'
        var statement = this._conn.prepare(sql);
        var result = statement.all();
        return result;
    }

    delete(id) {
        try {
            var sql = 'DELETE FROM Hardware WHERE id= ?';
            var statement = this._conn.prepare(sql);
            var result = statement.run(id);

            if (result.changes != 1) 
                throw new Error('Hardware mit der ID =' + id+ ' konnte nicht gelöscht werden.');

            return true;
        } catch (ex) {
            throw new Error('Could not delete Record by id=' + id + '. Reason: ' + ex.message);
        }
    }
}

module.exports = HardwareDao;