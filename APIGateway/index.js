const http = require('http');
const express = require('express');

// Make simple API Gateway example microservice
const PORT = 3000;
const HOST = 'localhost';
const app = express();

app.get('/',(req,res,next) => {
   res.end('Thanks but no thanks!'); 
});

        //  CQRS - QUERY 
app.get('/example-service',(req,res,next) => {
   // First find service from service registrant - etcd ...
   //then make a call to returned service endpoint !
   
});


        //  CQRS - COMMAND 
app.post('/example-service/:item',(req,res,next) => {
   // First find service from service registrant - etcd ...
   //then make a post call to returned service endpoint !
   
});


app.listen(PORT,() => {
    console.log('Server is listening at %s:%s' , HOST , PORT);
});
