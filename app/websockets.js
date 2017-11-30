const socket = require('socket.io');
const jf = require('jsonfile');
const jwtAuth = require('socketio-jwt-auth');
const DB = require('./db');

class SocketServer {
	constructor(port = 3000) {
		this.port = port;
		this.db = new DB();
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

			// done is a callback, you can use it as follows
			User.findOne({id: payload.sub}, function(err, user) {
				if (err) {
					// return error
					return done(err);
				}
				if (!user) {
					// return fail with an error message
					return done(null, false, 'user does not exist');
				}
				// return success with a user info
				return done(null, user);
			});
		}));
	}

	_connectionHandler() {
		this.socket.on('connection', (client) => {

			console.log('Connected!');
			this.client = client;

			this._setListeners();
		});
	}

	_setListeners() {
		// Listen for test and disconnect events

		this.client.on('getTodos', this.sendTodos.bind(this));
		this.client.on('disconnect', () => {
			console.log('Received: disconnect event from client: ' + this.client.id);
		});
	}

	sendTodos() {
		const callback = (err, data) => {

			console.log('Sent todos');
			this.client.emit('setTodos', data);

			setTimeout(() => this.updateTodos(), 10000);
		};

		this.readJSON(callback);
	}

	updateTodos() {

		const callback = (err, data) => {

			data.push({
				"id": 3,
				"board_name": "Timeout test board",
				"tasks": [{
					"id": 5,
					"task_text": "foo",
					"is_completed": true
				}, {
					"id": 6,
					"task_text": "bar",
					"is_completed": false
				}]
			});

			console.log('Sent todos after timeout');

			this.client.emit('setTodos', data);
		};

		this.readJSON(callback);
	}

	readJSON(callback = function () {}) {
		jf.readFile('src/assets/todo-boards.json', (err, data) => {
			callback(err, data);
		});
	}
}

module.exports = SocketServer;
