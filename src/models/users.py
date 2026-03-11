import uuid
from dataclasses import dataclass

@dataclass
class User:
    uuid: uuid.UUID
    username: str
    email: str
    password_hash: str
    system_role: str
    is_active: bool

@dataclass
class UserProfile:
    uuid: uuid.UUID
    first_name: str
    middle_name: str
    last_name: str
    department: str
    job_title: str
    bank_number: str
    contact_number: str




