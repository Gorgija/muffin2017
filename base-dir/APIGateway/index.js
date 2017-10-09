const http = require('http');
const express = require('express');
//const request = require('request');


// Make simple API Gateway example microservice
const PORT = 3000;
const HOST = 'localhost';
const app = express();

app.get('/',(req,res,next) => {
   res.end('Thanks for Asking for me!'); 
});

        //  CQRS - QUERY 
app.get('/skopje/:clicked',(request,response,next) => {
   // switch across path params and execute bussiness logic accordinaly ...
   http.get('http:\/\/threesimpleservices_ones_1:5000',(res) => { // imagine to hard coding every path to every ms endpoint !?? ,,,,
   	let data = '';

   	res.on('data' , (chunk) => {
   		data += chunk;
   	});

   	res.on('end',() => {
   		console.log('Response from Skopje microservice: ' + data );
   		response.end(data)
   	})
   }).on('error' , (err) => {
   	console.log("Error: " + err);
   })
});


app.get('/sofija/:time',(req,res,next) => {


})


//  CQRS - COMMAND
app.post('/example-service/:item',(req,res,next) => {
   // First find service from service registrant - etcd ...
   //then make a post call to returned service endpoint !

});


app.listen(PORT,() => {
    console.log('Server is listening at %s:%s' , HOST , PORT);
});
