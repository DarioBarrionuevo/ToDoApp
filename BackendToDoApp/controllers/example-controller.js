const exampleModel = require('../models/example-model');

module.exports = {
    getData: function(req, res) {
        const getData = exampleModel.getData();
        res.send(getData);
    },
    postData: function(req, res) {
        const postData = exampleModel.postData(req.body);
        res.send('¡Añadido!');
    },
    deleteData: function(req, res) {
        const itemToDelete = req.params.id;
        const deleteData = exampleModel.deleteData(itemToDelete);
        res.send('¡Borrado!');
    },
    toUpperCase: function(req, res) {
        const upper = req.param.id.toUpperCase();
        res.send(upper);
    }
};