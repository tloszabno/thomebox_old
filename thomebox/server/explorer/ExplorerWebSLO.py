import os

import config


def should_have_thumbnail(element_path):
    return element_path.lower().endswith(".jpg") or element_path.lower().endswith(
        ".jpeg") or element_path.lower().endswith(".png")


def should_show_element(element):
    return element[0] != '.'


class ExplorerWebSLO(object):
    def __init__(self, uuid_db):
        self.uuid_db = uuid_db

    def get_folder(self, folder_id):
        path = self.uuid_db.get_path(folder_id)
        if not path:
            path = config.getRootFolderPath()
            folder_id = self.uuid_db.get_uuid(path)

        elements_jto = ElementsJTO(folder_id)
        elements = filter(should_show_element, os.listdir(path))
        for element in elements:
            element_path = os.path.join(path, element)
            node_jto = NodeElementJTO()
            node_jto.id = self.uuid_db.get_uuid(element_path)
            node_jto.name = element
            node_jto.type = 'folder' if os.path.isdir(element_path) else 'file'
            node_jto.fetch_thumb = should_have_thumbnail(element_path)
            elements_jto.add(node_jto)
        return elements_jto


class ElementsJTO(object):
    def __init__(self, current_id):
        self.elements = []
        self.current_folder_id = current_id

    def add(self, node):
        self.elements.append(node)

    def element_should_fetch_thumb(self, node):
        self.elements_to_fetch_thumbnail.append(node.id)

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
        self.fetch_thumb = False

    def to_json(self):
        # TODO: optimize append only not default values  to decrease size
        return {
            "id": self.id,
            "name": self.name,
            "type": self.type,
            "icon": self.icon,
            "fetchThumb": self.fetch_thumb
        }
