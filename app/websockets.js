const socket = require('socket.io');
const jwtAuth = require('socketio-jwt-auth');
const Helper = require('./helper');

const DB = require('./db');

let self = null;

class SocketClient {
	constructor(client = {}) {
		this.client = client;

		this._setListeners();
	}

	_setListeners() {
		const BoardCtrl = require('./controllers/boards.controller');
		const boardCtrl = new BoardCtrl();

		this.client.on('getTodos', boardCtrl.sendBoardList.bind(boardCtrl));
		this.client.on('disconnect', () => {
			Helper.logger('Received: disconnect event from client: ' + this.client.id);
		});

		boardCtrl.sendBoardList();
	}
}

class SocketServer {
	constructor(port = 3000) {

		if (!self) {
			self = this;

			this.port = port;
			this.db = new DB();
		}

		return self;
	}

	init() {
		this.connect();
		this._setAuthMiddleware();
		this._connectionHandler();
	}

	connect() {
		this.socket = socket(this.port);
	}

	_setAuthMiddleware() {
		this.socket.use(jwtAuth.authenticate({
			secret: process.env.JWTSecret,
			succeedWithoutToken: true
		}, (payload, done) => {
			const User = this.db.getModel('User');

			User.findOne({id: payload.sub}, function (err, user) {
				if (err) {
					return done(err);
				}
				if (!user) {
					return done(null, false, 'user does not exist');
				}
				return done(null, user);
			});
		}));
	}

	_connectionHandler() {
		this.socket.on('connection', (client) => {
			Helper.logger(`Client ${client.id} is connected.`);
			new SocketClient(client);
		});
	}

	emit(path, data) {
		console.log('sent');
		this.socket.emit(path, data);
	}
}



module.exports = SocketServer;
