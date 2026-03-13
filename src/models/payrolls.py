from dataclasses import dataclass
import uuid
import datetime

@dataclass
class Payroll:
    payroll_id: uuid.UUID
    user_id: uuid.UUID
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
