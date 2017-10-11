const path = require('path');
const Etcd = require('node-etcd');
const http = require('http');
const ip = require('ip');


const SERVICE_DIR = "services";
const SERVICE_NAME = "musala";

const etcd = new Etcd('http://4bh_etcd_1:2379');
const p = path.join('/',SERVICE_DIR, SERVICE_NAME);

var registered = false;
var port = process.env.PORT || 8000;

http.createServer((req, res) => {
    res.end('Im here...');
}).listen(8000, () => {
    etcd.set(p, JSON.stringify({ host: ip.address(), port: port, pid: process.pid } ) , {}, (err) => {
        if (!err) {
            console.log('Service registered!');
            registered = true;
        } else {
            console.log('Service Registration *** ERROR *** happened !!!');
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

