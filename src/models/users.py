import uuid
from dataclasses import dataclass

from basemodel import BaseModel

@dataclass
class User(BaseModel):
    username: str
    email: str
    password_hash: str
    system_role: str
    is_active: bool

@dataclass
class UserProfile(BaseModel):
    profile_url: str
    first_name: str
    middle_name: str
    last_name: str
    department: str
    job_title: str
    bank_number: str
    contact_number: str
    pay_basis: str
    base_rate: float




