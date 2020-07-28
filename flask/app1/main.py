from flask import Blueprint, request, jsonify, send_file, make_response, helpers,render_template
import sys
from pymongo import MongoClient
import paho.mqtt.client as mqtt

sys.path.append('../')

app1 = Blueprint('app1', __name__,static_folder="./build/static", template_folder="./build")


TOKEN = [
        "4s-DpxhYHhLNtCtNryNaW7bBehiYtDnYmYPHB8-SB6MuDa-Mxt6zVWePjtBYjEuxxQ2",
        "UuM7jBa8H7wPy4ZxhGKFiVE7ZrPxMG4LbtUt7brZDzQT7YhtYns-a-h2hP-zX2H-YHs",
        "-dLwiYw-RYdymsGRU5sdTgbn5Fr5a-a4aR84Zx76Fw5jiz3D3xpJeFPfSDkFSn2rQQs"
    ]


def MongoDB(data_type):
    data_add = []
    client = MongoClient("192.168.12.29", 27017)
    db = client['CPSLAB_M5Stack']
    co = db[data_type]
    data_colection = co.find()
    if(data_type == "sensor"):
        print("Hi")
    else:
        for i in data_colection:
            del i['_id']
            data_add.insert(0, i)
    return data_add

@app1.route("/")
def index():
    return render_template("index.html")

# M5Stackの状態を送信するAPI
@app1.route('/Status', methods=["GET", "POST"])
def Status():
    jsonDatas = []

    if request.method == 'POST' and 'X-Auth-LABTOKEN' in request.headers:
        LABTOKEN = request.headers['X-Auth-LABTOKEN']
        if LABTOKEN in TOKEN:
            jsonData1 = MongoDB("status")
            jsonData2 = MongoDB("config")
            if(len(jsonData1) == len(jsonData2)):
                for i, name in enumerate(jsonData1):
                    jsonData1[i].update(jsonData2[i])
                    jsonDatas.append(jsonData1[i])
            return jsonify(jsonDatas), 200

    return jsonify({'token': "yyyy"}), 400

@app1.route('/CMD', methods=["GET", "POST"])
def MQTT_PUB():
    if request.method == 'POST' and 'X-Auth-LABTOKEN' in request.headers:
        LABTOKEN = request.headers['X-Auth-LABTOKEN']
        if LABTOKEN in TOKEN:
            data = request.data.decode('utf-8')
            client = mqtt.Client()
            client.connect("192.168.12.29", 1883, 60)
            client.loop_start()
            client.publish("/sub/M5Stack", data)
            return jsonify({'token': "yyyy"}), 200

    return jsonify({'token': "yyyy"}), 400


