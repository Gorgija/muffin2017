const http = require('http');

const app = http.createServer((req,res) => {

		res.end("Time in milisecunds from service two: " + Date.now());
		
});


app.listen(6000 , () => {
	// Place for service registration...
	console.log("Server started and is listening on port: %s" , 6000);
	
});
