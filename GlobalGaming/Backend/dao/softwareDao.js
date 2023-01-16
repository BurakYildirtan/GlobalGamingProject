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

    loadAllWithProductAsc() {
        var sql = 'SELECT p.*,s.spielerAnzahl,s.genre ,s.fsk  FROM Produkt p  INNER JOIN Software s ON p.id = s.id ORDER by p.nettoPreis asc'
        var statement = this._conn.prepare(sql);
        var result = statement.all()
        return result;
    }

    loadAllWithProductDesc() {
        var sql = 'SELECT p.*,s.spielerAnzahl,s.genre ,s.fsk  FROM Produkt p  INNER JOIN Software s ON p.id = s.id ORDER by p.nettoPreis desc'
        var statement = this._conn.prepare(sql);
        var result = statement.all()
        return result;
    }

    loadAllWithProductDate() {
        var sql = 'SELECT p.*,s.spielerAnzahl,s.genre ,s.fsk  FROM Produkt p  INNER JOIN Software s ON p.id = s.id ORDER  by p.erscheinungsDatum desc'
        var statement = this._conn.prepare(sql);
        var result = statement.all()
        return result;
    }

    delete(id) {
        try {
            var sql = 'DELETE FROM Software WHERE id= ?';
            var statement = this._conn.prepare(sql);
            var result = statement.run(id);

            if (result.changes != 1) 
                throw new Error('Software mit der ID =' + id+ ' konnte nicht gelöscht werden.');

            return true;
        } catch (ex) {
            throw new Error('Could not delete Record by id=' + id + '. Reason: ' + ex.message);
        }
    }

    update(id,attribute,wert){
        try {
            var sql = 'UPDATE software SET '+attribute+' = ? WHERE id= ?';
            var statement = this._conn.prepare(sql);
            //Parameter der eingegebenen softwareProdukt Details
            var params = [wert,id];

            //ausführen von insert statement
             var result = statement.run(params);

            if (result.changes != 1) 
                throw new Error('Software mit der ID =' + id+ ' konnte nicht geupdatet werden.');

            return true;
        } catch (ex) {
            throw new Error('Could not update Record by id=' + id + '. Reason: ' + ex.message);
        }
    }


}


module.exports = SoftwareDao;