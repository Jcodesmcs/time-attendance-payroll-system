from dataclasses import dataclass
import uuid
import datetime
from base_model import BaseModel

@dataclass
class Payroll(BaseModel):
    period_start: datetime.date
    period_end: datetime.date
    regular_pay: float
    overtime_pay: float
    holiday_pay: float
    gross_pay: float
    sss_deduction: float
    philhealth_deduction: float
    pagibig_deduction: float
    tax_deduction: float
    total_deduction: float
    net_pay: float
