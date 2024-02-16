import tkinter
import customtkinter
from functools import partial

from properties_management.manage_back_properties import write_backend_properties
from properties_management.manage_bugs import get_backend_bugs, get_frontend_bugs
from properties_management.manage_front_properties import write_frontend_properties
from ui.bug_frame import BugsFrame
from ui.common import prepare_bug_configs_map
from ui.results_frame import ResultsFrame
from ui.run_frame import RunFrame

BACKEND_FRAME = "Backend Bugs"
FRONTEND_FRAME = "Frontend Bugs"
RESULTS_FRAME = "Results"
RUN_FRAME = "Run"


class App(customtkinter.CTk):
    frames = {}
    current = None
    bg = ""

    def __init__(self):
        super().__init__()
        self.num_of_frames = 0

        self.def_main_screen()

        # root!
        main_container = customtkinter.CTkFrame(self, corner_radius=8, fg_color=self.bg)
        main_container.pack(fill=tkinter.BOTH, expand=True, padx=8, pady=8)

        # left side panel -> for frame selection
        self.left_side_panel = customtkinter.CTkFrame(main_container, width=280, corner_radius=8, fg_color=self.bg)
        self.left_side_panel.pack(side=tkinter.LEFT, fill=tkinter.Y, expand=False, padx=18, pady=10)

        # right side panel -> to show the frame
        self.right_side_panel = customtkinter.CTkFrame(main_container, corner_radius=8, fg_color="#212121")
        self.right_side_panel.pack(side=tkinter.LEFT, fill=tkinter.BOTH, expand=True, padx=0, pady=0)
        self.right_side_panel.configure(border_width=1)
        self.right_side_panel.configure(border_color="#323232")
        self.create_nav(self.left_side_panel, BACKEND_FRAME)
        self.create_nav(self.left_side_panel, FRONTEND_FRAME)
        self.create_nav(self.left_side_panel, RUN_FRAME)
        self.create_nav(self.left_side_panel, RESULTS_FRAME)


    def def_main_screen(self):
        self.bg = self.cget("fg_color")
        self.title("Bug Management")
        self.geometry("1100x700")

    def frame_selector_bt(self, parent, frame_id):
        bt_frame = customtkinter.CTkButton(parent)
        bt_frame.configure(height=40)
        bt_frame.configure(text=frame_id)
        bt_frame.configure(command=partial(self.toggle_frame_by_id, frame_id))
        bt_frame.grid(pady=3, row=self.num_of_frames, column=0)
        self.num_of_frames = self.num_of_frames + 1

    # create the frame
    def create_frame(self, frame_id):
        if frame_id == BACKEND_FRAME:
            bug_configs = prepare_bug_configs_map(get_backend_bugs())
            App.frames[frame_id] = BugsFrame(self, bug_configs, write_backend_properties)
        elif frame_id == FRONTEND_FRAME:
            bug_configs = prepare_bug_configs_map(get_frontend_bugs())
            App.frames[frame_id] = BugsFrame(self, bug_configs, write_frontend_properties)
        elif frame_id == RESULTS_FRAME:
            App.frames[frame_id] = ResultsFrame(self)
        elif frame_id == RUN_FRAME:
            App.frames[frame_id] = RunFrame(self)

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

            App.current.recover()

    # method to create a pair button selector and its related frame
    def create_nav(self, parent, frame_id):
        self.frame_selector_bt(parent, frame_id)
        self.create_frame(frame_id)
