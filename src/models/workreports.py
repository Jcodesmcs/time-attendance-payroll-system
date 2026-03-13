from dataclasses import dataclass
from basemodel import BaseModel

@dataclass
class WorkReport(BaseModel):
    week_ending_date:int
    url: str
    status: str
