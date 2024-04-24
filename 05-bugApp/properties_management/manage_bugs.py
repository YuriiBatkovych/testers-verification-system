from environment_config.path_reader import get_path
from properties_management.manage_back_properties import read_backend_properties
from properties_management.manage_front_properties import read_frontend_properties
from properties_management.parse_bug_configs import parse_bug_configs
from utils.default_config import DefaultConfig


def get_bug_configs(config_file, bug_properties, default_configs=None):
    if default_configs is None:
        default_configs = {}

    bugs_configs = parse_bug_configs(config_file)

    for bug in bugs_configs:
        bug.set_current_value(bug_properties.get(bug.name))

        if bug.default_configurable:
            bug.set_default_value(default_configs)

    return bugs_configs


def get_defaults_configs(defaults_dictionary):
    defaults = []

    for key, value in defaults_dictionary.items():
        defaults.append(DefaultConfig(key, value))

    return defaults


def get_backend_bugs():
    properties = read_backend_properties()
    return get_bug_configs(get_path("BACKEND_BUG_CONFIG_FILE"), properties)


def get_frontend_bugs():
    bug_configs = read_frontend_properties(True)
    default_configs = read_frontend_properties(True, "default")
    return get_bug_configs(get_path("FRONTEND_BUG_CONFIG_FILE"), bug_configs, default_configs)


def get_frontend_defaults():
    return get_defaults_configs(read_frontend_properties(True, "default"))


def get_all_bug_configs():
    back_configs = get_backend_bugs()
    front_configs = get_frontend_bugs()

    all_bugs = back_configs + front_configs
    return all_bugs


def get_all_defaults_map():
    return read_frontend_properties(True, "default")


def get_activated_bugs():
    all_bugs = get_all_bug_configs()
    activated_bugs = list(filter(lambda bug: bug.is_activated(), all_bugs))
    return activated_bugs
