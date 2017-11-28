const socket = require('socket.io');
const jf = require('jsonfile');

class SocketServer {
	constructor(port = 3000) {
		this.port = port;
	}

	init() {
		this.connect();
		this._connectionHandler();
	}

	connect() {
		this.socket = socket(this.port);
	}

	_connectionHandler() {
		this.socket.on('connection', (client) => {

			console.log('Connected!');

			this.client = client;

			// Listen for test and disconnect events
			this.client.on('signUp', this.signUp.bind(this));
			this.client.on('signIn', this.signIn.bind(this));
			this.client.on('getTodos', this.sendTodos.bind(this));
			this.client.on('disconnect', () => {
				console.log('Received: disconnect event from client: ' + this.client.id);
			});
		});
	}

	// Handlers

	signUp(data) {
		console.log(`Hello ${data.firstName} ${data.lastName}`);

		this.client.emit('signUp', "Successfully registered");
	}

	signIn(data) {
		const email = 'admin@admin.com';
		const pass = '123';

		setTimeout(() => {
			if (data.email !== email || data.password !== pass) {
				console.log("Failed to login");
				this.client.emit('signIn', {error: "Failed to login"});
			} else {
				console.log(`Hello user`);
				this.client.emit('signIn', "Successfully signed in");
			}
		}, 2000);
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

	readJSON(callback = () => {}) {
		jf.readFile('src/assets/todo-boards.json', (err, data) => {
			callback(err, data);
		});
	}
}

module.exports = SocketServer;
