const express = require('express');
const todoappRouter = require('./routes/todoapp-route.js');
const cors = require("cors");

const app = express();
app.use(cors());

// Para parsear application/json
app.use(express.json());



app.set('port', 3000);

app.use('/', todoappRouter);

app.listen(app.get('port'), () => console.log('Running on ', app.get('port')));