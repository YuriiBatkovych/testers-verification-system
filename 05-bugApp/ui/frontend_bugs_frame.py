import customtkinter
from tktooltip import ToolTip
from properties_management.manage_front_properties import read_frontend_properties, write_frontend_properties


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

    def create_field(self, label_text, value):
        custom_font = ("Lato", 14, 'bold')
        label = customtkinter.CTkLabel(self, text=label_text, text_color="black", font=custom_font)
        label.grid(row=len(self.frontend_fields), column=0, padx=15, pady=15)

        entry = customtkinter.CTkEntry(self, width=450)
        entry.grid(row=len(self.frontend_fields), column=1, padx=15, pady=15)
        entry.insert(0, value)

        ToolTip(label, msg="Hover info", delay=0.01,
                fg="#ffffff", bg="#1c1c1c", padx=10, pady=10)

        self.frontend_fields[label_text] = entry

    def create_frontend_fields(self):
        back_props = read_frontend_properties(True)

        for key, value in back_props.items():
            self.create_field(key, value)

        button = customtkinter.CTkButton(self, text="Submit", command=self.submit_front())
        button.grid(row=len(self.frontend_fields), column=0, columnspan=2, pady=10)

    def submit_front(self):
        front_props = {}

        for key, value in self.frontend_fields.items():
            front_props[key] = value.get()

        write_frontend_properties(front_props)