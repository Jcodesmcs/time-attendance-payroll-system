from base_repository import BaseRepository
from ..models.users import User, UserProfile

class UserRepository(BaseRepository[User]):
    def __init__(self, root_ref, uow=None):
        super().__init__(root_ref, "users", User, uow)

    def get_by_username(self, username) -> User | None:
        uid = self.root.child("users_by_username").child(username).get()
        if uid is None:
            return None
        data = self.root.child(self._path(uid)).get()
        if data is None:
            return None
        return User.from_dict(uid, data)

    def set_role(self, uid, role):
        path = f"{self.collection}/{uid}/system_role"
        if self.uow:
            self.uow.set(path, role)
        else:
            self.root.child(path).set(role)

    def deactivate(self, uid):
        path = f"{self.collection}/{uid}/is_active"
        if self.uow:
            self.uow.set(path, False)
        else:
            self.root.child(path).set(False)

class UserProfileRepository(BaseRepository[UserProfile]):
    def __init__(self, root_ref, uow=None):
        super().__init__(root_ref, "user_profiles", UserProfile, uow)
