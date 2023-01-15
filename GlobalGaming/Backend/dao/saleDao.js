const helper = require('../helper.js');

class SaleDao {

    constructor(dbConnection) {
        this._conn = dbConnection;
    }

    getConnection() {
        return this._conn;
    }

    create(productId, saleInPercent) {
        //Definieren von SQL Statement mit Values
        var sql = 'INSERT INTO Sale ( produktId, saleProzent) VALUES  (?,?)';

        //definieren von Statement zum ausführen als sql statement
        var statement = this._conn.prepare(sql);

        //Parameter der eingegebenen Produkt Details
        var params = [ productId, saleInPercent ];

        //ausführen von insert statement
        var result = statement.run(params);

        //wenn nicht eingeführt werden konnte
        if (result.changes != 1) 
            throw new Error('Dateien konnten nicht Eingefügt werden ' + params);

        return this.loadById(result.lastInsertRowid);
    }

    loadById(id) {
        var sql = 'SELECT * FROM Sale WHERE id=?';
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        return result;
    }

    loadByProductId(id) {
        var sql = 'SELECT * FROM Sale WHERE produktId=?';
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        return result;
    }

    loadByIdHardware(id) {
        var sql = 'SELECT p.*,h.leistung,h.hersteller,h.art,sl.id ,sl.saleProzent  FROM Produkt p INNER JOIN Hardware h ON p.id = h.id  INNER JOIN Sale sl  ON p.id =sl.produktId WHERE p.id = ?';
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        return result;

    }

    loadByIdSoftware(id) {
        var sql = 'Select p.*,s.spielerAnzahl,s.genre ,s.fsk  from Produkt p INNER JOIN Software s ON p.id = s.id INNER JOIN Sale s2 ON p.id =s2.produktId WHERE p.id = ?';
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        return result;

    }


    loadAll() {
        var sql = 'SELECT * FROM Sale';
        var statement = this._conn.prepare(sql);
        var result = statement.all();

        return result;
    }

    loadAllHardware() {
        var sql = 'SELECT p.*,h.leistung,h.hersteller,h.art,sl.id ,sl.saleProzent  FROM Produkt p INNER JOIN Hardware h ON p.id = h.id INNER JOIN Sale sl  ON p.id =sl.produktId'
        var statement = this._conn.prepare(sql);
        var result = statement.all();

        return result;

    }

    loadAllSoftware() {
        var sql = 'Select p.*,s.spielerAnzahl,s.genre ,s.fsk  from Produkt p INNER JOIN Software s ON p.id = s.id INNER JOIN Sale s2 ON p.id =s2.produktId'
        var statement = this._conn.prepare(sql)
        var result = statement.all()

        return result
    }

    delete(id) {
        try {
            var sql = 'DELETE FROM Sale WHERE id= ?';
            var statement = this._conn.prepare(sql);
            var result = statement.run(id);

            if (result.changes != 1) 
                throw new Error('Sale mit der ID =' + id+ ' konnte nicht gelöscht werden.');

            return true;
        } catch (ex) {
            throw new Error('Could not delete Record by id=' + id + '. Reason: ' + ex.message);
        }
    }


    toString() {
        console.log('SaleDao [_conn=' + this._conn + ']');
    }
}

module.exports = SaleDao;