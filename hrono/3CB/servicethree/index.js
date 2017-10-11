


const http = require('http');

http.createServer((req, res) => {
		res.end("Sofija time: " + Date.now());
}).listen(7000, () => {
	console.log('Server has started and listening on port: 7000');
});

