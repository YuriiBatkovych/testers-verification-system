import customtkinter

from properties_management.manage_back_properties import read_backend_properties, write_backend_properties


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

    def create_field(self, label_text, value):
        label = customtkinter.CTkLabel(self, text=label_text, text_color="black")
        label.grid(row=len(self.backend_fields), column=0, padx=10, pady=10)

        entry = customtkinter.CTkEntry(self, width=350)
        entry.grid(row=len(self.backend_fields), column=1, padx=10, pady=10)
        entry.insert(0, value)

        self.backend_fields[label_text] = entry

    def create_back_fields(self):
        back_props = read_backend_properties()

        for key, value in back_props.items():
            self.create_field(key, value)

        button = customtkinter.CTkButton(self, text="Submit", command=self.submit_back)
        button.grid(row=len(self.backend_fields), column=0, columnspan=2, pady=10)

    def submit_back(self):
        back_props = {}

        for key, value in self.backend_fields.items():
            back_props[key] = value.get()
        print(back_props)
        write_backend_properties(back_props)