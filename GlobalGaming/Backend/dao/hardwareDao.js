const helper = require('../helper.js');

class HardwareDao {

    constructor(dbConnection) {
        this._conn = dbConnection;
    }

    getConnection() {
        return this._conn;
    }

    create(id, performance, producer ) {
        //Definieren von SQL Statement mit Values
        var sql = 'INSERT INTO Hardware ( id, leistung, hersteller) VALUES  (?,?,?)';

        //definieren von Statement zum ausführen als sql statement
        var statement = this._conn.prepare(sql);


        //Parameter der eingegebenen Produkt Details
        var params = [ id, performance, producer];

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
    
    loadAll() {
        var sql = 'SELECT * FROM Hardware';
        var statement = this._conn.prepare(sql);
        var result = statement.all();
        return result;
    }

    toString() {
        console.log('HardwareDao [_conn=' + this._conn + ']');
    }
}

module.exports = HardwareDao;