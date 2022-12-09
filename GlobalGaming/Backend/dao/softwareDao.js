const helper = require('../helper.js');

class SoftwareDao {

    constructor(dbConnection) {
        this._conn = dbConnection;
    }

    getConnection() {
        return this._conn;
    }

    create(id, players, genre) {
        //Definieren von SQL Statement mit Values
        var sql = 'INSERT INTO Software ( id, spielerAnzahl, genre) VALUES  (?,?,?)';

        //definieren von Statement zum ausführen als sql statement
        var statement = this._conn.prepare(sql);


        //Parameter der eingegebenen Produkt Details
        var params = [ id, players, genre ];

        //ausführen von insert statement
        var result = statement.run(params);


        //wenn nicht eingeführt werden konnte
        if (result.changes != 1) 
            throw new Error('Dateien konnten nicht Eingefügt werden ' + params);

        return this.loadById(id);
    }

    loadById(id) {

        var sql = 'SELECT * FROM Software WHERE id=?';
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);
        return result;
    }

    toString() {
        console.log('SoftwareDao [_conn=' + this._conn + ']');
    }
}

module.exports = SoftwareDao;