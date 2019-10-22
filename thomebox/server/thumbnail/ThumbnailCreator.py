import base64
import cStringIO
import os

from PIL import Image


class ThumbnailCreator(object):
    def __init__(self, workers):
        self.workers = workers

    def create(self, element_path):
        return __create_internal__(element_path)
        return self.workers.run(__create_internal__, (element_path,))

    @staticmethod
    def can_handle(element_path):
        return os.path.isfile(element_path) and (
                element_path.lower().endswith(".jpg") or element_path.lower().endswith(
            ".jpeg") or element_path.lower().endswith(".png"))


# Refactor - move to image component
def __create_internal__(element_path):
    size = 128, 128
    image = Image.open(element_path)
    image = __fix_orientation__(image)
    image.thumbnail(size, Image.ANTIALIAS)
    save_buffer = cStringIO.StringIO()
    image = image.convert("RGB")
    image.save(save_buffer, format="JPEG", optimize=True, quality=35)
    binary_data = save_buffer.getvalue()
    img_str = base64.b64encode(binary_data)
    return img_str, binary_data


def __fix_orientation__(img):
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
