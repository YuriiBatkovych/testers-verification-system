import customtkinter


class Bug:

    def __init__(self, params):
        self.name = params.get("name")
        self.description = params.get("description")
        self.allowed_values = params.get("allowedValues")
        self.value_type = params.get("valueType")
        self.current_value = ""

    def set_current_value(self, current_value):
        self.current_value = current_value

    def get_widget(self, root):
        if type(self.allowed_values) == list:
            option_menu = customtkinter.CTkComboBox(root, values=self.allowed_values)
            option_menu.set(self.current_value)
            return option_menu
        else:
            entry = customtkinter.CTkEntry(root)
            entry.insert(0, self.current_value)
            return entry

    def validate(self, value):
        match self.value_type:
            case "number":
                return value.isnumeric()
            case _:
                return True

    def __repr__(self):
        return f"Bug name: {self.name}, description: {self.description}, allowed_values: {self.allowed_values}, value: {self.current_value}, valueType: {self.value_type}"
