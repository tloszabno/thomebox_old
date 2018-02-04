import os


class GalleryWebSLO(object):
    def __init__(self, uuid_db, thumbnail_creator, image_converter):
        self.uuid_db = uuid_db
        self.image_converter = image_converter
        self.thumbnail_creator = thumbnail_creator

    def get_gallery_definition(self, image_id, max_width, max_height):
        requested_image_path = self.uuid_db.get_path(image_id)
        if not requested_image_path:
            return GalleryDefinition(current_id=-1)

        path = os.path.dirname(requested_image_path)
        image_paths = filter(__is_image__, os.listdir(path))
        parent_uuid = self.uuid_db.get_uuid(path)
        gallery = GalleryDefinition(current_id=parent_uuid, max_width=max_width, max_height=max_height)
        i = 0
        for image_path in sorted(image_paths):
            image_path = os.path.join(path, image_path)
            uuid = self.uuid_db.get_uuid(image_path)
            original_url = 'image-data/' + max_width + "/" + max_height + "/" + uuid
            thumbnail_url = 'thumbnail-data/' + uuid
            item = GalleryItemDefinition(original_url=original_url, thumbnail_url=thumbnail_url)
            gallery.add(item)
            if image_path == requested_image_path:
                gallery.selected_image_index = i
            i += 1

        return gallery

    def get_thumbnail_binary(self, element_id):
        path = self.uuid_db.get_path(element_id)
        if not path or not self.thumbnail_creator.can_handle(path):
            return None
        thumb, binary = self.thumbnail_creator.create(path)
        return binary

    def get_image_binary(self, element_id, max_width, max_height):
        path = self.uuid_db.get_path(element_id)
        return self.image_converter.get_image(path, max_width, max_height)


class GalleryDefinition(object):
    def __init__(self, current_id, max_width, max_height):
        self.images = []
        self.current_folder_id = current_id
        self.selected_image_index = 0
        self.max_width = max_width
        self.max_height = max_height

    def add(self, node):
        self.images.append(node)

    def to_json(self):
        return {
            "images": [el.to_json() for el in self.images],
            "folderId": self.current_folder_id,
            "showImageIndex": self.selected_image_index,
            "maxWidth": self.max_width,
            "maxHeight": self.max_height
        }


class GalleryItemDefinition(object):
    def __init__(self, original_url, thumbnail_url):
        self.original_url = original_url
        self.thumbnail_url = thumbnail_url

    def to_json(self):
        return {
            "original": self.original_url,
            "thumbnail": self.thumbnail_url
        }


def __is_image__(element_path):
    return element_path.lower().endswith(".jpg") or element_path.lower().endswith(
        ".jpeg") or element_path.lower().endswith(".png")
