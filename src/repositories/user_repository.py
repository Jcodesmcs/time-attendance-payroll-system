from base_repository import BaseRepository
from ..models.users import User, UserProfile

class UserRepository(BaseRepository[User]):
    def __init__(self, root_ref):
        super().__init__(root_ref, "users", User)

    def set_role(self, uid, role):
        self.ref.child(str(uid)).update({
            "system_role": role
        })

    def deactivate(self, uid):
        self.ref.child(str(uid)).update({
            "is_active": False
        })

class UserProfileRepository(BaseRepository[UserProfile]):
    def __init__(self, root_ref):
        super().__init__(root_ref, "user_profiles", UserProfile)
