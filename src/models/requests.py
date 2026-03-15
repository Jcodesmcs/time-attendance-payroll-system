from dataclasses import dataclass
from base_model import BaseModel

@dataclass
class LeaveRequest(BaseModel):
    type: str
    start_date: int
    end_date: int
    reason: str
    status: str

@dataclass
class OvertimeRequest(BaseModel):
    date: int
    hours_requested: float
    reason: str
    status: str
