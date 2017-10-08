const http = require('http');
const path = require('path');
const Etcd = require('node-etcd');

var etcd = new Etcd('http://127.0.0.1:4001');
var p = path.join('/','services','skopje')
var registered = false;

const app = http.createServer((req,res) => {

		res.end("Time in milisecunds from service two: " + Date.now());
		
});


app.listen(6000 , () => {
	// Place for service registration...
	// etcd.set(p,JSON.stringify({hostname: '127.0.0.1',port: 6000,pid: process.pid }));
	// console.log(`Service is registered as ${p} and Server running at port 6000`);
	// registered = true;
});
