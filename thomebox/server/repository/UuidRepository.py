import uuid


class UuidRepository(object):
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
