const express = require('express');
const app = express();
const db = require('./src/persistence');
const getItems = require('./src/routes/getItems');
const addItem = require('./src/routes/addItem');
const updateItem = require('./src/routes/updateItem');
const deleteItem = require('./src/routes/deleteItem');

app.use(express.json());
app.use(express.static(__dirname + '/src/static'));

app.get('/items', getItems);
app.post('/items', addItem);
app.put('/items/:id', updateItem);
app.delete('/items/:id', deleteItem);

db.init().then(() => {
    app.listen(8080, () => console.log('Listening on port 8080'));
}).catch((err) => {
    console.error(err);
    process.exit(1);
});

const gracefulShutdown = () => {
    db.teardown()
        .catch(() => {})
        .then(() => process.exit());
};

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);
process.on('SIGUSR2', gracefulShutdown); // Sent by nodemon
