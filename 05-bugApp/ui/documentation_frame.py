import tkinter
import webbrowser
from tkinter import filedialog

import customtkinter

from pdf_generation.documentation_generation import generate_pdf_documentation


class DocumentationFrame(customtkinter.CTkScrollableFrame):

    def __init__(self, master):
        super().__init__(master)

        self.configure(corner_radius=8)
        self.configure(fg_color="#dff2e8")
        self.configure(border_width=2)
        self.configure(border_color="#323232")
        self.padx = 8

        self.button = customtkinter.CTkButton(self, text="Generate specification", command=self.get_specification)
        self.button.grid()

    def open_pdf(self):
        file_path = "documentation_test.pdf"
        if file_path:
            webbrowser.open(file_path)

    def get_specification(self):
        generate_pdf_documentation()
        self.after(5000, self.open_pdf)

    def recover(self):
        print("recover")
