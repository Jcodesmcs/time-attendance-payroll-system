class BaseRepository:
    """
        Acts as a base repository class for all model dataclasses. 
    """

    def __init__(self, root_ref):
        self.root = root_ref
        self.operations = {}
    
    def save(self, collection, obj):
        path = f"{collection}/{obj.uuid}"
        self.operations[path] = obj.to_dict()
    
    def delete(self, collection, uid):
        path = f"{collection}/{uid}"
        self.operations[path] = None

    def commit(self):
        if self.operations:
            self.root.update(self.operations)
            self.operations.clear()