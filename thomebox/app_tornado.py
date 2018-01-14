#!/usr/bin/env python3
import os
import time

import tornado.ioloop
import tornado.web

from server.beans import explorer_web_slo, breadcrump_web_slo, thumbnails_web_slo

root = os.path.dirname(__file__)
web_dir = root + "/web/"


class MainHandler(tornado.web.RequestHandler):
    def get(self):
        self.render("index.html", version=time.time())


class FolderHandler(tornado.web.RequestHandler):
    def get(self, folder_id):
        self.write(explorer_web_slo.get_folder(folder_id).to_json())


class BreadcrumpHandler(tornado.web.RequestHandler):
    def get(self, folder_id):
        self.write(breadcrump_web_slo.get_breadcrump_for(folder_id).to_json())


class ThumbnailHandler(tornado.web.RequestHandler):
    def get(self, file_id):
        self.write(thumbnails_web_slo.get_thumbnail(file_id).to_json())


def create_tornado_app():
    return tornado.web.Application([
        (r'/', MainHandler),
        (r'/folder/([-A-Za-z0-9]+)', FolderHandler),
        (r'/breadcrump/([-A-Za-z0-9]+)', BreadcrumpHandler),
        (r'/thumbnail/([-A-Za-z0-9]+)', ThumbnailHandler),
        (r"/dist/(.*)", tornado.web.StaticFileHandler, {"path": web_dir + "dist/"})
    ], template_path=web_dir, static_path=web_dir)


if __name__ == "__main__":
    app = create_tornado_app()
    app.listen(8888)
    tornado.ioloop.IOLoop.current().start()
