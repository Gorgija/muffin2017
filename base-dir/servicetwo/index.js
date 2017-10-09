const express = require('express');
const app = express();
const got = require('got');

app.get('/:id',(req,res,next) => {
	return got(`http://basedir_circuitbreaker_1:4000/${req.params.id}`)
			.then(() => {
				res.sendStatus(200);
			})
			.catch(() => {
				res.sendStatus(503);
			})
})

app.get('/',(req,res,next) => {
		res.end("Skopje time: " + Date.now());
}).listen(6000 , () => { console.log('Service is up and listening on port 6000') });
