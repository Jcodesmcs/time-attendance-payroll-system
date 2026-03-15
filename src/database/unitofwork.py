class UnitOfWork:
    def __init__(self, root_ref):
        self.root = root_ref
        self.operations: dict[str, object] = {}
    def set(self, path: str, value):
        self.operations[path] = value
    def delete(self, path: str):
        self.operations[path] = None
    def commit(self):
        if not self.operations:
            return
        self.root.update(self.operations)
        self.operations.clear()
