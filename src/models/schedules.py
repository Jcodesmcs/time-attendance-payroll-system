from dataclasses import dataclass
from base_model import BaseModel

@dataclass
class ShiftSchedule(BaseModel):
    name: str
    start_time: int
    end_time: int
    is_night_shift: bool
    break_duration: float
    date: int
