from dataclasses import dataclass
from base_model import BaseModel

@dataclass
class Announcement(BaseModel):
    created_at: int
    text: str
