from properties_management.manage_back_properties import read_backend_properties
from properties_management.manage_front_properties import read_frontend_properties
from properties_management.parse_bug_configs import parse_bug_configs

BACKEND_BUG_CONFIG_FILE = "../config/back_bug_config.json."
FRONTEND_BUG_CONFIG_FILE = "../config/front_bug_config.json."


def get_bug_configs(config_file, bug_properties):
    bugs_configs = parse_bug_configs(config_file)

    for bug in bugs_configs:
        bug.set_current_value(bug_properties.get(bug.name))

    return bugs_configs


def get_backend_bugs():
    properties = read_backend_properties()
    return get_bug_configs(BACKEND_BUG_CONFIG_FILE, properties)


def get_frontend_bugs():
    properties = read_frontend_properties(True)
    return get_bug_configs(FRONTEND_BUG_CONFIG_FILE, properties)


def get_all_bug_configs():
    back_configs = get_backend_bugs()
    front_configs = get_frontend_bugs()

    all_bugs = back_configs + front_configs
    return all_bugs


def get_activated_bugs():
    all_bugs = get_all_bug_configs()
    activated_bugs = list(filter(lambda bug: bug.is_activated(), all_bugs))
    return activated_bugs


activated = get_activated_bugs()

for bug in activated:
    print(bug.name)