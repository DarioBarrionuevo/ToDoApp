const todoappModel = require('../models/todoapp-model');

module.exports = {
    getData: function (req, res) {
        todoappModel.getData()
            .then((result) => {
                // console.log('XX desde el controller', result);
                res.json(result);
            })
            .catch(err => console.log(err));
    },
    getTaskData: function (req, res) {
        const itemToGet = req.params.id;
        todoappModel.getTaskData(itemToGet)
            .then((result) => {
                // console.log('desde el controller', result[0].tarea);
                res.send(result[0].tarea);
            })
            .catch(err => console.log(err));
    },
    postData: function (req, res) {
        const postData = todoappModel.postData(req.body);
        // console.log('el controlador manda esto en el post', postData);
        res.send('¡Añadido!');
    },
    deleteData: function (req, res) {
        const deleteAll = todoappModel.deleteAllData();
        // console.log('el controlador manda esto en el deleteAll', deleteAll);
        res.send('¡Borrado!');
    },

    deleteTask: function (req, res) {
        // console.log('req es:', req.params.id);
        const itemToDelete = req.params.id;
        todoappModel.deleteTask(itemToDelete);
        res.send('¡Borrada una tarea!');
    },


    updateTask: function (req, res) {
        const itemToDelete = req.params.id;
        todoappModel.updateTask(itemToDelete);
        res.send('Actualizada una tarea!');

    },
    // toUpperCase: function (req, res) {
    //     const upper = req.param.id.toUpperCase();
    //     res.send(upper);
    // }
};