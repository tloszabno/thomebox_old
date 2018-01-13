import os

def split_path(path):
    path_split_lst = []
    while os.path.basename(path):
        path_split_lst.append(os.path.basename(path))
        path = os.path.dirname(path)
    path_split_lst.reverse()
    return path_split_lst
