const helper = require('../helper.js');

class SoftwareDao {

    constructor(dbConnection) {
        this._conn = dbConnection;
    }

    getConnection() {
        return this._conn;
    }

    create(id, player, genre, fsk) {
        //Definieren von SQL Statement mit Values
        var sql = 'INSERT INTO Software ( id, spielerAnzahl, genre, fsk) VALUES  (?,?,?,?)';

        //definieren von Statement zum ausführen als sql statement
        var statement = this._conn.prepare(sql);


        //Parameter der eingegebenen Produkt Details
        var params = [ id, player, genre, fsk ];

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

    loadByIdWithProduct(id) {
        var sql = 'SELECT p.*,s.spielerAnzahl,s.genre ,s.fsk  FROM Produkt p INNER JOIN Software s ON p.id = s.id WHERE p.id=?'
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);
        return result;
    }

    loadAll() {
        var sql = 'SELECT * FROM Software';
        var statement = this._conn.prepare(sql);
        var result = statement.all();
        return result;
    }

    loadAllWithProduct() {
        var sql = 'SELECT p.*,s.spielerAnzahl,s.genre ,s.fsk  FROM Produkt p  INNER JOIN Software s ON p.id = s.id'
        var statement = this._conn.prepare(sql);
        var result = statement.all()
        return result;
    }

    toString() {
        console.log('SoftwareDao [_conn=' + this._conn + ']');
    }
}

module.exports = SoftwareDao;