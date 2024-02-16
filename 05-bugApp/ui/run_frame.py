import tkinter

import customtkinter
from customtkinter import CTkLabel, CTkButton

from running_management.backend import is_spring_boot_running, run_spring_boot, stop_spring_boot
from running_management.frontend import is_npm_running, run_npm_app, stop_npm


class RunFrame(customtkinter.CTkScrollableFrame):

    def __init__(self, master):
        super().__init__(master)

        self.configure(corner_radius=8)
        self.configure(fg_color="#dff2e8")
        self.configure(border_width=2)
        self.configure(border_color="#323232")
        self.padx = 8

        self.back_label = None
        self.back_button = None

        self.front_label = None
        self.front_button = None

        self.create_managements()

    def create_backend_management(self):
        if is_spring_boot_running():
            label_text = "Backend application is running"
            button_text = "Run backend app"
            button_command = stop_spring_boot
        else:
            label_text = "Backend application is NOT running"
            button_text = "Run backend app"
            button_command = run_spring_boot

        self.back_label = customtkinter.CTkLabel(self, text=label_text, text_color="black")
        self.back_label.grid(row=0, column=0, padx=15, pady=15)

        self.back_button = customtkinter.CTkButton(self, text=button_text, command=button_command)
        self.back_button.grid(row=0, column=1, columnspan=2, pady=10)

    def create_frontend_management(self):
        if is_npm_running():
            label_text = "Frontend application is running"
            button_text = "Run frontend app"
            button_command = stop_npm
        else:
            label_text = "Frontend application is NOT running"
            button_text = "Run frontend app"
            button_command = run_npm_app

        self.front_label = customtkinter.CTkLabel(self, text=label_text, text_color="black")
        self.front_label.grid(row=1, column=0, padx=15, pady=15)

        self.front_button = customtkinter.CTkButton(self, text=button_text, command=button_command)
        self.front_button.grid(row=1, column=1, columnspan=2, pady=10)

    def create_managements(self):
        self.create_backend_management()
        self.create_frontend_management()

    def recover(self):
        if isinstance(self.back_label, CTkLabel):
            self.back_label.destroy()

        if isinstance(self.front_label, CTkLabel):
            self.front_label.destroy()

        if isinstance(self.back_button, CTkButton):
            self.back_button.destroy()

        if isinstance(self.front_button, CTkButton):
            self.front_button.destroy()

        self.create_managements()