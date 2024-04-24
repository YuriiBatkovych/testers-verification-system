import multiprocessing
import os
import subprocess

import psutil

from environment_config.path_reader import get_path


def run_npm_app():
    node_directory_path = get_path("NODE_APP_DIRECTORY")
    try:
        os.chdir(node_directory_path)
        command = ["npm", "start"]
        subprocess.run(command, shell=True, check=True)
    except subprocess.CalledProcessError:
        print("Error running the Node application.")
    finally:
        os.chdir(os.path.dirname(os.path.realpath(__file__)))


def run_frontend():
    frontend_process = multiprocessing.Process(target=run_npm_app)
    frontend_process.start()


def is_npm_running():
    NODE_APP_NAME = get_path("NODE_APP_NAME")

    for proc in psutil.process_iter(attrs=['pid', 'name', 'cmdline']):
        if proc.info['name'] == 'node.exe':
            for arg in proc.info['cmdline']:
                if NODE_APP_NAME in arg:
                    return True
    return False


def stop_npm():
    NODE_APP_NAME = get_path("NODE_APP_NAME")

    for proc in psutil.process_iter(attrs=['pid', 'name', 'cmdline']):
        if proc.info['name'] == 'node.exe':
            for arg in proc.info['cmdline']:
                if NODE_APP_NAME in arg:
                    proc.terminate()
                    print("Node app application terminated successfully.")
                    return
    print("Node application is not running.")
