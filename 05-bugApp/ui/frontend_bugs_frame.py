import customtkinter
from tktooltip import ToolTip

from properties_management.manage_bugs import get_frontend_bugs
from properties_management.manage_front_properties import write_frontend_properties


class FrontendBugsFrame(customtkinter.CTkScrollableFrame):

    def __init__(self, master):
        super().__init__(master)

        self.configure(corner_radius=8)
        self.configure(fg_color="#dff2e8")
        self.configure(border_width=2)
        self.configure(border_color="#323232")
        self.padx = 8

        self.frontend_fields = {}

        self.create_frontend_fields()

    def create_field(self, bug_config):
        custom_font = ("Lato", 14, 'bold')
        label = customtkinter.CTkLabel(self, text=bug_config.name, text_color="black", font=custom_font)
        label.grid(row=len(self.frontend_fields), column=0, padx=15, pady=15)

        field = bug_config.get_widget(self)
        field.configure(width=450)
        field.grid(row=len(self.frontend_fields), column=1, padx=15, pady=15)

        ToolTip(label, msg=bug_config.description, delay=0.01,
                fg="#ffffff", bg="#1c1c1c", padx=10, pady=10)

        self.frontend_fields[bug_config.name] = field

    def create_frontend_fields(self):
        front_bug_configs = get_frontend_bugs()

        for bug_config in front_bug_configs:
            self.create_field(bug_config)

        button = customtkinter.CTkButton(self, text="Submit", command=self.submit_front())
        button.grid(row=len(self.frontend_fields), column=0, columnspan=2, pady=10)

    def submit_front(self):
        front_props = {}

        for key, value in self.frontend_fields.items():
            front_props[key] = value.get()

        write_frontend_properties(front_props)