const http = require('http');
const express = require('express');


// Make simple API Gateway example microservice
const PORT = 3000;
const HOST = 'localhost';
const app = express();

app.get('/',(req,res,next) => {
   res.end('Thanks but no thanks!'); 
});

app.listen(PORT,() => {
    console.log('Server is listening at %s:%s' , HOST , PORT);
});
