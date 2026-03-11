from dataclasses import dataclass
from basemodel import BaseModel

@dataclass
class Attendance(BaseModel):
    created_at: int
    time_in: int
    time_out: int
    total_hours: float
    status: str
    night_diff_hours: int
    is_holiday: bool
