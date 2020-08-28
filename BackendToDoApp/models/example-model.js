const mysql = require('mysql');
const connectionInfo = {
    host: 'localhost',
    user: 'dbuser',
    password: 'password',
    database: 'my_db'
};

const exampleModel = {
    getData: function() {
        let data;
        const connection = mysql.createConnection(connectionInfo);
        connection.connect();

        connection.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
        if (err) throw new Error('Error al conectar a BBDD', err);
        console.log('Returned data is: ', rows[0].solution);
        data = rows;
        });

        connection.end();
        return data;
    },
    postData: function(data) {
        const connection = mysql.createConnection(connectionInfo);
        connection.connect();

        connection.query('INSERT INTO...', function (err, rows, fields) {
        if (err) throw new Error('Error al conectar a BBDD', err);
        console.log('Datos guardados');
        });

        connection.end();
        return;
    },
    deleteData: function(id) {
        const connection = mysql.createConnection(connectionInfo);
        connection.connect();

        connection.query('DELETE ', function (err, rows, fields) {
        if (err) throw new Error('Error al conectar a BBDD', err);
        console.log('Datos borrados');
        });

        connection.end();
        return;
    }
};

module.exports = exampleModel;