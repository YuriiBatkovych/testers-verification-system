import customtkinter

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
        label = customtkinter.CTkLabel(self, text=label_text, text_color="black")
        label.grid(row=len(self.frontend_fields), column=0, padx=10, pady=10)

        entry = customtkinter.CTkEntry(self, width=350)
        entry.grid(row=len(self.frontend_fields), column=1, padx=10, pady=10)
        entry.insert(0, value)

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