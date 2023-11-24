from jproperties import Properties

BACKEND_PROPERTIES_FILE = 'D:/ecommerce-shop/04-modifications/modified.properties'


def read_backend_properties():
    configs = Properties()

    with open(BACKEND_PROPERTIES_FILE, 'rb') as read_prop:
        configs.load(read_prop)

    prop_view = configs.items()
    properties_map = {}

    for item in prop_view:
        if item[0].startswith("bug"):
            properties_map[item[0]] = item[1].data

    return properties_map


def write_property(file, key, value):
    file.write(key)
    file.write("=")
    file.write(value)
    file.write("\n")


def write_backend_properties(managed_properties_map):
    configs = Properties()

    with open(BACKEND_PROPERTIES_FILE, 'rb') as read_properties:
        configs.load(read_properties)

    prop_view = configs.items()

    with open(BACKEND_PROPERTIES_FILE, 'w+') as properties_file:
        for item in prop_view:
            if not item[0].startswith("bug"):
                write_property(properties_file, item[0], item[1].data)

        for key, value in managed_properties_map.items():
            write_property(properties_file, key, value)

