from flask import *
from flask_cors import CORS # <-追加
from app1.main import app1

app = Flask(__name__)
CORS(app)

"""React(Webフロント用のapi)"""
app.register_blueprint(app1, url_prefix='/M5Stack')

if __name__ == "__main__":
    app.run(host='0.0.0.0',port=8000,threaded=True)