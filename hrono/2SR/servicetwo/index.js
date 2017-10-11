

const express = require('express');
const app = express();

app.get('/',(req,res,next) => {
		res.end("Skopje time: " + Date.now());
}).listen(6000 , () => { console.log('Service is up and listening on port 6000') });
