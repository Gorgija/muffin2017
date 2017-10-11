const http = require('http');
const express = require('express');
const Etcd = require('node-etcd');

const SERVICE_DIR = "services";
const PORT = 3000;
const HOST = 'localhost';
const app = express();
const etcd = new Etcd('http://3cb_etcd_1:2379');

app.get('/',(req,res,next) => {
    res.end('Im simple API Gateway service, but you can call me Facade.'); 
});

app.get('/:service', (request, response, next) => {
    etcd.get(`/${SERVICE_DIR}/${request.params.service}`, {}, (err, val) => {
        let sd = JSON.parse(val.node.value);
        // console.log(require('util').inspect(sd, true, 10));
        http.get(`http://${sd.host}:${sd.port}`, (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                console.log(`Response from ${sd.host}:${sd.port} was successfull`);
                response.end(data);
            })
        });
    });
});
app.get('/skopje/:time', (request, response, next) => { 
    http.get('http://3cb_twos_1:6000', (res) => {
        let data = '';
        res.on('data', (chunk) => {
            data += chunk;
        });
        res.on('end', () => {
            console.log('Response from Skopje service: \\n\\t' + data);
            response.end(data)
        })
    }).on('error', (err) => {
        console.log("Error: " + err);
    });
});
app.get('/sofija/:time', (request, response, next) => {
    // ... and here you would do it again...
    http.get('http://3cb_threes_1:7000', (res) => {
        let data = '';
        res.on('data', (chunk) => {
            data += chunk;
        });
        res.on('end', () => {
            console.log('Response from Skopje service: \\n\\t' + data);
            response.end(data)
        })
    }).on('error', (err) => {
        console.log("Error: " + err);
    });
});
app.listen(PORT,() => {
    console.log('API Gateway Server is listening at %s:%s' , HOST , PORT);
});
