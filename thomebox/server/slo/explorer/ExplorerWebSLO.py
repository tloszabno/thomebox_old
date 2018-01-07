import base64
import cStringIO
import os

from PIL import Image

import config


def split_path(path):
    path_split_lst = []
    while os.path.basename(path):
        path_split_lst.append(os.path.basename(path))
        path = os.path.dirname(path)
    path_split_lst.reverse()
    return path_split_lst


def fix_orientation(img):
    if hasattr(img, '_getexif'):
        orientation = 0x0112
        exif = img._getexif()
        if exif is not None and orientation in exif:
            orientation = exif[orientation]
            rotations = {
                3: Image.ROTATE_180,
                6: Image.ROTATE_270,
                8: Image.ROTATE_90
            }
            if orientation in rotations:
                img = img.transpose(rotations[orientation])
    return img


def try_to_resolve_icon(element_path):
    size = 128, 128
    if os.path.isfile(element_path):
        if element_path.lower().endswith(".jpg") or element_path.lower().endswith(
                ".jpeg"):
            image = Image.open(element_path)
            image = fix_orientation(image)
            image.thumbnail(size, Image.ANTIALIAS)
            buffer = cStringIO.StringIO()
            image.save(buffer, format="JPEG", optimize=True, quality=40)
            img_str = base64.b64encode(buffer.getvalue())
            return img_str


def should_show_element(element):
    return element[0] != '.'


class ExplorerWebSLO(object):
    def __init__(self):
        self.uuidDb = UuidDB()

    def get_folder(self, folder_id):
        path = self.uuidDb.get_path(folder_id)
        if not path:
            path = config.getRootFolderPath()
            folder_id = self.uuidDb.get_uuid(path)

        elements_jto = ElementsJTO(folder_id)
        elements = filter(should_show_element, os.listdir(path))
        for element in elements:
            element_path = os.path.join(path, element)
            node_jto = NodeElementJTO()
            node_jto.id = self.uuidDb.get_uuid(element_path)
            node_jto.name = element
            node_jto.type = 'folder' if os.path.isdir(element_path) else 'file'
            node_jto.icon = try_to_resolve_icon(element_path)
            elements_jto.add(node_jto)

        return elements_jto

    # FIXME: separate SLO
    def get_breadcrump_for(self, folder_id):
        path = self.uuidDb.get_path(folder_id)
        breadcrump = BreadcrumpJTO()

        root_folder_path = config.getRootFolderPath()
        breadcrump_home = BreadcrumpElementJTO()
        breadcrump_home.id = self.uuidDb.get_uuid(root_folder_path)
        breadcrump_home.name = "Home"
        breadcrump_home.icon = "home"
        breadcrump.add(breadcrump_home)

        if not path:
            return breadcrump

        path_elements = split_path(path.replace(root_folder_path, ""))
        current_path = root_folder_path
        for element in path_elements:
            current_path = os.path.join(current_path, element)
            breadcrump_element = BreadcrumpElementJTO()
            breadcrump_element.id = self.uuidDb.get_uuid(current_path)
            breadcrump_element.name = element
            breadcrump.add(breadcrump_element)

        return breadcrump


class ElementsJTO(object):
    def __init__(self, current_id):
        self.elements = []
        self.current_folder_id = current_id

    def add(self, node):
        self.elements.append(node)

    def to_json(self):
        return {
            "elements": [el.to_json() for el in self.elements],
            "currentFolderId": self.current_folder_id
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


class BreadcrumpJTO(object):
    def __init__(self):
        self.breadcrumpItems = []

    def to_json(self):
        return {
            "breadcrumpItems": [x.to_json() for x in self.breadcrumpItems]
        }

    def add(self, element):
        self.breadcrumpItems.append(element)


class BreadcrumpElementJTO(object):
    def __init__(self):
        self.id = None
        self.name = ""
        self.icon = ""

    def to_json(self):
        return {
            "id": self.id,
            "name": self.name,
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
