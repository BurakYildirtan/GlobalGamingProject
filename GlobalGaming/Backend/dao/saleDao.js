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

    toString() {
        console.log('SaleDao [_conn=' + this._conn + ']');
    }
}

module.exports = SaleDao;