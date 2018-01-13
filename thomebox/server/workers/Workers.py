from multiprocessing import Pool
from multiprocessing import cpu_count

MAX_PROCESSES = cpu_count() - 1


class Workers(object):
    def __init__(self):
        self.pool = Pool(MAX_PROCESSES)

    def run(self, action, args):
        return self.pool.apply(action, args)

    def close(self):
        self.pool.terminate()
        self.pool.close()
