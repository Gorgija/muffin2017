from flask import Flask
from redis import Redis
from etcd import Client
import socket
import json
import os

app = Flask(__name__)
redis = Redis(host="redis", port=6379)
client = Client(host="5cq_etcd_1",port=2379)


@app.route("/")
def clicknums():
    count = redis.incr("hits")
    return "Requested {} times.\n".format(count)


@app.route("/clicks")
def click():
    return redis.get("hits")

@app.route("/click",methods=['POST'])
def storeclick():
    count = redis.incr("hits")
    client.write("/clicks/nums", count )
    return str( count )

if __name__ == "__main__":
    client.write("/services/clicks",json.dumps({"host":socket.gethostbyname(socket.gethostname()),"port":"5000","pid":os.getpid()}))
    app.run(host="0.0.0.0", debug=True)
    
