from dataclasses import dataclass, asdict, field
import uuid

@dataclass
class BaseModel:
    """
        A base dataclass model for other dataclasses to implement.
    """
    uuid: uuid.UUID = field(default_factory=uuid.uuid4, init=False)

    def to_dict(self):
        """
            Returns the dict without the UUID (for Firebase).
        """
        return {k: v for k, v in asdict(self).items() if k != "uuid"}

    @classmethod
    def from_dict(cls, uid, data):
        """
            Reattaches a given UUID from Firebase key.
        """
        obj = cls(**data)
        obj.uuid = uuid.UUID(uid)
        return obj
