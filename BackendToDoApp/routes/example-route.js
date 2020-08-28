const express = require('express');
const exampleController = require('../controllers/example-controller');
const router = express.Router();

// ROUTES
// GET data
router.get('/endpoint', exampleController.getData);

// POST data
router.post('/endpoint', exampleController.postData);

// DELETE data
router.delete('/endpoint/:id', exampleController.deleteData);

module.exports = router;