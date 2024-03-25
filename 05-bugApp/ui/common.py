def prepare_bug_configs_map(bug_configs):
    return {bug_config.name: bug_config for bug_config in bug_configs}


def prepare_defaults_configs_map(configs):
    return {config.tag: config for config in configs}
