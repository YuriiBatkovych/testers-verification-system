from properties_management.manage_back_properties import read_backend_properties
from properties_management.parse_bug_configs import parse_bug_configs

BACKEND_BUG_CONFIG_FILE = "../config/bug_config.json."


def get_backend_bugs():
    properties = read_backend_properties()
    bugs_configs = parse_bug_configs(BACKEND_BUG_CONFIG_FILE)

    for bug in bugs_configs:
        bug.set_current_value(properties.get(bug.name))

    return bugs_configs


bugs = get_backend_bugs()

for b in bugs:
    print(b.current_value, "\n")