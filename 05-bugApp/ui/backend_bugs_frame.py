import customtkinter
from tktooltip import ToolTip

from properties_management.manage_back_properties import write_backend_properties
from properties_management.manage_bugs import get_backend_bugs


class BackendBugsFrame(customtkinter.CTkScrollableFrame):

    def __init__(self, master):
        super().__init__(master)

        self.configure(corner_radius=8)
        self.configure(fg_color="#dff2e8")
        self.configure(border_width=2)
        self.configure(border_color="#323232")
        self.padx = 8

        self.backend_fields = {}

        self.create_back_fields()

    def create_field(self, bug):
        label = customtkinter.CTkLabel(self, text=bug.name, text_color="black")
        label.grid(row=len(self.backend_fields), column=0, padx=10, pady=10)

        field = bug.get_widget(self)
        field.configure(width=450)
        field.grid(row=len(self.backend_fields), column=1, padx=10, pady=10)

        ToolTip(label, msg=bug.description, delay=0.01,
                fg="#ffffff", bg="#1c1c1c", padx=10, pady=10)

        self.backend_fields[bug.name] = field

    def create_back_fields(self):
        back_bugs = get_backend_bugs()

        for bug in back_bugs:
            self.create_field(bug)

        button = customtkinter.CTkButton(self, text="Submit", command=self.submit_back)
        button.grid(row=len(self.backend_fields), column=0, columnspan=2, pady=10)

    def submit_back(self):
        back_props = {}

        for key, value in self.backend_fields.items():
            back_props[key] = value.get()
        print(back_props)
        write_backend_properties(back_props)