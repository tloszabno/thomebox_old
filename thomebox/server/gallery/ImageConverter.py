import io

from PIL import Image


class ImageConverter(object):
    def __init__(self):
        pass

    def get_image(self, element_path, max_width, max_height):
        # size = max_width,   max_height
        image = Image.open(element_path)
        image = __fix_orientation__(image)
        # image.thumbnail(size, Image.ANTIALIAS)
        save_buffer = io.BytesIO()
        image = image.convert("RGB")
        image.save(save_buffer, format="JPEG", optimize=True, quality=70)
        binary_data = save_buffer.getvalue()
        return binary_data


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
