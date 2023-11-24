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


# result = read_backend_properties()
#
# for key, value in result.items():
#     print(f"{key}: {value}")