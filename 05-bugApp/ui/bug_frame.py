import customtkinter
from tktooltip import ToolTip


class BugsFrame(customtkinter.CTkScrollableFrame):

    def __init__(self, master, bug_configs, submit_method):
        super().__init__(master)

        self.configure(corner_radius=8)
        self.configure(fg_color="#dff2e8")
        self.configure(border_width=2)
        self.configure(border_color="#323232")
        self.padx = 8

        self.fields = {}
        self.bug_configs = bug_configs
        self.submit_method = submit_method

        self.button = customtkinter.CTkButton(self, text="Submit", command=self.submit_front)
        self.success_text = customtkinter.CTkLabel(self, text="Successfully saved", text_color="black")

        self.create_title_row()
        self.create_fields()

    def create_title_row(self):
        name = customtkinter.CTkLabel(self, text="Bug config name", text_color="black")
        name.grid(row=0, column=0, padx=15, pady=15)

        value = customtkinter.CTkLabel(self, text="Config value", text_color="black")
        value.grid(row=0, column=1, padx=15, pady=15)

        default = customtkinter.CTkLabel(self, text="Default value", text_color="black")
        default.grid(row=0, column=2, padx=15, pady=15)

    def create_bug_field(self, bug_config):
        current_row = len(self.fields)+1

        label = customtkinter.CTkLabel(self, text=bug_config.name, text_color="black")
        label.grid(row=current_row, column=0, padx=15, pady=15)

        field = bug_config.get_widget(self)
        field.configure(width=500)
        field.grid(row=current_row, column=1, padx=15, pady=15)

        default_value = customtkinter.CTkLabel(self, text=bug_config.default_value, text_color="green", font=("Ubuntu", 15))
        default_value.grid(row=current_row, column=2, padx=15, pady=15)

        ToolTip(label, msg=bug_config.description, delay=0.01,
                fg="#ffffff", bg="#1c1c1c", padx=10, pady=10)

        self.fields[bug_config.name] = field

    def create_fields(self):
        for bug_key, bug_config in self.bug_configs.items():
            self.create_bug_field(bug_config)

        self.button.grid(row=len(self.fields)+1, column=0, columnspan=2, pady=10)

    def submit_front(self):
        props = {}
        validation_error = False

        for key, field in self.fields.items():
            if self.bug_configs.get(key).validate(field.get()):
                props[key] = field.get()
            else:
                validation_error = True
                field.configure(fg_color="#b82c2c")
                break

        if not validation_error:
            self.submit_method(props)
            self.button.grid_remove()
            self.success_text.grid(row=len(self.fields)+1, column=0, columnspan=2, pady=10)

    def recover(self):
        self.success_text.grid_remove()
        self.button.grid(row=len(self.fields)+1, column=0, columnspan=2, pady=10)
