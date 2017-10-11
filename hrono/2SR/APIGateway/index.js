const http = require('http');
const express = require('express');

const PORT = 3000;
const HOST = 'localhost';
const app = express();

app.get('/',(req,res,next) => {
    res.end('Im simple API Gateway service, but you can call me Facade.'); 
});

app.get('/skopje/:clicked', (request, response, next) => {
    // imagine to hard coding every path to every ms endpoint !??
    http.get('http://1ag_twos_1:6000', (res) => {
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
    http.get('http://1ag_threes_1:7000', (res) => {
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
