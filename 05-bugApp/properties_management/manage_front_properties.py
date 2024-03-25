import re

FRONTEND_PROPERTIES_FILE = 'D:/ecommerce-shop/03-frontend/angular-ecommerce/src/environments/environment.ts'


def split_string_at_colon(input_string):
    colon_index = input_string.find(':')

    if colon_index != -1:
        before_colon = input_string[:colon_index].strip()
        after_colon = input_string[colon_index + 1:].strip()

        if after_colon[-1] == ",":
            after_colon = after_colon[:-1]

        return before_colon, after_colon
    else:
        return input_string.strip(), ""


def should_return_front_property(filter_only_bugs, filter_word, prop_key, prop_val):
    if prop_key and prop_val:
        return (filter_only_bugs and prop_key.startswith(filter_word)) or \
               (not filter_only_bugs)
    else:
        return False


def read_frontend_properties(filter_only, filter_word="bug"):
    properties_dict = {}

    with open(FRONTEND_PROPERTIES_FILE, 'r') as file:
        inside_environment_block = False
        for line in file:
            if re.match(r'\s*export const environment = {', line):
                inside_environment_block = True

            elif inside_environment_block and re.match(r'\s*};', line):
                break

            elif inside_environment_block:
                prop_key, prop_val = split_string_at_colon(line)
                if should_return_front_property(filter_only, filter_word, prop_key, prop_val):
                    properties_dict[prop_key] = prop_val

    return properties_dict


def write_property(file, key, value):
    file.write(" ")
    file.write(key)
    file.write(": ")
    file.write(value)
    file.write(",\n")


def write_frontend_properties(properties_map):
    prop_preview = read_frontend_properties(False)

    with open(FRONTEND_PROPERTIES_FILE, 'w+') as properties_file:

        properties_file.write("export const environment = {\n")

        for prop_key, prop_val in prop_preview.items():
            if not prop_key.startswith("bug"):
                write_property(properties_file, prop_key, prop_val)

        for key, value in properties_map.items():
            write_property(properties_file, key, value)

        properties_file.write("}\n")


def write_frontend_defaults(properties_map):
    prop_preview = read_frontend_properties(False)

    with open(FRONTEND_PROPERTIES_FILE, 'w+') as properties_file:

        properties_file.write("export const environment = {\n")

        for prop_key, prop_val in prop_preview.items():
            if not prop_key.startswith("default"):
                write_property(properties_file, prop_key, prop_val)

        for key, value in properties_map.items():
            write_property(properties_file, key, value)

        properties_file.write("}\n")