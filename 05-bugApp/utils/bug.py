class Bug:

    def __init__(self, params):
        self.name = params.get("name")
        self.description = params.get("description")
        self.allowed_values = params.get("allowedValues")
        self.value_type = params.get("valueType")
        self.current_value = ""

    def set_current_value(self, current_value):
        self.current_value = current_value

    def __repr__(self):
        return f"Bug name: {self.name}, description: {self.description}, allowed_values: {self.allowed_values}, value: {self.current_value}, valueType: {self.value_type}"
