const path = require('path');
const express = require('express');
const app = express();
const ip = require('ip');
const Etcd = require('node-etcd');
const etcd = new Etcd('http://5cq_etcd_1:2379');
var port = process.env.PORT || 6000;

const SERVICE_DIR = "services";
const SERVICE_NAME = "skopje";
const p = path.join('/', SERVICE_DIR, SERVICE_NAME);

app.get('/', (req, res, next) => {
	res.end("Skopje time: " + Date.now());
});
app.get('/:block', (req, res, next) => {
	var param = req.params.block;
	if (param === '0') {
		blockFor(5);
		res.sendStatus(503);
	} else {
		res.status(200).send('Im ok now');
	}
	function blockFor(seconds) {
		var waitTill = new Date(new Date().getTime() + seconds * 1000);
		while (waitTill > new Date()) { }
	}
});
app.listen(6000, () => {
	etcd.set(p, JSON.stringify({ host: ip.address(), port: port, pid: process.pid }), {}, (err) => {
		if (!err) {
			console.log('Service registered!');
			console.log('Service is up and listening on port 6000');
		} else {
			console.log('Service "skopje" Registration  *** ERROR *** happened !!!');
		}
	});
});
function exitHandler() {
	etcd.rmdir(p, {}, (err) => {
			if (err) {
					console.log('*** Error has happen at unregistering this service !  ')
			} else {
					console.log('*** Service is unregistered');
					process.exit(2);
			}
	});
}
process.on('exit', exitHandler);
process.on('SIGINT', exitHandler);
process.on('SIGTERM', exitHandler);
process.on('uncaughtException', exitHandler);
