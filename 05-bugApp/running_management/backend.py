import multiprocessing

import psutil
import os
import subprocess

from environment_config.path_reader import get_path
from logs_management.bug_logs import clean_bug_logs


def run_spring_boot():
    spring_directory_path = get_path("SPRING_BOOT_APP_DIRECTORY")
    SPRING_BOOT_APP_NAME = get_path("SPRING_BOOT_APP_NAME")
    SPRING_BOOT_APP_PROPERTIES = get_path("SPRING_BOOT_APP_PROPERTIES")

    try:
        os.chdir(spring_directory_path)
        command = ["java", "-jar", SPRING_BOOT_APP_NAME, f'--spring.config.location={SPRING_BOOT_APP_PROPERTIES}']
        subprocess.run(command, check=True)
    except subprocess.CalledProcessError:
        print("Error running the Spring Boot application.")
    finally:
        os.chdir(os.path.dirname(os.path.realpath(__file__)))


def run_backend():
    clean_bug_logs()
    backend_process = multiprocessing.Process(target=run_spring_boot)
    backend_process.start()


def is_spring_boot_running():
    SPRING_BOOT_APP_NAME = get_path("SPRING_BOOT_APP_NAME")

    for proc in psutil.process_iter(attrs=['pid', 'name', 'cmdline']):
        if proc.info['name'] == 'java.exe':
            if any(SPRING_BOOT_APP_NAME in arg for arg in proc.info['cmdline']):
                return True
    return False


def stop_spring_boot():
    SPRING_BOOT_APP_NAME = get_path("SPRING_BOOT_APP_NAME")

    for proc in psutil.process_iter(attrs=['pid', 'name', 'cmdline']):
        if proc.info['name'] == 'java.exe':
            if any(SPRING_BOOT_APP_NAME in arg for arg in proc.info['cmdline']):
                proc.terminate()
                print("Spring Boot application terminated successfully.")
                return
    print("Spring Boot application is not running.")
