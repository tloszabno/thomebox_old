#!/usr/bin/env python2
import io
import time

from flask import Flask, render_template, jsonify, send_file

from server.beans import explorer_web_slo, breadcrump_web_slo, thumbnails_web_slo, gallery_web_slo, workers

app = Flask(__name__, static_folder='web/dist', template_folder='web')


@app.route("/")
def index():
    version = time.time()
    return render_template('index.html', version=version)


@app.route('/folder', defaults={"id": None})
@app.route('/folder/<id>')
def get_folder(id):
    return jsonify(explorer_web_slo.get_folder(id).to_json())


@app.route('/file/<id>')
def get_file(id):
    stream, name = explorer_web_slo.get_stream_for_file(id)
    return send_file(stream, as_attachment=True, attachment_filename=name)


@app.route('/gallery/<max_width>/<max_height>/<image_id>')
def get_gallery_for_image(max_width, max_height, image_id):
    return jsonify(gallery_web_slo.get_gallery_definition(image_id, max_width, max_height).to_json())


@app.route('/breadcrump/<folder_id>')
def get_breadcrump(folder_id):
    return jsonify(breadcrump_web_slo.get_breadcrump_for(folder_id).to_json())


@app.route('/thumbnail/<element_id>')
def get_thumbnail(element_id):
    return jsonify(thumbnails_web_slo.get_thumbnail(element_id).to_json())


@app.route('/thumbnail-data/<element_id>')
def get_thumbnail_data(element_id):
    return send_file(io.BytesIO(gallery_web_slo.get_thumbnail_binary(element_id)), mimetype='image/jpg')


@app.route('/image-data/<max_width>/<max_height>/<element_id>')
def get_image_data(element_id, max_width, max_height):
    return send_file(io.BytesIO(gallery_web_slo.get_image_binary(element_id, max_width, max_height)),
                     mimetype='image/jpg')


@app.after_request
def set_no_store_cache(response):
    if 'Cache-Control' not in response.headers:
        response.headers['Cache-Control'] = 'no-store'
    return response


if __name__ == '__main__':
    try:
        app.run(host='0.0.0.0', port=3674, debug=True)
    finally:
        workers.close()
