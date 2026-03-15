from ..models.payrolls import Payroll
from base_repository import BaseRepository

class PayrollRepository(BaseRepository[Payroll]):
    def __init__(self, root_ref):
        super().__init__(root_ref, "payrolls", Payroll)

    def get_by_user(self, user_uuid):
        payroll_index = self.root.child("payrolls_by_user").child(str(user_uuid)).get()
