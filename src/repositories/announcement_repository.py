from ..models.announcements import Announcement
from base_repository import BaseRepository

class AnnouncementRepository(BaseRepository[Announcement]):
    def __init__(self, root_ref):
        super().__init__(root_ref, "announcements", Announcement)

