const express = require('express');
const app = express();
const got = require('got');

const disyuntor = require('disyuntor');
const safeGot = disyuntor.promise(got,{
	name:'got.request',
	timeout:'10s',
	cooldown:'5s',
	maxFailures:1,
	onTrip: (err,failures,cooldown) => {
		console.log(`got request triped because it failed ${failures} times. 
						Last error was ${err.message}! 
						There will be no more attempts for ${cooldown}ms`);
	}
});

app.get('/:id',(req,res,next) => {
	return safeGot(`http://basedir_circuitbreaker_1:4000/${req.params.id}`)
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
