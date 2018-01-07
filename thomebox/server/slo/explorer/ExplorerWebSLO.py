import os

import config
from PIL import Image
import base64
import cStringIO


def try_to_resolve_icon(element_path):
    size = 96, 96
    if os.path.isfile(element_path):
        if element_path.lower().endswith(".jpg") or element_path.lower().endswith(".jpeg"):
            image = Image.open(element_path)
            image.thumbnail(size, Image.ANTIALIAS)
            buffer = cStringIO.StringIO()
            image.save(buffer, format="JPEG")
            img_str = base64.b64encode(buffer.getvalue())
            return img_str


class ExplorerWebSLO(object):
    def __init__(self):
        self.uuidDb = UuidDB()

    def get_folder(self, forlder_id):
        path = self.uuidDb.get_path(forlder_id)
        if not path:
            path = config.getRootFolderPath()
            forlder_id = self.uuidDb.get_uuid(path)

        elements_jto = ElementsJTO(forlder_id)
        for element in os.listdir(path):
            element_path = os.path.join(path, element)
            node_jto = NodeElementJTO()
            node_jto.id = self.uuidDb.get_uuid(element_path)
            node_jto.name = element
            node_jto.type = 'folder' if os.path.isdir(element_path) else 'file'
            node_jto.icon = try_to_resolve_icon(element_path)
            elements_jto.add(node_jto)

        return elements_jto


class ElementsJTO(object):
    def __init__(self, current_id):
        self.elements = []
        self.current_folder_id = current_id

    def add(self, node):
        self.elements.append(node)

    def to_json(self):
        return {
            "elements": [el.to_json() for el in self.elements],
            "currentFolderId" : self.current_folder_id
        }


class NodeElementJTO(object):
    def __init__(self):
        self.type = None
        self.icon = None
        self.name = ""
        self.id = ""

    def to_json(self):
        return {
            "id": self.id,
            "name": self.name,
            "type": self.type,
            "icon": self.icon
        }


# TODO: move and refactor
import uuid


class UuidDB(object):
    def __init__(self):
        self.uuidToPath = {}
        self.pathToUuid = {}

    def get_uuid(self, path):
        if path in self.pathToUuid:
            return self.pathToUuid[path]
        id = str(uuid.uuid4())
        self.pathToUuid[path] = id
        self.uuidToPath[id] = path
        return id

    def get_path(self, id):
        if id and id in self.uuidToPath:
            return self.uuidToPath[id]
