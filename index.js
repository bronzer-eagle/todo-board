const express = require('express');
const Websocket = require('./app/websockets');
const db = require('./app/db');
const [authRoutes] = require('./app/routes/index');
const bodyParser = require('body-parser');

const
app = express();
const socket = new Websocket();

db.init();
socket.init();

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
	res.send('hello')
});

app.listen(5000, () => {
	console.log('Test server is running');
});
