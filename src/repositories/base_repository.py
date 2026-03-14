from typing import TypeVar, Generic
from ..models.base_model import BaseModel

T = TypeVar("T", bound=BaseModel)

class BaseRepository(Generic[T]):
    """
        Acts as a base repository class for all model dataclasses. 
    """

    def __init__(self, root_ref, collection: str, model: type[T]):
        self.ref = root_ref.child(collection)
        self.model = model

    def save(self, obj: T):
        uid = str(obj.uuid)
        self.ref.child(uid).set(obj.to_dict())

    def get(self, uid) -> T | None:
        snapshot = self.ref.child(str(uid)).get()

        if snapshot is None:
            return None

        return self.model.from_dict(uid, snapshot)

    def delete(self, uid):
        self.ref.child(str(uid)).delete()

    def all(self) -> list[T]:
        data = self.ref.get() or {}

        return [
            self.model.from_dict(uid, value)
            for uid, value in data.items()
        ]
