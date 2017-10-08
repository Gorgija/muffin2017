var path = require('path');
var Etcd = require('node-etcd');
var http = require('http');

var etcd = new Etcd();
var p = path.join('/','services','musala')
var registered = false;

var port = process.env.PORT || 8000;
const Hapi = require('hapi');

const server = new Hapi.Server();

server.connection({ port: port });

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
    	reply('Everything is under control! Registered: ' + registered);
    }
});


server.start((err) => {
    if (err) { throw err;}
    else {
        // Service Registration proccess...
        etcd.set(p,JSON.stringify({hostname: '127.0.0.1',port: 8000,pid: process.pid }));
        console.log(`Service is registered as ${p} and Server running at: ${server.info.uri}`);
        registered = true;
    }
});

