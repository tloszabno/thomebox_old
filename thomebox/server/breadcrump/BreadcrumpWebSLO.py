import os

from server.util import PathUtils
from server.explorer import config

class BreadcrumpWebSLO(object):
    def __init__(self, uuid_repository):
        self.uuid_repository = uuid_repository

    def get_breadcrump_for(self, folder_id):
        path = self.uuid_repository.get_path(folder_id)
        breadcrump = BreadcrumpJTO()

        root_folder_path = config.getRootFolderPath()
        breadcrump_home = BreadcrumpElementJTO()
        breadcrump_home.id = self.uuid_repository.get_uuid(root_folder_path)
        breadcrump_home.name = "Home"
        breadcrump_home.icon = "home"
        breadcrump.add(breadcrump_home)

        if not path:
            return breadcrump

        path_elements = PathUtils.split_path(path.replace(root_folder_path, ""))
        current_path = root_folder_path
        for element in path_elements:
            current_path = os.path.join(current_path, element)
            breadcrump_element = BreadcrumpElementJTO()
            breadcrump_element.id = self.uuid_repository.get_uuid(current_path)
            breadcrump_element.name = element
            print("adding " + str(breadcrump_element.to_json()))
            breadcrump.add(breadcrump_element)

        return breadcrump


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
