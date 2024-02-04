import customtkinter


class ResultsFrame(customtkinter.CTkScrollableFrame):

    def __init__(self, master):
        super().__init__(master)

        self.configure(corner_radius=8)
        self.configure(fg_color="#dff2e8")
        self.configure(border_width=2)
        self.configure(border_color="#323232")
        self.padx = 8

        label = customtkinter.CTkLabel(self, text="Results", text_color="black")
        label.grid(row=0, column=0, padx=15, pady=15)