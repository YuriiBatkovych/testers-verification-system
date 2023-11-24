import tkinter
import customtkinter
from functools import partial

from properties_management.readBackProperties import read_backend_properties

DARK_MODE = "dark"
customtkinter.set_appearance_mode(DARK_MODE)
customtkinter.set_default_color_theme("blue")

BACKEND_FRAME = "Backend Bugs"
FRONTEND_FRAME = "Frontend Bugs"


class App(customtkinter.CTk):
    frames = {}
    current = None
    bg = ""

    backend_fields = []

    def __init__(self):
        super().__init__()
        self.bg = self.cget("fg_color")
        self.num_of_frames = 0
        # self.state('withdraw')
        self.title("Bug Management")

        # screen size
        self.geometry("800x600")

        # root!
        main_container = customtkinter.CTkFrame(self, corner_radius=8, fg_color=self.bg)
        main_container.pack(fill=tkinter.BOTH, expand=True, padx=8, pady=8)

        # left side panel -> for frame selection
        self.left_side_panel = customtkinter.CTkFrame(main_container, width=280, corner_radius=8, fg_color=self.bg)
        self.left_side_panel.pack(side=tkinter.LEFT, fill=tkinter.Y, expand=False, padx=18, pady=10)

        # right side panel -> to show the frame1 or frame 2, or ... frame + n where n <= 5
        self.right_side_panel = customtkinter.CTkFrame(main_container, corner_radius=8, fg_color="#212121")
        self.right_side_panel.pack(side=tkinter.LEFT, fill=tkinter.BOTH, expand=True, padx=0, pady=0)
        self.right_side_panel.configure(border_width=1)
        self.right_side_panel.configure(border_color="#323232")
        self.create_nav(self.left_side_panel, BACKEND_FRAME, "#dff2e8")
        self.create_nav(self.left_side_panel, FRONTEND_FRAME, "#dff2e8")

    # button to select the correct frame
    def frame_selector_bt(self, parent, frame_id):

        # create frame
        bt_frame = customtkinter.CTkButton(parent)
        # style frame
        bt_frame.configure(height=40)
        # creates a text label
        bt_frame.configure(text=frame_id)
        bt_frame.configure(command=partial(self.toggle_frame_by_id, frame_id))
        # set layout
        bt_frame.grid(pady=3, row=self.num_of_frames, column=0)
        # update state
        self.num_of_frames = self.num_of_frames + 1

    def create_field(self, master, label_text, value):
        label = customtkinter.CTkLabel(master, text=label_text, text_color="black")
        label.grid(row=len(self.backend_fields), column=0, padx=10, pady=10)

        # Create and place an entry field
        entry = customtkinter.CTkEntry(master, placeholder_text=value, width=350)
        entry.grid(row=len(self.backend_fields), column=1, padx=10, pady=10)

        self.backend_fields.append(entry)

    def create_back_fields(self):
        master = App.frames[BACKEND_FRAME]
        back_props = read_backend_properties()

        for key, value in back_props.items():
            self.create_field(master, key, value)

        # Create and place a button (just for demonstration)
        button = customtkinter.CTkButton(master, text="Submit")
        button.grid(row=len(self.backend_fields), column=0, columnspan=2, pady=10)

    # create the frame
    def create_frame(self, frame_id, color):
        App.frames[frame_id] = customtkinter.CTkScrollableFrame(self, fg_color=self.cget("fg_color"))
        App.frames[frame_id].configure(corner_radius=8)
        App.frames[frame_id].configure(fg_color=color)
        App.frames[frame_id].configure(border_width=2)
        App.frames[frame_id].configure(border_color="#323232")
        App.frames[frame_id].padx = 8

        if frame_id == BACKEND_FRAME:
            self.create_back_fields()

    # method to change frames
    def toggle_frame_by_id(self, frame_id):

        if App.frames[frame_id] is not None:
            if App.current is App.frames[frame_id]:
                App.current.pack_forget()
                App.current = None
            elif App.current is not None:
                App.current.pack_forget()
                App.current = App.frames[frame_id]
                App.current.pack(in_=self.right_side_panel, side=tkinter.TOP, fill=tkinter.BOTH, expand=True, padx=0,
                                 pady=0)
            else:
                App.current = App.frames[frame_id]
                App.current.pack(in_=self.right_side_panel, side=tkinter.TOP, fill=tkinter.BOTH, expand=True, padx=0,
                                 pady=0)

    # method to create a pair button selector and its related frame
    def create_nav(self, parent, frame_id, frame_color):
        self.frame_selector_bt(parent, frame_id)
        self.create_frame(frame_id, frame_color)


a = App()
a.mainloop()
