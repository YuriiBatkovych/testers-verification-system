import json

from utils.bug import Bug


def parse_bug_configs(file_path):
    with open(file_path, 'r') as file:
        data = json.load(file)

    backend_list = data.get("backend", [])
    bug_list = [Bug(bug) for bug in backend_list]
    return bug_list
