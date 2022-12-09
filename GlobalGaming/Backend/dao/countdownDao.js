const helper = require('../helper.js');

class CountdownDao {

    constructor(dbConnection) {
        this._conn = dbConnection;
    }

    getConnection() {
        return this._conn;
    }

    create(salesId, countdownTime, countdownPerCent ) {
        //Definieren von SQL Statement mit Values
        var sql = 'INSERT INTO Countdown ( id, countdownZeit, extraProzent ) VALUES  (?,?,?)';

        //definieren von Statement zum ausführen als sql statement
        var statement = this._conn.prepare(sql);


        //Parameter der eingegebenen Produkt Details
        var params = [ salesId, countdownTime, countdownPerCent ];

        //ausführen von insert statement
        var result = statement.run(params);


        //wenn nicht eingeführt werden konnte
        if (result.changes != 1) 
            throw new Error('Dateien konnten nicht Eingefügt werden ' + params);

        return this.loadById(salesId);
    }

    loadById(id) {
        var sql = 'SELECT * FROM Countdown WHERE id=?';
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);
        return result;
    }

    toString() {
        console.log('CountdownDao [_conn=' + this._conn + ']');
    }
}

module.exports = CountdownDao;