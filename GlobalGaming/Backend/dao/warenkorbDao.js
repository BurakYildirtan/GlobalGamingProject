const helper = require('../helper.js');

class WarenkorbDao {

    constructor(dbConnection) {
        this._conn = dbConnection;
    }

    getConnection() {
        return this._conn;
    }

    create(id) {
        //Definieren von SQL Statement mit Values
        var sql = 'INSERT INTO Warenkorb (produktId) VALUES  (?)';

        //definieren von Statement zum ausführen als sql statement
        var statement = this._conn.prepare(sql);


        //Parameter der eingegebenen Produkt Details
        var params = [ id ];

        //ausführen von insert statement
        var result = statement.run(params);


        //wenn nicht eingeführt werden konnte
        if (result.changes != 1) 
            throw new Error('Dateien konnten nicht Eingefügt werden ' + params);

        return this.loadById(id);
    }

    loadById(id) {

        var sql = 'SELECT * FROM Warenkorb WHERE id=?';
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);
        return result;
    }

    loadAll() {
        var sql = 'SELECT * FROM Warenkorb';
        var statement = this._conn.prepare(sql);
        var result = statement.all();
        return result;
    }
    add(id) {
        var sql = 'INSERT INTO Warenkorb (produktId) Values('+id+')';
        var statement = this._conn.prepare(sql);
        var result = statement.run();
        return result;
    }

    toString() {
        console.log('WarenkorbDao [_conn=' + this._conn + ']');
    }
}

module.exports = WarenkorbDao;