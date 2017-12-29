#!/usr/bin/env python2
from flask import Flask, render_template
import time


app = Flask(__name__, static_folder='../web/dist', template_folder='../web')


@app.route("/")
def index():
    version = time.time()
    return render_template('index.html', version=version)


@app.route("/state")
def hello():
    return "up"


@app.after_request
def set_no_store_cache(response):
    if 'Cache-Control' not in response.headers:
        response.headers['Cache-Control'] = 'no-store'
    return response


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3674, debug=True)