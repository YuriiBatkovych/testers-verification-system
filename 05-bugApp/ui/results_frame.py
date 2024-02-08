import customtkinter
from tktooltip import ToolTip

from logs_management.bug_logs import mark_detected_bugs
from properties_management.manage_bugs import get_activated_bugs


class ResultsFrame(customtkinter.CTkScrollableFrame):

    def __init__(self, master):
        super().__init__(master)

        self.configure(corner_radius=8)
        self.configure(fg_color="#dff2e8")
        self.configure(border_width=2)
        self.configure(border_color="#323232")
        self.padx = 8

        self.create_title_row()
        self.create_fields()

    def create_title_row(self):
        name = customtkinter.CTkLabel(self, text="Activated Bugs", text_color="black")
        name.grid(row=0, column=0, padx=15, pady=15)

        value = customtkinter.CTkLabel(self, text="Is Detected?", text_color="black")
        value.grid(row=0, column=1, padx=15, pady=15)

    def create_bug_field(self, bug_config, current_row):
        label = customtkinter.CTkLabel(self, text=bug_config.name, text_color="black")
        label.grid(row=current_row, column=0, padx=15, pady=15)

        detected_label_color = "green" if bug_config.is_detected else "red"
        detected_label = customtkinter.CTkLabel(self, text=bug_config.is_detected, text_color=detected_label_color)
        detected_label.grid(row=current_row, column=1, padx=15, pady=15)

        ToolTip(label, msg=bug_config.description, delay=0.01,
                fg="#ffffff", bg="#1c1c1c", padx=10, pady=10)

    def create_fields(self):
        activated_bugs = get_activated_bugs()
        activated_bugs = mark_detected_bugs(activated_bugs)

        row_number = 1
        for bug in activated_bugs:
            self.create_bug_field(bug, row_number)
            row_number += 1

