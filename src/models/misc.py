from dataclasses import dataclass
from base_model import BaseModel

@dataclass
class AuditLog(BaseModel):
    action: str
    datetime: int
    details: str

@dataclass
class Holiday:
    date: int
    name: str
    type: str
