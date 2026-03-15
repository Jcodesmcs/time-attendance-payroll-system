from typing import TypeVar, Generic
from ..models.base_model import BaseModel

T = TypeVar("T", bound=BaseModel)


class BaseRepository(Generic[T]):
    """
    Base repository for Firebase-backed dataclass models.
    Supports optional UnitOfWork batching for writes.
    """

    def __init__(self, root_ref, collection: str, model: type[T], uow=None):
        self.root = root_ref
        self.collection = collection
        self.model = model
        self.uow = uow

    def _path(self, uid: str) -> str:
        return f"{self.collection}/{uid}"

    def save(self, obj: T):
        uid = str(obj.uuid)
        path = self._path(uid)
        data = obj.to_dict()

        if self.uow:
            self.uow.set(path, data)
        else:
            self.root.child(path).set(data)

    def get(self, uid) -> T | None:
        snapshot = self.root.child(self._path(str(uid))).get()

        if snapshot is None:
            return None

        return self.model.from_dict(uid, snapshot)

    def delete(self, uid):
        path = self._path(str(uid))

        if self.uow:
            self.uow.delete(path)
        else:
            self.root.child(path).delete()

    def all(self) -> list[T]:
        data = self.root.child(self.collection).get() or {}

        return [
            self.model.from_dict(uid, value)
            for uid, value in data.items()
        ]
