const express = require('express');
const app = express();
const got = require('got');
const Etcd = require('node-etcd');
const etcd = new Etcd('http://5cq_etcd_1:2379');
const disyuntor = require('disyuntor');

const safeGot = disyuntor.promise(got, {
    name: 'got.request',
    timeout: '10s',
    cooldown: '5s',
    maxFailures: 1,
    onTrip: (err, failures, cooldown) => {
        console.log(`*** got request triped 
                        because it failed ${failures} times. 
						Last error was ${err.message}! 
						There will be no more attempts for ${cooldown}ms ***`);
    }
});
app.get('/:service/:id', (req, res, next) => {
    etcd.get(`/services/${req.params.service}`, {}, (err, val) => {
        let sd = JSON.parse(val.node.value);
        return safeGot(`http://${sd.host}:${sd.port}/${req.params.id}`)
            .then(() => {
                res.sendStatus(200);
            })
            .catch(() => {
                res.sendStatus(503);
            });
    });
    
});

app.listen(4000, () => { console.log('CircuitBreaker Server is started and listening on port 4000'); });