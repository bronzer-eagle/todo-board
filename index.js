const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('express-jwt');

const Websocket = require('./app/websockets');
const DB = require('./app/db');
const Helper = require('./app/helper');

class Application {
	constructor() {
		this.PORT = process.env['PORT'] || 5000;
		this.ENV = process.env.NODE_ENV;
		this.socket = new Websocket();
		this.db = new DB();

		this.app = express();
	}

	init() {
		this._loadEnvironment();
		this._initComponents();
	}

	_loadEnvironment() {
		Helper.logger('NODE_ENV', this.ENV);

		if (this.ENV !== 'production') {
			Helper.logger('Loading .env file');
			dotenv.config();
		}
	}

	_initComponents() {
		this.db.init().then(() => {
			this.socket.init();

			this._setConfigs();
			this._setRoutes();
			this._listen();
		});
	}

	_setConfigs() {
		this.app.use((req, res, next) => {
			res.header("Access-Control-Allow-Origin", "*");
			res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

			res.constructor.prototype.apiResponse = new Helper().apiResponse;

			next();
		});

		this.app.use(jwt({ secret: process.env.JWTSecret}).unless({path: [/\/api\/auth\/\w*/]}));
		this.app.use(bodyParser.urlencoded({extended: true}));
		this.app.use(bodyParser.json());
	}

	_setRoutes() {
		const [
			authRoutes,
			boardsRoutes,
			tasksRoutes
		] = require('./app/routes/index');

		this.app.use('/api/auth', authRoutes);
		this.app.use('/api/boards', boardsRoutes);
		this.app.use('/api/boards/:boardId/tasks', tasksRoutes);

		this.app.get('/', (req, res) => {
			res.send('Server is working')
		});
	}

	_listen() {
		this.app.listen(this.PORT, () => {
			Helper.logger('Todos application server is running on the port:', this.PORT);
		});
	}
}

const app = new Application();

app.init();
