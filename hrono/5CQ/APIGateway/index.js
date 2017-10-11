const http = require('http');
const express = require('express');
const Etcd = require('node-etcd');

const SERVICE_DIR = "services";
const PORT = 3000;
const HOST = 'localhost';
const app = express();
const etcd = new Etcd('http://5cq_etcd_1:2379');

// CQRS reading application state = REQUEST
app.get('/clicks', (req, res, next) => {
    etcd.get('/clicks/nums', {}, (err, val) => {
        // console.log(require('util').inspect(val, true, 10));
        let data = JSON.parse(val.node.value);
        res.end("Clicks: " + data);
    });
    // etcd.get(`/${SERVICE_DIR}/${req.params.service}`, {}, (err, val) => {
    //     let sd = JSON.parse(val.node.value);
    //     http.get(`http://${sd.host}:${sd.port}`, (response) => {
    //         let data = '';
    //         response.on('data', (chunk) => {
    //             data += chunk; 
    //         });
    //         response.on('end', () => {
    //             res.end(data);
    //         });
    //     });
    // });
});

// CQRS changing applications state = COMMAND
app.post('/:service/:value', (req, res, next) => {
    
    etcd.get(`/${SERVICE_DIR}/${req.params.service}`, {}, (err, val) => {
        let sd = JSON.parse(val.node.value);
        var post_options = {
            host: sd.host,
            port: sd.port,
            path: '/' + req.params.value,
            method: 'POST'
        };
        http.request(post_options, (response) => {
            let data = '';
            response.on('data', (chunk) => {
                data += chunk; 
            });
            response.on('end', () => {
                res.end(data);
            });
        });
    });
});

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
    http.get('http://5cq_twos_1:6000', (res) => {
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
    http.get('http://5cq_threes_1:7000', (res) => {
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
