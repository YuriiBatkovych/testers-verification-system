import tkinter

import customtkinter
from tktooltip import ToolTip

import matplotlib.pyplot as plt
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg

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

        self.left_side_panel = customtkinter.CTkFrame(self, width=700, corner_radius=8, fg_color="#C1CDCD")
        self.left_side_panel.pack(side=tkinter.LEFT, fill=tkinter.Y, expand=False, padx=25, pady=10)

        self.right_side_panel = customtkinter.CTkFrame(self, corner_radius=8, fg_color="#212121")
        self.right_side_panel.pack(side=tkinter.LEFT, fill=tkinter.BOTH, expand=True, padx=0, pady=0)
        self.right_side_panel.configure(border_width=1)
        self.right_side_panel.configure(border_color="#323232")

        self.activated_bugs = mark_detected_bugs(get_activated_bugs())
        self.canvas = None
        self.field_labels = []

        self.create_title_row()
        self.create_fields()
        self.create_statistics()

    def create_title_row(self):
        name = customtkinter.CTkLabel(self.left_side_panel, text="Activated Bugs", text_color="black")
        name.grid(row=0, column=0, padx=15, pady=15)

        value = customtkinter.CTkLabel(self.left_side_panel, text="Is Detected?", text_color="black")
        value.grid(row=0, column=1, padx=15, pady=15)

    def create_bug_field(self, bug_config, current_row):
        label = customtkinter.CTkLabel(self.left_side_panel, text=bug_config.name, text_color="black")
        label.grid(row=current_row, column=0, padx=15, pady=15)

        detected_label_color = "green" if bug_config.is_detected else "red"
        detected_label = customtkinter.CTkLabel(self.left_side_panel, text=bug_config.is_detected, text_color=detected_label_color)
        detected_label.grid(row=current_row, column=1, padx=15, pady=15)

        ToolTip(label, msg=bug_config.description, delay=0.01,
                fg="#ffffff", bg="#1c1c1c", padx=10, pady=10)

        self.field_labels.append((label, detected_label))

    def create_fields(self):
        row_number = 1
        for bug in self.activated_bugs:
            self.create_bug_field(bug, row_number)
            row_number += 1

    def create_statistics(self):
        activated_bugs_number = len(self.activated_bugs)
        detected_bugs_number = sum(1 for bug in self.activated_bugs if bug.is_detected)
        detected_percentage = round(detected_bugs_number/activated_bugs_number * 100, 2)

        colors = ["blue", "green"]

        fig, ax = plt.subplots()

        ax.bar(["Activated bugs", "Detected bugs"], [activated_bugs_number, detected_bugs_number], color=colors)
        ax.text(1, detected_bugs_number+0.5, f'{detected_percentage}%', ha='center')

        self.canvas = FigureCanvasTkAgg(fig, master=self.right_side_panel)
        self.canvas.draw()
        self.canvas.get_tk_widget().pack(padx=10, pady=10)

    def recover(self):
        self.delete_old_setup()
        self.activated_bugs = mark_detected_bugs(get_activated_bugs())

        self.create_title_row()
        self.create_fields()
        self.create_statistics()

    def delete_old_setup(self):
        if isinstance(self.canvas, FigureCanvasTkAgg):
            self.canvas.get_tk_widget().destroy()

        for (label, detected) in self.field_labels:
            label.destroy()
            detected.destroy()

