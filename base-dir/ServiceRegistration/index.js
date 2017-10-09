var path = require('path');
var Etcd = require('node-etcd');
var http = require('http');

var etcd = new Etcd('http://basedir_etcd_1:2379');
var p = path.join('/','services','musala')
var registered = false;

var port = process.env.PORT || 8000;

http.createServer((req,res) => {
    res.end('Service is registered: ' + registered + ' Etcd: ' + etcd.hosts);
}).listen(8000,() => {
    etcd.set(p,JSON.stringify({host:'127.0.0.1',port:port,pid:process.pid}),{}, () => { 
        console.log('Service registered!'); 
        registered = true;
    });
})

