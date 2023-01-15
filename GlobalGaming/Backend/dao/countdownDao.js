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

    loadByIdSoftware(id) {
        var sql = 'Select p.*,s.spielerAnzahl,s.genre ,s.fsk,sl2.id,c1.countdownZeit ,c1.extraProzent  from Produkt p INNER JOIN Software s ON p.id = s.id INNER JOIN Sale sl2 ON p.id =sl2.produktId INNER JOIN Countdown c1 on sl2.id = c1.id WHERE sl2.id = ?';
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);
        return result;
    }

    loadByIdSoftware(id) {
        var sql = 'Select p.*,h.leistung,h.hersteller,h.art,sl.id ,sl.saleProzent,c.countdownZeit,c.extraProzent  from Produkt p INNER JOIN Hardware h on p.id = h.id INNER JOIN Sale sl  on p.id =sl.produktId INNER JOIN Countdown c on sl.id = c.id WHERE sl.id = ?';
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);
        return result;
    }

    loadAll() {
        var sql = 'SELECT * FROM Countdown';
        var statement = this._conn.prepare(sql);
        var result = statement.all();
        return result;
    }

    loadAllHardware() {
        var sql = 'Select p.*,h.leistung,h.hersteller,h.art,sl.id ,sl.saleProzent,c.countdownZeit,c.extraProzent  from Produkt p INNER JOIN Hardware h on p.id = h.id  INNER JOIN Sale sl  on p.id =sl.produktId INNER JOIN Countdown c on sl.id = c.id '
        var statement = this._conn.prepare(sql)
        var result = statement.all();

        return result
    }

    loadAllSoftware() {
        var sql = 'Select p.*,s.spielerAnzahl,s.genre ,s.fsk,sl2.id,c1.countdownZeit ,c1.extraProzent  from Produkt p INNER JOIN Software s ON p.id = s.id INNER JOIN Sale sl2 ON p.id =sl2.produktId INNER JOIN Countdown c1 on sl2.id = c1.id '
        var statement = this._conn.prepare(sql)
        var result = statement.all();

        return result
    }

    delete(id) {
        try {
            var sql = 'DELETE FROM Countdown WHERE id= ?';
            var statement = this._conn.prepare(sql);
            var result = statement.run(id);

            if (result.changes != 1) 
                throw new Error('Countdown mit der ID =' + id+ ' konnte nicht gelöscht werden.');

            return true;
        } catch (ex) {
            throw new Error('Could not delete Record by id=' + id + '. Reason: ' + ex.message);
        }
    }

    toString() {
        var sql=''
    }
}

module.exports = CountdownDao;