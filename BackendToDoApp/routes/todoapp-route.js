const express = require('express');
const todoappController = require('../controllers/todoapp-controller.js');
const router = express.Router();

// ROUTES

// GET data
router.get('/verTareas', todoappController.getData);

// GET data from one task
router.get('/verTarea/:id', todoappController.getTaskData);

// POST data
router.post('/addTask', todoappController.postData);

//DELETE all
router.delete('/deleteAll', todoappController.deleteData);

// DELETE data
router.delete('/delete/:id', todoappController.deleteTask);

module.exports = router;