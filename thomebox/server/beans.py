import explorer
from breadcrump.BreadcrumpWebSLO import BreadcrumpWebSLO
from repository.UuidRepository import UuidRepository
from thumbnail.ThumbnailWebSLO import ThumbnailWebSLO
from thumbnail.ThumbnailCreator import ThumbnailCreator
from workers.Workers import Workers

uuid_repository = UuidRepository()
workers = Workers()
thumbnails_creator = ThumbnailCreator(workers)
explorer_web_slo = explorer.ExplorerWebSLO(uuid_repository)
breadcrump_web_slo = BreadcrumpWebSLO(uuid_repository)
thumbnails_web_slo = ThumbnailWebSLO(uuid_repository, thumbnails_creator)
