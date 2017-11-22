const PORT = 3000;
let socket = require('socket.io')(PORT);
let fs = require('fs');
let jf = require('jsonfile');


socket.on('connection', function (client) {

	console.log('Connected!');

	// Listen for test and disconnect events
	client.on('signUp', signUp);
	client.on('signIn', signIn);
	client.on('getTodos', sendTodos);

	client.on('disconnect', () => {
		console.log('Received: disconnect event from client: ' + client.id);
	});

	// Handle a test event from the client

	function signUp(data) {
		console.log(`Hello ${data.firstName} ${data.lastName}`);

		client.emit('signUp', "Successfully registered");
	}

	function signIn(data) {
		const email = 'admin@admin.com';
		const pass = '123';

		if (data.email !== email || data.password !== pass) {
			console.log("Failed to login");
			client.emit('signIn', {error: "Failed to login"});
		} else {
			console.log(`Hello user`);
			client.emit('signIn', "Successfully signed in");
		}
	}

	function sendTodos() {

		const callback = (err, data) => {

			console.log('Sent todos');
			socket.emit('setTodos', data);

			setTimeout(() => updateTodos(), 10000);
		};

		readJSON(callback);
	}

	function updateTodos() {

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

			socket.emit('setTodos', data);
		};

		readJSON(callback);
	}

	function readJSON(callback = () => {}) {
		jf.readFile('src/assets/todo-boards.json', function (err, data) {
			callback(err, data);
		});
	}
});
