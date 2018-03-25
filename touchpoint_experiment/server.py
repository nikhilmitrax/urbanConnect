from flask import Flask, request
from flask_cors import CORS, cross_origin
import json
app = Flask(__name__)
CORS(app)

DATA_FILE = 'dataset.jsonl'


@app.after_request
def add_access_control_headers(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Headers'] = 'X-Token, X-Deviceid,Content-Type'
    response.headers['Access-Control-Allow-Methods'] = 'POST,GET,PUT,DELETE'
    response.headers['Cache-Control'] = 'No-Cache'
    response.headers['X-Server'] = 'exfiltrator'
    return response

@app.route('/health')
def hello_world():
    return 'Hello, World!'

@app.route('/exfiltrate', methods=['POST'])
def exfiltrateData():

    data = request.get_json()
    
    with open(DATA_FILE,'a') as f:
        data_to_write = json.dumps(data) + '\n'
        f.write(data_to_write)

    return "success", 200

if __name__ == '__main__':
    app.run()