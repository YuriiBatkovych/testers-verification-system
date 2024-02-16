import psutil
import os
import subprocess

SPRING_BOOT_APP_NAME = 'spring-boot-ecommerce-0.0.1-SNAPSHOT.jar'
SPRING_BOOT_APP_PROPERTIES = 'file:D://ecommerce-shop/04-modifications/modified.properties'
SPRING_BOOT_APP_DIRECTORY = 'D:/ecommerce-shop/04-modifications'


def run_spring_boot():
    spring_directory_path = SPRING_BOOT_APP_DIRECTORY

    try:
        os.chdir(spring_directory_path)
        command = ["java", "-jar", SPRING_BOOT_APP_NAME, f'--spring.config.location={SPRING_BOOT_APP_PROPERTIES}']
        subprocess.run(command, check=True)
    except subprocess.CalledProcessError:
        print("Error running the Spring Boot application.")
    finally:
        os.chdir(os.path.dirname(os.path.realpath(__file__)))


def is_spring_boot_running():
    for proc in psutil.process_iter(attrs=['pid', 'name', 'cmdline']):
        if proc.info['name'] == 'java.exe':
            if any(SPRING_BOOT_APP_NAME in arg for arg in proc.info['cmdline']):
                return True
    return False


def stop_spring_boot():
    for proc in psutil.process_iter(attrs=['pid', 'name', 'cmdline']):
        if proc.info['name'] == 'java.exe':
            if any(SPRING_BOOT_APP_NAME in arg for arg in proc.info['cmdline']):
                proc.terminate()
                print("Spring Boot application terminated successfully.")
                return
    print("Spring Boot application is not running.")
