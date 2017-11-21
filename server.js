const PORT = 3000;
let socket = require('socket.io')(PORT);
let fs = require('fs');
let jf = require('jsonfile');


socket.on('connection', function (client) {

	console.log('Connected!');

	// Listen for test and disconnect events
	client.on('test', onTest);
	client.on('disconnect', onDisconnect);
	client.on('getTodos', sendTodos);

	// Handle a test event from the client

	function onTest(data) {
		console.log('Received: "' + data + '" from client: ' + client.id);
		client.emit('test', "Cheers, " + client.id);
	}

// Handle a disconnection from the client
	function onDisconnect() {
		console.log('Received: disconnect event from client: ' + client.id);
		client.removeListener('test', onTest);
		client.removeListener('disconnect', onDisconnect);
	}

	function sendTodos() {
		// fs.watch("src/assets/todo-boards.json", function(event, fileName) { //watching my        sports.json file for any changes
		// 	//NOTE: fs.watch returns event twice on detecting change due to reason that editors fire 2 events --- there are workarounds for this on stackoverflow

		jf.readFile('src/assets/todo-boards.json', function (err, data) { //if change detected read the sports.json

			var data = data; //store in a var
			console.log('sent') //just for debugging
			socket.emit('setTodos', data); //emit to all clients

			setTimeout(() => {
				updateTodos();
			}, 10000)
		});

		// });
	}

	function updateTodos() {
		jf.readFile('src/assets/todo-boards.json', function (err, data) { //if change detected read the sports.json

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

			var data = data; //store in a var

			console.log('sent after timeout') //just for debugging
			socket.emit('setTodos', data); //emit to all clients
		});
	}


});
