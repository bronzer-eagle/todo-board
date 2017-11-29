class Helper {

	static logger() {
		const logs = [...arguments];

		console.info(`${Helper.getLogTime()}:`);
		logs.forEach(log => console.log(log));
		console.log('=====================================');
	}

	static getLogTime() {
		const options = {
			hour: 'numeric',
			minute: 'numeric',
			second: 'numeric'
		};

		return new Date().toLocaleString("en-US", options)
	}

	apiResponse(status, data) {
		this.status(status).send(data);
	}
}

module.exports = Helper;
