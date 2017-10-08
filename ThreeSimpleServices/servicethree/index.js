const http = require('http');

const app = http.createServer((req,res) => {

		res.end("Time in milisecunds from service three: " + Date.now());
		
});


app.listen(7000 , () => {
	// place for service registration...
	console.log("Server started and is listening on port: %s" , 7000);
	
});
