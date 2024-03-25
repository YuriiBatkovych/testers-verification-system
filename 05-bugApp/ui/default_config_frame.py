import customtkinter


class DefaultsFrame(customtkinter.CTkScrollableFrame):

    def __init__(self, master, input_configs, submit_method):
        super().__init__(master)

        self.configure(corner_radius=8)
        self.configure(fg_color="#dff2e8")
        self.configure(border_width=2)
        self.configure(border_color="#323232")
        self.padx = 8

        self.fields = {}
        self.default_configs = input_configs
        self.submit_method = submit_method

        self.button = customtkinter.CTkButton(self, text="Submit", command=self.submit_front)
        self.success_text = customtkinter.CTkLabel(self, text="Successfully saved", text_color="black")

        self.create_title_row()
        self.create_fields()

    def create_title_row(self):
        name = customtkinter.CTkLabel(self, text="Default config name", text_color="black")
        name.grid(row=0, column=0, padx=15, pady=15)

        value = customtkinter.CTkLabel(self, text="Config value", text_color="black")
        value.grid(row=0, column=1, padx=15, pady=15)

    def create_bug_field(self, default_config):
        current_row = len(self.fields) + 1

        label = customtkinter.CTkLabel(self, text=default_config.tag, text_color="black")
        label.grid(row=current_row, column=0, padx=15, pady=15)

        field = customtkinter.CTkEntry(self)
        field.insert(0, default_config.value)
        field.configure(width=500)
        field.grid(row=current_row, column=1, padx=15, pady=15)

        self.fields[default_config.tag] = field

    def create_fields(self):
        for default_key, default_config in self.default_configs.items():
            self.create_bug_field(default_config)

        self.button.grid(row=len(self.fields) + 1, column=0, columnspan=2, pady=10)

    def submit_front(self):
        props = {}

        for key, field in self.fields.items():
            props[key] = field.get()

        self.submit_method(props)
        self.button.grid_remove()
        self.success_text.grid(row=len(self.fields) + 1, column=0, columnspan=2, pady=10)

    def recover(self):
        self.success_text.grid_remove()
        self.button.grid(row=len(self.fields) + 1, column=0, columnspan=2, pady=10)
