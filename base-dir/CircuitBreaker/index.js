const express = require('express');

const app = express();


app.get('/:id',(req,res,next) => {
    var param = req.params.id;
    if(param==='0') {
        blockFor(5);
        res.sendStatus(503);
    } else {
        res.status(200).send('Im ok now');
    }

    function blockFor(seconds) {
        var waitTill = new Date(new Date().getTime()+seconds*1000);
        while(waitTill > new Date()) {}
    }
}).listen(4000, () => { console.log('CircuitBreaker Server is started and listening on port 4000')})