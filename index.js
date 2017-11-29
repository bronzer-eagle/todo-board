const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');

const Websocket = require('./app/websockets');
const db = require('./app/db');
const [authRoutes] = require('./app/routes/index');
const Helper = require('./app/helper');

const app = express();
const socket = new Websocket();
const PORT = process.env['PORT'] || 5000;

if (process.env.NODE_ENV !== 'production') {
	Helper.logger('NODE_ENV', process.env.NODE_ENV);
	Helper.logger('Loading .env file');

	dotenv.config();
} else {
	Helper.logger('NODE_ENV', process.env.NODE_ENV);
}

db.init();
socket.init();

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

	res.constructor.prototype.apiResponse = new Helper().apiResponse;

	next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
	res.send('Server is working')
});

app.listen(PORT, () => {
	Helper.logger('Todos application server is running on the port:', PORT);
});
