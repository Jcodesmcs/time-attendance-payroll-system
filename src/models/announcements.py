from dataclasses import dataclass
from basemodel import BaseModel

@dataclass
class Announcement(BaseModel):
    created_at: int
    text: str
