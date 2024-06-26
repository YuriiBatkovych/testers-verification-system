import customtkinter

class Bug:

    def __init__(self, params):
        self.name = params.get("name")
        self.description = params.get("description")
        self.allowed_values = params.get("allowedValues")
        self.value_type = params.get("valueType")
        self.default_configurable = params.get("defaultConfigurable")
        self.default_tag = params.get("defaultTag")
        self.default_value = params.get("defaultValue")
        self.tag = params.get("tag")
        self.type = params.get("type")
        self.is_detected = False
        self.current_value = ""

    def mark_detected(self):
        self.is_detected = True

    def set_current_value(self, current_value):
        match self.value_type:
            case "number":
                self.current_value = int(current_value)
            case _:
                self.current_value = current_value

    def set_default_value(self, default_configs):
        for default_name, default_value in default_configs.items():
            if default_name == self.default_tag:
                match self.value_type:
                    case "number":
                        self.default_value = int(default_value)
                    case _:
                        self.default_value = default_value
                break

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

    def is_activated(self):
        return self.default_value != self.current_value

    def __repr__(self):
        return f"Bug name: {self.name}, description: {self.description}, allowed_values: {self.allowed_values}, value: {self.current_value}, valueType: {self.value_type}," \
               f"defaultValue: {self.default_value}, tag: {self.tag}"
