const mysql = require('mysql');
const connectionInfo = {
    host: 'localhost',
    user: 'root',
    password: 'babuinoAnonimo',
    database: 'todoapp_bbdd'
};

const todoappModel = {


    getData: function () {
        let data;
        const connection = mysql.createConnection(connectionInfo);
        connection.connect();
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM tareas;', function (err, rows) {
                if (err) {
                    reject(err);
                }
                data = rows;
                // console.log('Returned data is: ', rows);
                resolve(data);
            });
            connection.end();
        })
    },

    getTaskData: function (id) {
        let data;
        const connection = mysql.createConnection(connectionInfo);
        connection.connect();
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM tareas WHERE user_id = ${id};`, function (err, rows) {
                if (err) {
                    reject(err);
                }
                data = rows;
                // console.log('Returned data is: ', rows);
                resolve(data);
            });
            connection.end();
        })
    },

    postData: function (data) {
        const connection = mysql.createConnection(connectionInfo);
        connection.connect();
        // console.log('Datos guardados', data);

        connection.query(`INSERT INTO tareas (tarea)
        VALUES ('${data.valor}');`, function (err, rows, fields) {
            if (err) throw new Error('Error al conectar a BBDD', err);
            // console.log('Datos guardados', data);
        });

        connection.end();
    },

    deleteAllData: function () {
        const connection = mysql.createConnection(connectionInfo);
        connection.connect();

        connection.query('TRUNCATE TABLE tareas;', function (err, rows, fields) {
            if (err) throw new Error('Error al conectar a BBDD', err);
            // console.log('Datos borrados');
        });

        connection.end();
        return;
    },

    deleteTask: function (id) {
        const connection = mysql.createConnection(connectionInfo);
        connection.connect();

        connection.query(`DELETE FROM tareas
        WHERE user_id = ${id};`, function (err, rows, fields) {
            if (err) throw new Error('Error al conectar a BBDD', err);
            console.log('Datos actualizados');
        });

        connection.end();
    },

    updateTask: function (id) {
        const connection = mysql.createConnection(connectionInfo);
        connection.connect();
        // console.log('Datos guardados', data);
        connection.query(`UPDATE tareas SET completed = NOT completed
        WHERE user_id = ${id};`, function (err, rows, fields) {
            if (err) throw new Error('Error al conectar a BBDD', err);
            // console.log('Datos guardados', data);
        });

        connection.end();
    },
};

module.exports = todoappModel;