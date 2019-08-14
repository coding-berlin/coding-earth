import os
import gevent.pywsgi
import json
import logging

from elasticsearch import Elasticsearch
from flask import Flask
from flask_cors import CORS
from platformshconfig import Config

from dotenv import load_dotenv
load_dotenv(verbose=True)

#logging.basicConfig(level=logging.DEBUG) 

logger = logging.getLogger(__name__)

config = Config()

if config.is_valid_platform():
    port = int(config.port)
    esCredentials = config.credentials('elasticsearch')
    print(esCredentials)
    esHost = "http://" + esCredentials['host'] + ":" + str(esCredentials['port'])
else:
    port = int(os.getenv('PORT', 3000))
    esHost = os.getenv('ELASTICSEARCH_HOST', 'http://localhost:9200')

app = Flask(__name__)
CORS(app)

elasticsearch = Elasticsearch(esHost)

@app.route('/')
@app.route('/index')
def index():
    res = elasticsearch.search(index="youtube", body={"query": {"match_all": {}}})
    print("%d documents found" % res['hits']['total'])
    js0n = json.dumps( res['hits']['hits'])
    return js0n

@app.route('/hello')
def hello():
    return esHost

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=port, debug = True)
    #http_server = gevent.pywsgi.WSGIServer(('127.0.0.1', port), app)
    #http_server.serve_forever()
