class ThumbnailWebSLO(object):
    def __init__(self, uuid_repository, thumbnail_creator):
        self.uuid_repository = uuid_repository
        self.thumbnail_creator = thumbnail_creator

    def get_thumbnail(self, element_id):
        path = self.uuid_repository.get_path(element_id)
        if not path:
            return Thumbnail(element_id)

        icon, binary = try_to_resolve_icon(path, self.thumbnail_creator)
        return Thumbnail(element_id, icon)


class Thumbnail(object):
    def __init__(self, element_id, icon=""):
        self.element_id = element_id
        self.icon = icon

    def to_json(self):
        return {
            "thumbnail":
                {
                    "id": self.element_id,
                    "icon": self.icon
                }
        }


def try_to_resolve_icon(element_path, thumbnail_creator):
    if thumbnail_creator.can_handle(element_path):
        return thumbnail_creator.create(element_path)
