const express = require('express');
const exampleRouter = require('./routes/example-route');

const app = express();

app.set('port', 3000);

app.use('/example', exampleRouter);

app.listen(app.get('port'), () => console.log('Running on ', app.get('port')));