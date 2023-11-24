import customtkinter

from ui.main_frame import App

DARK_MODE = "dark"
customtkinter.set_appearance_mode(DARK_MODE)
customtkinter.set_default_color_theme("blue")


a = App()
a.mainloop()
